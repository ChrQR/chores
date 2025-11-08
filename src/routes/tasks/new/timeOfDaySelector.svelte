<script lang="ts">
	import { Label } from '$lib/components/ui/label';
	import { Select, SelectTrigger, SelectContent, SelectItem } from '$lib/components/ui/select';
	import { timeOfDayToDK } from '$lib/utils';

	let { timeOfDayOptions }: { timeOfDayOptions: string[] } = $props();
	let selectedTimeOfDay = $state<string>('');
</script>

<div class="space-y-2">
	<Label for="recurrenceInterval">Tidspunkt paa dagen</Label>
	<Select type="single" onValueChange={(value) => (selectedTimeOfDay = value)} name="timeOfDay">
		<SelectTrigger class="capitalize"
			>{selectedTimeOfDay === null
				? 'Vælg Tidspunkt'
				: selectedTimeOfDay !== ''
					? timeOfDayToDK(selectedTimeOfDay)
					: 'Hele dagen'}</SelectTrigger
		>
		<SelectContent>
			<SelectItem value="" class="capitalize">Hele dagen</SelectItem>
			{#each timeOfDayOptions as time}
				<SelectItem value={time} class="capitalize">{timeOfDayToDK(time)}</SelectItem>
			{/each}
		</SelectContent>
	</Select>
</div>
