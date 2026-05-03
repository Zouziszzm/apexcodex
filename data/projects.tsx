import { Project } from "@/types/projects";
import { TransitionLink } from "@/components/ui/transition-link";

export const projects: Project[] = [
  {
    id: "hammered-oath",
    title: "Hammered Oath",
    subtext:
      "An energetic 2D platformer that marks my very first leap into the world of game development.",
    date: "Dec 2021",
    description:
      "A vibrant 2D platformer born from college ambition and the pure thrill of building my first playable world. This was the project where I first fell in love with code—wrestling with Unity physics and C# scripts to bring my creative ideas to life. It’s a fun, heart-filled milestone that represents the exact moment I realized I wanted to build experiences for a living.",
    github: "https://github.com/Zouziszzm/Hammered-Oath",
    devNotes:
      "The first code I ever felt proud of. Features custom physics that occasionally fought back and parallax systems fueled by college ambition and late-night curiosity. A digital relic of where it all began.",
    images: ["/assets/hammeredOath.png"],
    tags: ["Desktop", "Game Design", "Unity 3D"],
    contribution: "Solo Game Designer & Developer",
    extent: ["Design", "Develop"],
    stack: ["Unity 3D", "C#"],
    category: "Personal",
  },
  {
    id: "voxel-chunks",
    title: "Voxel Construct",
    subtext:
      "An experimental world-building engine focused on high-performance voxel rendering.",
    date: "Jan 2024",
    description: (
      <>
        A deep dive into the world of 3D web engineering, born from a
        fascination with how complex forms can breathe life into a browser
        canvas. This project represents a pivotal learning phase during my time
        at{" "}
        <TransitionLink
          href="/#experience-metalinex"
          className="underline underline-offset-4 decoration-(--accent)/30 hover:decoration-(--accent) transition-all"
        >
          MetaLine-X
        </TransitionLink>
        , where I explored the intersection of Web3 and immersive visuals.
      </>
    ),
    github: "https://github.com/Zouziszzm/Voxel-Construct",
    devNotes: (
      <>
        Inspired by{" "}
        <a
          href="https://www.craftz.dog/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 decoration-(--accent)/30 hover:decoration-(--accent) transition-all font-medium italic"
        >
          craftzdog
        </a>
        &apos;s voxel aesthetic. Mastered texture baking and Three.js optimization while exploring the potential of 3D in the Web3 space at MetaLine X. A technical playground for high-performance rendering.
      </>
    ),
    images: ["/assets/Voxel.png", "/assets/Voxel2.png"],
    tags: ["Design", "Voxel Art", "3D"],
    contribution: "Voxel Designer",
    extent: ["Design"],
    stack: ["Voxel Rendering", "C#"],
    category: "Personal",
  },
];
