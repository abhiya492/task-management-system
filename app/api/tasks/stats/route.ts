// app/api/tasks/stats/route.ts
import { NextResponse } from "next/server";
import { db, eq, and } from "@/db";
import { tasks } from "@/db/schema";
import { count } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { auth } from "@/lib/auth";

interface TaskStats {
  count: number;
}

interface SessionUser {
  id: string;
  name?: string;
  email?: string;
}

interface Session {
  user?: SessionUser;
}
  


export async function GET() {
  try {
    const session = await getServerSession(auth) as Session | null;
    if (!session?.user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = parseInt(session.user.id);

  const totalTasks = await db
    .select({ count: count() })
    .from(tasks)
    .where(eq(tasks.userId, userId))
    .then((res: TaskStats[]) => res[0]?.count ?? 0);

  const completedTasks = await db
    .select({ count: count() })
    .from(tasks)
    .where(
      and(
        eq(tasks.userId, userId),
        eq(tasks.completed, true)
      )
    )
    .then((res: TaskStats[]) => res[0]?.count ?? 0);
;

    // Calculate pending tasks
    const pendingTasks = totalTasks - completedTasks;

    return NextResponse.json({
      totalTasks,
      completedTasks,
      pendingTasks,
    });
  } catch (error) {
    console.error("Error fetching task stats:", error);
    return NextResponse.json(
      { message: "Error fetching task statistics" },
      { status: 500 }
    );
  }
}
