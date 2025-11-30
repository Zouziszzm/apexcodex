"use client";

import Navbar from "@/components/common/navbar/navbar";
import { TemplateProps } from "@/lib/types";


export default function Template({ children }: TemplateProps) {

  return (
    <>
      <div className="relative h-fit">
        <Navbar />
        {children}
      </div>
    </>
  );
}

