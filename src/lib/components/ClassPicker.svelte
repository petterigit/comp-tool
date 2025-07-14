<script lang="ts">
	import { classDetails, compToRoles, roleAmountsInComp, specDetails } from '$lib/util/data';
	import { Class, Spec } from '$lib/util/types';
	import clsx from 'clsx';
	import SpecDisplay from './SpecDisplay.svelte';
	import { sortByRoleClassSpec } from '$lib/util/sort';

	let {
		pickSpec,
		specsPicked
	}: {
		pickSpec: (spec: Spec) => void;
		specsPicked: Spec[];
	} = $props();

	const roles = $derived(compToRoles(specsPicked));

	const roleFull = (spec: Spec) => {
		const role = specDetails[spec].role;
		const picked = roles[role].length;
		return picked < roleAmountsInComp[role];
	};
</script>

<div class="flex flex-col gap-4">
	<div class="flex flex-row gap-4 flex-wrap">
		{#each Object.values(Class) as className}
			<div class="flex flex-row border-2 bg-slate-900 rounded-md border-{className}">
				{#each classDetails[className].specs.sort(sortByRoleClassSpec) as spec}
					<button
						disabled={!roleFull(spec)}
						class={clsx(
							'p-2',
							roleFull(spec) &&
								'cursor-pointer outline-slate-500 hover:brightness-150 hover:outline-slate-500',
							!roleFull(spec) && 'outline-slate-700 brightness-50 '
						)}
						onclick={() => pickSpec(spec)}
					>
						<SpecDisplay hideClassBorder {spec} />
					</button>
				{/each}
			</div>
		{/each}
	</div>
</div>
