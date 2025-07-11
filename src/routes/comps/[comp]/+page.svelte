<script lang="ts">
	import { page } from '$app/stores';
	import { decodeComp } from '$lib/util/data';
	import SpecDisplay from '$lib/components/SpecDisplay.svelte';
	import { compToRoles } from '$lib/util/data';
	import { sortByClassSpec } from '$lib/util/sort';

	const encodedComp = $page.params.comp;
	const comp = decodeComp(encodedComp).sort(sortByClassSpec);
	const compRoles = compToRoles(comp);
	const compSpecs = $derived(
		Object.values(compRoles)
			.flat()
			.map((spec) => spec[1])
			.join(' - ')
	);
	const pageUrl = $page.url.toString();
	const pageHost = $page.url.host;
</script>

<svelte:head>
	<!-- Primary Meta Tags-->
	<title>M+ Comp: {compSpecs}</title>
	<meta name="title" content="M+ Comp: {compSpecs}" />
	<meta name="description" content="Mythic comp details for comp: {compSpecs}" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={pageUrl} />
	<meta property="og:title" content="M+ Comp: {compSpecs}" />
	<meta property="og:description" content="Mythic comp details for comp: {compSpecs}" />
	<meta property="og:image" content="{pageHost}/api/comp-image?comp={encodedComp}" />

	<meta property="og:image:width" content="800" />
	<meta property="og:image:height" content="300" />
	<meta property="og:image:alt" content="Details sheet for comp: {compSpecs}" />

	<!-- X -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={pageUrl} />
	<meta property="twitter:title" content="M+ Comp: {compSpecs}" />
	<meta property="twitter:description" content="Mythic comp details for comp: {compSpecs}" />
	<meta property="twitter:image" content="{pageHost}/api/comp-image?comp={encodedComp}" />
</svelte:head>

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
