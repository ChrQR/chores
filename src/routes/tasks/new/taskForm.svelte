<script>
	import BasicInput from '$lib/components/BasicInput.svelte';
	import IntervalSelector from './intervalSelector.svelte';
	import RecurrenceSelect from './recurrenceSelect.svelte';
	import TimeOfDaySelector from './timeOfDaySelector.svelte';
	let { recurrenceOptions, timeOfDayOptions } = $props();
</script>

<BasicInput type="text" name="title" label="Titel" required={true} />
<BasicInput type="text" name="description" label="Beskrivelse" />
<div class="flex gap-2">
	<IntervalSelector />
	<RecurrenceSelect options={recurrenceOptions} />
</div>
<TimeOfDaySelector {timeOfDayOptions} />
