<script lang="ts">
	import type { PageProps } from './$types';
	import { Button } from '$lib/components/ui/button';
	import { toast } from 'svoast';
	import { onMount } from 'svelte';
	import TaskCard from './taskCard.svelte';
	import { Plus } from '@lucide/svelte';

	let { data, form }: PageProps = $props();

	onMount(() => {
		if (data.createSuccess) {
			toast.success('Opgave oprettet');
			const url = new URL(window.location.href);
			url.searchParams.delete('create');
			window.history.replaceState({}, '', url.pathname + url.search);
		}
	});
</script>

<h1>Opgave oversigt</h1>
<a href="/tasks/new">
	<Button variant="ghost">
		<Plus /> <span>Add Task</span>
	</Button>
</a>
<div class="flex flex-wrap gap-x-4">
	{#each data.tasks as task}
		<TaskCard {task} />
	{/each}
</div>
