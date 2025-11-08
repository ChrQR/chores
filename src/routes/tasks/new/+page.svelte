<script lang="ts">
	import { enhance } from '$app/forms';
	import BasicInput from '$lib/components/BasicInput.svelte';
	import { Alert } from '$lib/components/ui/alert';
	import AlertDescription from '$lib/components/ui/alert/alert-description.svelte';
	import AlertTitle from '$lib/components/ui/alert/alert-title.svelte';
	import { Button } from '$lib/components/ui/button';
	import type { ActionData, PageData } from './$types';
	import IntervalSelector from './intervalSelector.svelte';
	import RecurrenceSelect from './recurrenceSelect.svelte';
	import TimeOfDaySelector from './timeOfDaySelector.svelte';
	let { data, form }: { data: PageData; form: ActionData } = $props();
	let timeOfDayOptions = data.timeOfDayOptions;
</script>

<h2>Ny Opgave</h2>

<form method="POST" class="mt-6" use:enhance>
	<div class="mt-4 space-y-4">
		<BasicInput type="text" name="title" label="Titel" required={true} />
		<BasicInput type="text" name="description" label="Beskrivelse" />
		<div class="flex gap-2">
			<IntervalSelector />
			<RecurrenceSelect options={data.options} />
		</div>
		<TimeOfDaySelector {timeOfDayOptions} />
		<Button type="reset" variant="ghost">Nulstil</Button>
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
