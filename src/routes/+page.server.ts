import { db } from '$lib/server/db';
import { taskCompletion } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const tasks = await db.query.task.findMany({
    with: {
      completions: {
        columns: {
          taskId: false,
        },
      }
    }
  })
  return { tasks }
}
