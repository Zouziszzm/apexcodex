import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { QUOTE_POOL } from "./emoji-quotes-pool.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));

if (QUOTE_POOL.length < 500) {
  console.error(`Quote pool has ${QUOTE_POOL.length} entries — need at least 500`);
  process.exit(1);
}

/** Emojis commonly used in sexual/suggestive contexts — excluded */
const BLOCKED = new Set([
  "🍆", "🍑", "💦", "👅", "🫦", "😏", "🥵", "🔞", "🌮", "🍌", "🥒", "🍒",
  "👙", "🩲", "🩱", "🛀", "🛏️", "💏", "💑", "👩‍❤️‍💋‍👨", "👨‍❤️‍💋‍👨",
  "👩‍❤️‍💋‍👩", "👩‍❤️‍👨", "👨‍❤️‍👨", "👩‍❤️‍👩", "🧑‍🤝‍🧑", "💋",
  "👄", "🫃", "🫄", "🤰", "🍑", "🍆", "🥜", "🌭", "🍖", "🍗",
  "😈", "👿", "💢", "🖕", "🤬", "🤮", "🤢", "💩", "🤡", "🫏",
  "🇮🇱", "✡️", "✡",
  "⚛️", "⚛", "🕉️", "🕉", "☸️", "☸", "☯️", "☯", "✝️", "✝", "☦️", "☦",
  "☮️", "☮", "🕎", "🔯",
]);

const CATEGORY_HINTS = {
  "🐶": "Loyalty shows up in small moments.",
  "🐱": "Independence has its own warmth.",
  "🦌": "A quiet spirit wandering the deep woods.",
  "🗾": "Currently learning Japanese — slowly, steadily.",
  "☕": "Fueled by caffeine and quiet ambition.",
  "🎮": "One more run. Always one more run.",
  "🖥️": "If it fits in a rack, it probably belongs there.",
  "🌍": "The world is wide — I intend to see more of it.",
  "✈️": "Somewhere out there is a place I haven't landed yet.",
  "🚀": "Build small. Launch often.",
  "📚": "Still learning. Still curious.",
  "🌙": "Best thoughts arrive after midnight.",
  "⭐": "Small lights in a wide sky.",
  "🎯": "Aim for what scares you, just a little.",
  "🧳": "Packing for somewhere new.",
  "🎸": "Life needs a good soundtrack.",
  "🏔️": "Climb the problems worth climbing.",
  "🛸": "What if we tried something a little weird?",
  "🎲": "Luck favors the ones who show up.",
  "💼": "Open to what comes next.",
  "📝": "Ideas are easy. Shipping is the craft.",
  "🌸": "Soft days count too.",
};

