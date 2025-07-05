import Image from "next/image";

const Home = () => {
  return (
    <div className="mt-[25vh]">
      <div className="flex gap-5">
        <div>
          A developer, Agammer (if possible try to make it proffesiona,)
        </div>
        <div className="w-fit max-h-[200px] overflow-hidden">
          <Image src={"/image1.png"} height={250} width={250} alt="Profile" />
        </div>
      </div>
      <div>
        <div className="font-english-heading text-display-2xl">About</div>
        <div className="font-mono text-lg">
          I’m Farhaan, a versatile digital creator based in Karnataka, India,
          with a strong focus on frontend development. By day, I work as a
          Senior Frontend Engineer crafting sleek, high-performance apps with
          React and Next.js. By night, I freelance on backend systems and
          experiment with Go, Rust, and mobile development. With a Master’s in
          Computer Applications and 3+ years of experience, I specialize in
          turning ideas into clean, efficient code.
        </div>
      </div>
    </div>
  );
};

export default Home;
