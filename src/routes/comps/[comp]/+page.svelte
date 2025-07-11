<script lang="ts">
	import { page } from '$app/stores';
	import { decodeComp } from '$lib/util/data';
	import SpecDisplay from '$lib/components/SpecDisplay.svelte';
	import { compToRoles } from '$lib/util/data';
	import { sortByClassSpec } from '$lib/util/sort';

	const encodedComp = $page.params.comp;
	const comp = decodeComp(encodedComp).sort(sortByClassSpec);
	const compRoles = compToRoles(comp);
</script>

<h1>Comp Details</h1>
<div class="flex flex-row flex-wrap gap-4 h-max p-8">
	{#each [...compRoles.tank] as spec}
		<SpecDisplay size="lg" className={spec[0]} spec={spec[1]} />
	{/each}

	{#each [...compRoles.healer] as spec}
		<SpecDisplay size="lg" className={spec[0]} spec={spec[1]} />
	{/each}

	{#each [...compRoles.dps] as spec}
		<SpecDisplay size="lg" className={spec[0]} spec={spec[1]} />
	{/each}
</div>
