import { Project } from "@/types/projects";

export const projects: Project[] = [
  {
    id: "hammered-oath",
    title: "Hammered Oath",
    subtext: "A 2D platformer game developed during my university years.",
    date: "Dec 2021",
    description: "Hammered Oath is a 2D platformer game developed during my university years. The project involved designing gameplay mechanics, levels, and visuals from scratch. I handled both design and development as a solo project.",
    devNotes: "Built with C# and Unity. Implemented custom physics for character movement and parallax background systems.",
    images: ["/assets/hammeredOath.png"],
    tags: ["Desktop", "Game Design", "Unity 3D"],
    contribution: "Solo Game Designer & Developer",
    extent: ["Design", "Develop"],
    stack: ["Unity 3D", "C#"],
    category: "Personal",
  },
  {
    id: "voxel-chunks",
    title: "Voxel Chunks",
    subtext: "A personal design exploration focused on creating 3D structures using voxel-based tools.",
    date: "Jan 2024",
    description: "Voxel Chunks is a personal design exploration focused on creating 3D structures using voxel-based tools. The project emphasizes form, scale, and modular composition rather than functional software.",
    devNotes: "Explored modular voxel generation techniques. Focused on lighting and material properties within a voxel environment.",
    images: ["/assets/Voxel.png", "/assets/Voxel2.png"],
    tags: ["Design", "Voxel Art", "3D"],
    contribution: "Voxel Designer",
    extent: ["Design"],
    stack: ["Voxel"],
    category: "Personal",
  },
];