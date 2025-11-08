import { recurrenceTypeEnum, subTask, task, timeOfDayEnum } from "$lib/server/db/schema";
import type { Actions, PageServerLoad } from "./$types";
import { z } from 'zod'
import { db } from "$lib/server/db";
import { fail, redirect } from "@sveltejs/kit";
import { taskSchema } from "$lib/schemas";
import { error } from "console";

export const load: PageServerLoad = async () => {
  return { options: recurrenceTypeEnum.enumValues, timeOfDayOptions: timeOfDayEnum.enumValues }
}


export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData()
    let subTasks = []
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("subtask-title") && typeof value === "string") {
        if (value !== "") {
          subTasks.push(value)
        }
      }
    }
    const result = taskSchema.safeParse(Object.fromEntries(formData.entries()))
    if (!result.success) {
      console.log(result.error)
      return fail(400, { formErrors: z.flattenError(result.error).fieldErrors })
    }
    await db.transaction(async (tx) => {
      const [taskRow] = await tx.insert(task).values(result.data).returning({ id: task.id })
      if (!taskRow.id) {
        throw error("no id returned from task creation")
      }
      for (const title of subTasks) {
        await tx.insert(subTask).values({
          title,
          taskId: taskRow.id
        })
      }
    })
    return redirect(303, "/tasks")
  }
} satisfies Actions

