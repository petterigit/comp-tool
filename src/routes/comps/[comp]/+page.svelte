<script lang="ts">
	import { page } from '$app/stores';
	import { compToRoles, decodeComp, specDetails } from '$lib/util/data';
	import SpecDisplay from '$lib/components/SpecDisplay.svelte';
	import { sortByClassSpec } from '$lib/util/sort';
	import { Role } from '$lib/util/types';

	const encodedComp = $page.params.comp;
	const comp = decodeComp(encodedComp).sort(sortByClassSpec);
	const compRoles = compToRoles(comp);
	const pageUrl = $page.url.toString();
	const pageHost = $page.url.host;
	const compSpecs = comp.join(' - ');
	const tanks = comp.filter((spec) => specDetails[spec].role === Role.tank);
	const healers = comp.filter((spec) => specDetails[spec].role === Role.healer);
	const dps = comp.filter((spec) => specDetails[spec].role === Role.dps);
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
	{#each tanks as spec}
		<SpecDisplay size="lg" {spec} />
	{/each}

	{#each healers as spec}
		<SpecDisplay size="lg" {spec} />
	{/each}

	{#each dps as spec}
		<SpecDisplay size="lg" {spec} />
	{/each}
</div>
