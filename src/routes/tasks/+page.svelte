<script lang="ts">
	import { enhance } from '$app/forms';
	import { Card, CardContent, CardDescription, CardTitle } from '$lib/components/ui/card';
	import { Calendar, Check, Clock, Plus, Trash } from '@lucide/svelte';
	import type { PageProps } from './$types';
	import { recurrenceToDK, timeOfDayToDK } from '$lib/utils';
	import { Button } from '$lib/components/ui/button';
	import { toast } from 'svoast';

	let { data, form }: PageProps = $props();
</script>

<h1>Opgave oversigt</h1>
<a href="/tasks/new">
	<Button variant="ghost">
		<Plus /> <span>Add Task</span>
	</Button>
</a>
<div class="flex flex-wrap gap-x-4">
	{#each data.tasks as task}
		<Card class="mt-6 w-[400px]">
			<CardContent class="flex h-full flex-col justify-between">
				<div>
					<CardTitle class="flex items-center justify-between"
						>{task.title}
						<form
							method="POST"
							action="?/delete"
							use:enhance={() => {
								return async ({ result, update }) => {
									await update();

									if (result.type === 'success' && form?.success) {
										toast.success(form.toast);
									}
								};
							}}
						>
							<input type="hidden" name="taskId" value={task.id} />
							<Button type="submit" class="h-8" variant="ghost"
								><Trash class="text-red-500" /></Button
							>
						</form></CardTitle
					>
					<CardDescription>{task.description}</CardDescription>
				</div>
				<div class="mt-2 flex justify-between text-sm">
					<div class="flex items-center gap-1">
						<Clock class="size-4" /><span class="capitalize">{timeOfDayToDK(task.timeOfDay)}</span>
					</div>
					<div class="flex items-center gap-1">
						<Calendar class="size-4" /><span
							>Hver {task.recurrenceInterval !== 1 ? `${task.recurrenceInterval}.` : ''}
							{recurrenceToDK(task.recurrenceType)}</span
						>
					</div>
					<div class="flex items-center gap-1">
						<Check class="size-4" />
						<span>{task.lastCompletion ? task.lastCompletion : 'Aldrig'}</span>
					</div>
				</div>
			</CardContent>
		</Card>
	{/each}
</div>
