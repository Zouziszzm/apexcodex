"use client";

import Navbar from "@/components/common/navbar/navbar";


export default function Template({ children }) {

  return (
    <>
      <div className="relative h-fit">
        <Navbar />
        {children}
      </div>
    </>
  );
}
