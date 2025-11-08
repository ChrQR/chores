<script lang="ts">
	import { Input } from './ui/input';
	import { Label } from './ui/label';
	let {
		label,
		name,
		type,
		required = false
	}: { label: string; name: string; type: string; required?: boolean } = $props();
</script>

<div class="space-y-1">
	<Label for={name}
		>{label}{#if required}<span class="text-red-500">*</span>{/if}</Label
	>
	<Input {type} {name} />
</div>
