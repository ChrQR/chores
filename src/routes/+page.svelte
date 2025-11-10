<script lang="ts">
	import { Card, CardContent, CardTitle, CardDescription } from '$lib/components/ui/card';
	import { timeOfDayToDK, recurrenceToDK } from '$lib/utils';
	import type { PageData } from './$types';
	import { ArrowUpCircle, Calendar, CalendarCheck, Check, Clock, RefreshCw } from '@lucide/svelte';
	import TaskCardDelete from './tasks/taskCardDelete.svelte';
	import { today } from '@internationalized/date';

	let { data }: { data: PageData } = $props();
</script>

<div>
	<h1>Daily Tasks</h1>
	{#if data.tasks.length === 0}
		<p>Alle opgaver for i dag er udfoert</p>
	{:else}
		{#each data.tasks as task}
			<Card class="mt-6 w-[400px]">
				<CardContent class="flex h-full flex-col justify-between">
					<div>
						<CardTitle class="flex items-center justify-between"
							>{task.title}<Check class="text-green-500" /></CardTitle
						>
						<CardDescription>{task.description}</CardDescription>
					</div>
					<div class="mt-2 flex justify-between text-sm">
						<div class="flex items-center gap-1">
							<Clock class="size-4" /><span class="capitalize"
								>{timeOfDayToDK(task?.timeOfDay)}</span
							>
						</div>
						<div class="flex items-center gap-1">
							<RefreshCw class="size-4" /><span
								>Hver {task?.recurrenceInterval !== 1 ? `${task.recurrenceInterval}.` : ''}
								{recurrenceToDK(task.recurrenceType)}</span
							>
						</div>
						<div class="flex items-center gap-1">
							<CalendarCheck class="size-4" />
							<span
								>{task.lastCompletion ? new Date(task.lastCompletion.getDate() + 1) : 'I dag'}</span
							>
						</div>
					</div>
				</CardContent>
			</Card>
		{/each}
	{/if}
</div>
