const fs = require('fs');
const path = require('path');
const https = require('https');

// Load .env.local manually
const envPath = path.resolve(__dirname, '../.env.local');
let envContent = '';
try {
  envContent = fs.readFileSync(envPath, 'utf8');
} catch (e) {
  console.error("❌ Could not read .env.local");
  process.exit(1);
}

const env = {};
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) {
    env[key.trim()] = value.trim();
  }
});

const GITHUB_TOKEN = env.GITHUB_TOKEN;
const username = 'Zouziszzm';

if (!GITHUB_TOKEN) {
  console.error("❌ GITHUB_TOKEN not found in .env.local");
  process.exit(1);
}

console.log(`🔑 Token found (length: ${GITHUB_TOKEN.length})`);
console.log(`📡 Fetching stats for ${username}...`);

const query = JSON.stringify({
  query: `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionYears
        }
      }
    }
  `,
  variables: { username }
});

const req = https.request('https://api.github.com/graphql', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${GITHUB_TOKEN}`,
    'Content-Type': 'application/json',
    'User-Agent': 'Node.js Script'
  }
}, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log(`Response Status: ${res.statusCode}`);
    if (res.statusCode !== 200) {
       console.error("❌ Request failed:", data);
    } else {
       const parsed = JSON.parse(data);
       if (parsed.errors) {
           console.error("❌ GraphQL Errors:", parsed.errors);
           return;
       }
       
       const years = parsed.data.user.contributionsCollection.contributionYears;
       console.log("✅ Years found:", years);
       
       // Test the second query for the first year
       if (years.length > 0) {
         const year = years[0];
         console.log(`Testing fetch for year: ${year}...`);
         
         const yearQuery = JSON.stringify({
            query: `
              query($username: String!, $from: DateTime!, $to: DateTime!) {
                user(login: $username) {
                  contributionsCollection(from: $from, to: $to) {
                    contributionCalendar {
                      totalContributions
                    }
                  }
                }
              }
            `,
            variables: { 
              username,
              from: `${year}-01-01T00:00:00Z`,
              to: `${year}-12-31T23:59:59Z`
            }
         });
         
         const req2 = https.request('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GITHUB_TOKEN}`,
                'Content-Type': 'application/json',
                'User-Agent': 'Node.js Script'
            }
         }, (res2) => {
            let data2 = '';
            res2.on('data', c => data2 += c);
            res2.on('end', () => {
                console.log(`Year Response Status: ${res2.statusCode}`);
                console.log("Data:", data2);
            });
         });
         req2.write(yearQuery);
         req2.end();
       } else {
           console.log("⚠️ No years found to test counts.");
       }
    }
  });
});

req.on('error', (e) => {
  console.error("❌ Network Error:", e);
});

req.write(query);
req.end();
