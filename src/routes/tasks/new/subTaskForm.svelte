<script lang="ts">
	import BasicInput from '$lib/components/BasicInput.svelte';
	let { idx }: { idx: number } = $props();
</script>

<BasicInput type="text" label="Underopgave" name={`subtask-title-${idx}`} />
