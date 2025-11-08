<script lang="ts">
	import { Label } from '$lib/components/ui/label';
	import { Select, SelectTrigger, SelectContent, SelectItem } from '$lib/components/ui/select';

	let selectedInterval = $state(1);
</script>

<div class="space-y-2">
	<Label for="recurrenceInterval">Interval</Label>
	<Select
		type="single"
		onValueChange={(value) => (selectedInterval = parseInt(value))}
		name="recurrenceInterval"
	>
		<SelectTrigger class="w-16">{selectedInterval}</SelectTrigger>
		<SelectContent>
			{#each Array.from({ length: 10 }, (_, i) => i + 1) as interval}
				<SelectItem value={interval.toString()}>{interval}</SelectItem>
			{/each}
		</SelectContent>
	</Select>
</div>
