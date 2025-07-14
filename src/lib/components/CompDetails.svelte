<script lang="ts">
	import { specDetails } from '$lib/util/data';
	import {
		filterDamageTypeHybrid,
		filterDamageTypeMagic,
		filterDamageTypePhysical
	} from '$lib/util/filters';
	import { type Comp } from '$lib/util/types';
	import SpecDisplay from './SpecDisplay.svelte';

	const { comp }: { comp: Comp } = $props();
</script>

<div class="flex flex-col w-max gap-4">
	<div class="flex flex-col gap-2">
		<p class="text-lg">Damage types</p>
		<div class="ml-2 gap-2">
			<span>Physical: {comp.filter(filterDamageTypePhysical).length}</span>
			<ul class="flex flex-row gap-4">
				{#each comp.filter(filterDamageTypePhysical) as spec}
					<li>
						<SpecDisplay size="sm" {spec} />
					</li>
				{/each}
			</ul>
		</div>
		<div class="ml-2 gap-2">
			<span>Magic: {comp.filter(filterDamageTypeMagic).length}</span>
			<ul class="flex flex-row gap-4">
				{#each comp.filter(filterDamageTypeMagic) as spec}
					<li>
						<SpecDisplay size="sm" {spec} />
					</li>
				{/each}
			</ul>
		</div>

		<div class="ml-2 gap-2">
			<span>Hybrid: {comp.filter(filterDamageTypeHybrid).length}</span>
			<ul class="flex flex-row gap-4">
				{#each comp.filter(filterDamageTypeHybrid) as spec}
					<li>
						<SpecDisplay size="sm" {spec} />
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>
