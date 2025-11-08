<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import type { PageData } from './$types';
	import { Plus } from '@lucide/svelte';

	let { data }: { data: PageData } = $props();
</script>

<div>
	<a href="/tasks/new">
		<Button variant="ghost">
			<Plus /> <span>Add Task</span>
		</Button>
	</a>
	<h1>Daily Tasks</h1>
	{#if data.tasks.length === 0}
		<p>No tasks for today!</p>
	{:else}
		<ul>
			{#each data.tasks as task}
				<li>{task.title}</li>
			{/each}
		</ul>
	{/if}
</div>