/** Broad safe emoji set — faces, nature, objects, activities, symbols */
const RAW_EMOJIS = `
😀 😃 😄 😁 😆 😅 🤣 😂 🙂 🙃 😉 😊 😇 🥰 😍 🤩 😘 😗 ☺️ 😚 😙 🥲
😋 😛 😜 🤪 😝 🤑 🤗 🤭 🤫 🤔 🤐 🤨 😐 😑 😶 😶‍🌫️ 😏 😒 🙄 😬 🤥
😌 😔 😪 🤤 😴 😷 🤒 🤕 🤧 🥵 🥶 🥴 😵 😵‍💫 🤯 🤠 🥳 🥸 😎 🤓 🧐
😕 😟 🙁 ☹️ 😮 😯 😲 😳 🥺 😦 😧 😨 😰 😥 😢 😭 😱 😖 😣 😞 😓 😩
😫 🥱 😤 😡 😠 🤬 😈 👿 💀 ☠️ 💩 🤡 👹 👺 👻 👽 👾 🤖 😺 😸 😹 😻
😼 😽 🙀 😿 😾 🙈 🙉 🙊 💋 💌 💘 💝 💖 💗 💓 💞 💕 💟 ❣️ 💔 ❤️‍🔥
❤️‍🩹 ❤️ 🧡 💛 💚 💙 💜 🤎 🖤 🤍 💯 💢 💥 💫 💦 💨 🕳️ 💣 💬 👁️‍🗨️
🗨️ 🗯️ 💭 💤 👋 🤚 🖐️ ✋ 🖖 👌 🤌 🤏 ✌️ 🤞 🤟 🤘 🤙 👈 👉 👆 🖕
👇 ☝️ 👍 👎 ✊ 👊 🤛 🤜 👏 🙌 🫶 👐 🤲 🤝 🙏 ✍️ 💅 🤳 💪 🦾 🦿 🦵
🦶 👂 🦻 👃 🧠 🫀 🫁 🦷 🦴 👀 👁️ 👅 👄 🫦 👶 🧒 👦 👧 🧑 👱 👨 👩
🧓 👴 👵 🙍 🙎 🙅 🙆 💁 🙋 🧏 🙇 🤦 🤷 👮 🕵️ 💂 🥷 👷 🤴 👸 👳 👲
🧕 🤵 👰 🤰 🤱 👼 🎅 🧑‍🎄 🦸 🦹 🧙 🧚 🧛 🧜 🧝 🧞 🧟 💆 💇 🚶 🧍 🧎
🏃 💃 🕺 🕴️ 👯 🧖 🧗 🤸 🏌️ 🏇 ⛷️ 🏂 🏋️ 🤼 🤽 🤾 🤺 ⛹️ 🏊 🤹 🧘 🛀
🛌 👫 👬 👭 💏 💑 👪 🗣️ 👤 👥 🫂 👣 🐵 🐒 🦍 🦧 🐶 🐕 🦮 🐕‍🦺 🐩
🐺 🦊 🦝 🐱 🐈 🐈‍⬛ 🦁 🐯 🐅 🐆 🐴 🐎 🦄 🦓 🦌 🦬 🐮 🐂 🐃 🐄 🐷
🐖 🐗 🐽 🐏 🐑 🐐 🐪 🐫 🦙 🦒 🐘 🦣 🦏 🦛 🐭 🐁 🐀 🐹 🐰 🐇 🐿️
🦫 🦔 🦇 🐻 🐻‍❄️ 🐨 🐼 🦥 🦦 🦨 🦘 🦡 🐾 🦃 🐔 🐓 🐣 🐤 🐥 🐦 🐧
🕊️ 🦅 🦆 🦢 🦉 🦤 🪶 🦩 🦚 🦜 🐸 🐊 🐢 🦎 🐍 🐲 🐉 🦕 🦖 🐳 🐋
🐬 🦭 🐟 🐠 🐡 🦈 🐙 🐚 🐌 🦋 🐛 🐜 🐝 🪲 🐞 🦗 🪳 🕷️ 🕸️ 🦂 🦟
🪰 🪱 🦠 💐 🌸 💮 🏵️ 🌹 🥀 🌺 🌻 🌼 🌷 🪻 🌱 🪴 🌲 🌳 🌴 🌵 🌾
🌿 ☘️ 🍀 🍁 🍂 🍃 🪹 🪺 🍄 🍇 🍈 🍉 🍊 🍋 🍌 🍍 🥭 🍎 🍏 🍐 🍑 🍒
🍓 🫐 🥝 🍅 🫒 🥥 🥑 🍆 🥔 🥕 🌽 🌶️ 🫑 🥒 🥬 🥦 🧄 🧅 🍄 🥜 🫘 🌰
🍞 🥐 🥖 🫓 🥨 🥯 🥞 🧇 🧀 🍖 🍗 🥩 🥓 🍔 🍟 🍕 🌭 🥪 🥙 🧆 🌮 🌯
🫔 🥗 🥘 🫕 🥫 🍝 🍜 🍲 🍛 🍣 🍱 🥟 🦪 🍤 🍙 🍚 🍘 🍥 🥠 🥮 🍢 🍡
🍧 🍨 🍦 🥧 🧁 🍰 🎂 🍮 🍭 🍬 🍫 🍿 🍩 🍪 🌰 🥜 🍯 🥛 🍼 🫖 ☕ 🍵
🧃 🥤 🧋 🍶 🍺 🍻 🥂 🍷 🥃 🍸 🍹 🧉 🍾 🧊 🥄 🍴 🍽️ 🥣 🥡 🥢 🧂
⚽ ⚾ 🥎 🏀 🏐 🏈 🏉 🎾 🥏 🎳 🏏 🏑 🏒 🥍 🏓 🏸 🥊 🥋 🥅 ⛳ ⛸️ 🎣
🤿 🎽 🎿 🛷 🥌 🎯 🪀 🪁 🎱 🔮 🪄 🧿 🎮 🕹️ 🎰 🎲 🧩 🧸 🪅 🪩 🪆
♠️ ♥️ ♦️ ♣️ ♟️ 🃏 🀄 🎴 🎭 🖼️ 🎨 🧵 🪡 🧶 🪢 👓 🕶️ 🥽 🥼 🦺 👔
👕 👖 🧣 🧤 🧥 🧦 👗 👘 🥻 🩱 🩲 🩳 👙 👚 👛 👜 👝 🛍️ 🎒 🩴 👞
👟 🥾 🥿 👠 👡 🩰 👢 👑 👒 🎩 🎓 🧢 🪖 ⛑️ 📿 💄 💍 💎 🔇 🔈
🔉 🔊 📢 📣 📯 🔔 🔕 🎼 🎵 🎶 🎙️ 🎚️ 🎛️ 🎤 🎧 📻 🎷 🎺 🪗 🎸 🪕
🎻 🪘 🥁 🪇 🪈 📱 📲 ☎️ 📞 📟 📠 🔋 🔌 💻 🖥️ 🖨️ ⌨️ 🖱️ 🖲️ 💽
💾 💿 📀 🧮 🎥 🎞️ 📽️ 🎬 📺 📷 📸 📹 📼 🔍 🔎 🕯️ 💡 🔦 🏮 🪔 📔
📕 📖 📗 📘 📙 📚 📓 📒 📃 📜 📄 📰 🗞️ 📑 🔖 🏷️ 💰 🪙 💴 💵 💶
💷 💸 💳 🧾 💹 ✉️ 📧 📨 📩 📤 📥 📦 📫 📪 📬 📭 📮 🗳️ ✏️ ✒️ 🖋️
🖊️ 🖌️ 🖍️ 📝 💼 📁 📂 🗂️ 📅 📆 🗒️ 🗓️ 📇 📈 📉 📊 📋 📌 📍 📎
🖇️ 📏 📐 ✂️ 🗃️ 🗄️ 🗑️ 🔒 🔓 🔏 🔐 🔑 🗝️ 🔨 🪓 ⛏️ ⚒️ 🛠️ 🗡️ ⚔️
🔫 🪃 🏹 🛡️ 🪚 🔧 🪛 🔩 ⚙️ 🗜️ ⚖️ 🦯 🔗 ⛓️ 🪝 🧰 🧲 🪜 ⚗️ 🧪 🧫
🧬 🔬 🔭 📡 💉 🩸 💊 🩹 🩼 🩺 🩻 🚪 🛗 🪞 🪟 🛏️ 🛋️ 🪑 🚽 🪠 🧻
🧼 🫧 🪥 🧽 🧴 🛁 🧹 🧺 🧻 🪣 🧯 🛒 🚬 ⚰️ 🪦 ⚱️ 🗿 🪧 🪪 🏧 🚮
🚰 ♿ 🚹 🚺 🚻 🚼 🚾 🛂 🛃 🛄 🛅 ⚠️ 🚸 ⛔ 🚫 🚳 🚭 🚯 🚱 🚷 📵
🔞 ☢️ ☣️ ⬆️ ↗️ ➡️ ↘️ ⬇️ ↙️ ⬅️ ↖️ ↕️ ↔️ ↩️ ↪️ ⤴️ ⤵️ 🔃 🔄 🔙
🔚 🔛 🔜 🔝 🛐 ☪️ 💠 🔘 🔳 🔲
🏁 🚩 🎌 🏴 🏳️ 🏳️‍🌈 🏳️‍⚧️ 🏴‍☠️
⌚ 📱 📲 💻 ⌨️ 🖥️ 🖨️ 🖱️ 🖲️ 🕹️ 🗜️ 💽 💾 💿 📀 📼 📷 📸 📹 🎥 📽️
🎞️ 📞 ☎️ 📟 📠 📺 📻 🎙️ 🎚️ 🎛️ 🧭 ⏱️ ⏲️ ⏰ 🕰️ ⌛ ⏳ 📡 🔋 🔌 💡
🔦 🕯️ 🪔 🧯 🛢️ 💸 💵 💴 💶 💷 🪙 💰 💳 💎 ⚖️ 🪜 🧰 🪛 🔧 🔨 ⚒️ 🛠️
⛏️ 🪚 🔩 ⚙️ 🪤 🧱 ⛓️ 🧲 🔫 💣 🧨 🪓 🔪 🗡️ ⚔️ 🛡️ 🚬 ⚰️ 🪦 ⚱️ 🏺
🔮 📿 🧿 💈 ⚗️ 🔭 🔬 🕳️ 🩹 🩺 💊 💉 🩸 🧬 🦠 🧫 🧪 🌡️ 🧹 🪠 🧺
🧻 🚽 🚰 🚿 🛁 🛀 🧼 🪥 🪒 🧽 🪣 🧴 🛎️ 🔑 🗝️ 🚪 🪑 🛋️ 🛏️ 🛌
🧸 🪆 🖼️ 🛍️ 🛒 🎁 🎈 🎏 🎀 🪄 🪅 🎊 🎉 🎎 🏮 🎐 🧧 ✉️ 📩 📨
📧 💌 📥 📤 📦 🏷️ 🪧 🪪 🗞️ 📰 📑 🔖 🏷️ 💰 🪙 💎 ⚖️ 🧰 🪛 🔧
🌋 🗻 🏕️ 🏖️ 🏜️ 🏝️ 🏞️ 🏟️ 🏛️ 🏗️ 🧱 🪨 🪵 🛖 🏘️ 🏚️ 🏠 🏡 🏢
🏣 🏤 🏥 🏦 🏨 🏩 🏪 🏫 🏬 🏭 🏯 🏰 💒 🗼 🗽 ⛪ 🕌 🛕 🕍 ⛩️ 🕋
⛲ ⛺ 🌁 🌃 🏙️ 🌄 🌅 🌆 🌇 🌉 ♨️ 🎠 🎡 🎢 💈 🎪 🚂 🚃 🚄 🚅 🚆
🚇 🚈 🚉 🚊 🚝 🚞 🚋 🚌 🚍 🚎 🚐 🚑 🚒 🚓 🚔 🚕 🚖 🚗 🚘 🚙 🛻
🚚 🚛 🚜 🏎️ 🏍️ 🛵 🦽 🦼 🛺 🚲 🛴 🛹 🛼 🚏 🛣️ 🛤️ 🛢️ ⛽ 🚨
🚥 🚦 🛑 🚧 ⚓ 🛟 ⛵ 🛶 🚤 🛳️ ⛴️ 🛥️ 🚢 ✈️ 🛩️ 🛫 🛬 🪂 💺 🚁
🚟 🚠 🚡 🛰️ 🚀 🛸 🛎️ 🧳 ⌛ ⏳ ⌚ ⏰ ⏱️ ⏲️ 🕰️ 🌑 🌒 🌓 🌔 🌕
🌖 🌗 🌘 🌙 🌚 🌛 🌜 🌡️ ☀️ 🌝 🌞 🪐 ⭐ 🌟 🌠 🌌 ☁️ ⛅ ⛈️ 🌤️
🌥️ 🌦️ 🌧️ 🌨️ 🌩️ 🌪️ 🌫️ 🌬️ 🌀 🌈 🌂 ☂️ ☔ ⛱️ ⚡ ❄️ ☃️ ⛄ ☄️
🔥 💧 🌊 🎃 🎄 🎆 🎇 🧨 ✨ 🎈 🎉 🎊 🎋 🎍 🎎 🎏 🎐 🎑 🧧 🎀 🎁
🎗️ 🎟️ 🎫 🎖️ 🏆 🏅 🥇 🥈 🥉 ⚽ ⚾ 🥎 🏀 🏐 🏈 🏉 🎾 🥏 🎳 🏏 🏑
🏒 🥍 🏓 🏸 🥊 🥋 🥅 ⛳ ⛸️ 🎣 🤿 🎽 🎿 🛷 🥌 🎯 🪀 🪁 🎱 🔮 🧿
🎮 🕹️ 🎰 🎲 🧩 🧸 ♠️ ♥️ ♦️ ♣️ ♟️ 🃏 🀄 🎴 🎭 🖼️ 🎨 🧵 🪡 🧶
`.trim().split(/\s+/);

