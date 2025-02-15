// app/api/tasks/route.ts
import { NextResponse } from "next/server";
import { db, eq } from "@/db";
import { tasks } from "@/db/schema";
import { getServerSession } from "next-auth";
import { auth } from "@/lib/auth";
import { z } from "zod";

const taskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  dueDate: z.string().datetime(),
  priority: z.enum(["low", "medium", "high"]),
  completed: z.boolean().default(false),
  projectId: z.number().optional(),
});

interface SessionUser {
  id: string;
  name?: string;
  email?: string;
}

interface Session {
  user?: SessionUser;
}

export async function GET() {
  const session = await getServerSession(auth) as Session | null;
  if (!session?.user) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const userTasks = await db
    .select()
    .from(tasks)
    .where(eq(tasks.userId, parseInt(session.user.id)));

  return NextResponse.json(userTasks);
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(auth) as Session | null;
    if (!session?.user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = taskSchema.parse(body);

    const newTask = await db
      .insert(tasks)
      .values({
        ...validatedData,
        userId: parseInt(session.user.id),
      })
      .returning();

    return NextResponse.json(newTask[0], { status: 201 });
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json(
      { message: "Error creating task" },
      { status: 500 }
    );
  }
}