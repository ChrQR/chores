<script lang="ts">
	import { enhance } from '$app/forms';
	import { Alert } from '$lib/components/ui/alert';
	import AlertDescription from '$lib/components/ui/alert/alert-description.svelte';
	import AlertTitle from '$lib/components/ui/alert/alert-title.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Minus, Plus } from '@lucide/svelte';
	import type { ActionData, PageData } from './$types';
	import SubTaskForm from './subTaskForm.svelte';
	import TaskForm from './taskForm.svelte';
	let { data, form }: { data: PageData; form: ActionData } = $props();
	let timeOfDayOptions = data.timeOfDayOptions;
	let recurrenceOptions = data.options;

	let subTaskCounter = $state(0);
</script>

<h2>Ny Opgave</h2>

<form method="POST" class="mt-6" use:enhance>
	<div class="mt-4 space-y-4">
		<div class="mt-4 space-y-4">
			<TaskForm {recurrenceOptions} {timeOfDayOptions} />
			<Button variant="ghost" onclick={() => (subTaskCounter += 1)}
				><Plus /> Tilfoej underopgave</Button
			>
			{#each Array.from({ length: subTaskCounter }, (_, i) => i + 1) as _, idx}
				<div class="flex w-full gap-2">
					<SubTaskForm {idx} />
					<div>
						<Button onclick={() => (subTaskCounter -= 1)} variant="ghost"
							><Minus class="text-red-500" />Fjern</Button
						>
					</div>
				</div>
			{/each}
		</div>
		<Button type="reset" variant="outline">Nulstil</Button>
		<Button type="submit">Gem</Button>
	</div>
</form>
{#if form?.formErrors}
	<Alert variant="destructive" class="w-fit">
		<AlertTitle>Fejl i input</AlertTitle>
		<AlertDescription>
			<ul class="list-inside list-disc">
				{#each Object.values(form?.formErrors) as formErrors}
					{#each formErrors as error}
						<li>{error}</li>
					{/each}
				{/each}
			</ul>
		</AlertDescription>
	</Alert>
{/if}