/** Renders as two-letter codes on Windows — not visual */
function isTextLikeEmoji(emoji) {
  const cps = [...emoji];
  const regional = cps.filter((cp) => /[\u{1F1E6}-\u{1F1FF}]/u.test(cp)).length;
  if (regional >= 1) return true;
  if (/[\u{E0020}-\u{E007F}]/u.test(emoji)) return true;
  return false;
}

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.codePointAt(i)) >>> 0;
  return h;
}

function quoteFor(emoji, index) {
  if (CATEGORY_HINTS[emoji]) return CATEGORY_HINTS[emoji];
  const h = hash(emoji);
  const base = QUOTE_POOL[h % QUOTE_POOL.length] ?? QUOTE_POOL[0];
  return base;
}

const seen = new Set();
const moods = [];

for (const raw of RAW_EMOJIS) {
  if (!raw || raw.length === 0) continue;
  if (BLOCKED.has(raw)) continue;
  if (isTextLikeEmoji(raw)) continue;
  if (seen.has(raw)) continue;
  seen.add(raw);
  moods.push({ emoji: raw, quote: quoteFor(raw, moods.length) });
}

if (moods.length < 500) {
  console.error(`Only ${moods.length} emojis after filtering — need 500+`);
  process.exit(1);
}

const out = `/** Auto-generated — ${moods.length} safe emoji moods. Regenerate: node scripts/generate-emoji-moods.mjs */
export const EMOJI_MOODS = ${JSON.stringify(moods, null, 2)} as const;

export type EmojiMood = (typeof EMOJI_MOODS)[number];

export const EMOJI_QUOTES: Record<string, string> = Object.fromEntries(
  EMOJI_MOODS.map(({ emoji, quote }) => [emoji, quote]),
);

export const EMOJIS = EMOJI_MOODS.map(({ emoji }) => emoji);
`;

writeFileSync(join(__dirname, "../data/emoji-moods.ts"), out, "utf8");
console.log(`Generated ${moods.length} emoji moods → data/emoji-moods.ts`);
