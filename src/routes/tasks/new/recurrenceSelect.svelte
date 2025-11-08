<script lang="ts">
	import { Label } from '$lib/components/ui/label';
	import { Select, SelectTrigger, SelectContent, SelectItem } from '$lib/components/ui/select';
	import { recurrenceToDK } from '$lib/utils';
	let { options }: { options: string[] } = $props();
	let selected = $state('DAILY');
</script>

<div class="space-y-2">
	<Label for="recurrenceType">Tilbagevenden</Label>
	<Select type="single" name="recurrenceType" onValueChange={(value) => (selected = value)}>
		<SelectTrigger class="capitalize">{recurrenceToDK(selected)}</SelectTrigger>
		<SelectContent>
			{#each options as recurrence}
				<SelectItem value={recurrence} class="capitalize">{recurrenceToDK(recurrence)}</SelectItem>
			{/each}
		</SelectContent>
	</Select>
</div>
