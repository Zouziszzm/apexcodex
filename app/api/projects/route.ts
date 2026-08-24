import { NextResponse } from "next/server";
import { getProjects } from "@/lib/projects";

export const revalidate = 3600;

export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json(projects);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}
