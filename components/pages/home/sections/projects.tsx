import React from "react";
import Link from "next/link";

const projects = [
  { title: "Hammered Oath", subtext: "A 2D platformer game developed during my university years." },
  { title: "Voxel Chunks", subtext: "A personal design exploration focused on creating 3D structures using voxel-based tools." },
];

export const ProjectsSection = () => {
  return (
    <section className="w-full mt-24 mb-32 flex flex-col gap-6">
      <div className="border-b border-[var(--border)] pb-2 mb-2">
        <h2 className="font-body-sm font-medium">01 Projects</h2>
      </div>
      
      <div className="flex flex-col gap-6">
        {projects.map((project, index) => (
          <div key={index} className="flex flex-col items-start group">
            <Link 
              href="#" 
              className="font-body-sm font-medium underline decoration-1 underline-offset-[3px] decoration-[var(--border)] hover:decoration-[var(--body)] transition-colors"
            >
              {project.title}
            </Link>
            <p className="font-light text-[13px] text-[var(--subtext)] mt-1">
              {project.subtext}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
