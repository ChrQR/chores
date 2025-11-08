import { db } from "$lib/server/db";
import { eq } from "drizzle-orm";
import type { Actions, PageServerLoad } from "./$types";
import { task } from "$lib/server/db/schema";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
  const tasks = await db.query.task.findMany({
    with: {
      subTasks: {
        columns: {
          title: true
        }
      }
    }
  })
  return { tasks }
}

export const actions = {
  delete: async ({ request }) => {
    const formData = await request.formData()
    const taskIdStr = formData.get("taskId") as string
    if (!taskIdStr) {
      return fail(400, "no task id")
    }
    await db.delete(task).where(eq(task.id, taskIdStr))
    return { success: true, toast: "Opgave slettet" }
  }
} satisfies Actions
