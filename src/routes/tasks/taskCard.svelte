<script lang="ts">
	import { timeOfDayToDK, recurrenceToDK } from '$lib/utils';
	import { Clock } from '@lucide/svelte';
	import { Calendar, Check } from '@lucide/svelte';
	import TaskCardDelete from './taskCardDelete.svelte';
	import { Card, CardContent, CardTitle, CardDescription } from '$lib/components/ui/card';
	import { setContext } from 'svelte';

	export type Task = {
		id: string | null;
		description: string | null;
		title: string;
		recurrenceType: 'DAILY' | 'WEEKLY' | 'MONTHLY';
		recurrenceInterval: number;
		timeOfDay: 'MORNING' | 'AFTERNOON' | 'EVENING' | null;
		isActive: boolean;
		lastCompletion: Date | null;
		createdAt: Date | null;
		subTasks: {
			title: string;
		}[];
	};

	let { task }: { task: Task } = $props();

	setContext('task', task);
</script>

<Card class="mt-6 w-[400px]">
	<CardContent class="flex h-full flex-col justify-between">
		<div>
			<CardTitle class="flex items-center justify-between">{task.title}<TaskCardDelete /></CardTitle
			>
			<CardDescription>{task.description}</CardDescription>
		</div>
		<div class="mt-2 flex justify-between text-sm">
			<div class="flex items-center gap-1">
				<Clock class="size-4" /><span class="capitalize">{timeOfDayToDK(task?.timeOfDay)}</span>
			</div>
			<div class="flex items-center gap-1">
				<Calendar class="size-4" /><span
					>Hver {task?.recurrenceInterval !== 1 ? `${task.recurrenceInterval}.` : ''}
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
