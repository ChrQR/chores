<script lang="ts">
	import { enhance } from '$app/forms';
	import { Trash } from '@lucide/svelte';
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button';
	import { toast } from 'svoast';
	import { getContext } from 'svelte';
	import type { Task } from './taskCard.svelte';
	const task: Task = getContext('task');
</script>

<form
	method="POST"
	action="?/delete"
	use:enhance={() => {
		return async ({ result, update }) => {
			await update();

			if (result.type === 'success' && page.form?.success) {
				toast.success(page.form?.toast);
			}
		};
	}}
>
	<input type="hidden" name="taskId" value={task?.id} />
	<Button type="submit" class="h-8" variant="ghost"><Trash class="text-red-500" /></Button>
</form>
