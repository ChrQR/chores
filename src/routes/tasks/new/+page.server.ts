import { recurrenceTypeEnum, task, timeOfDayEnum } from "$lib/server/db/schema";
import type { Actions, PageServerLoad } from "./$types";
import { z } from 'zod'
import { db } from "$lib/server/db";
import { coercedInt } from "$lib/utils";
import { fail } from "@sveltejs/kit";
import { taskSchema } from "$lib/schemas";

export const load: PageServerLoad = async () => {
  return { options: recurrenceTypeEnum.enumValues, timeOfDayOptions: timeOfDayEnum.enumValues }
}


export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData()
    const result = taskSchema.safeParse(Object.fromEntries(formData.entries()))
    if (!result.success) {
      console.log(result.error)
      return fail(400, { formErrors: z.flattenError(result.error).fieldErrors })
    }
    await db.insert(task).values(result.data)
    return { success: true }
  }
} satisfies Actions

