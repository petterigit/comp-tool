<script lang="ts">
	import { classes, classSpecToClassSpecRole, getRole, roles } from '$lib/util/data';
	import type { Class, ClassSpec, ClassSpecRole, Role, Spec } from '$lib/util/types';
	import clsx from 'clsx';
	import SpecDisplay from './SpecDisplay.svelte';
	import { sortByRoleClassSpec } from '$lib/util/sort';

	let {
		pickSpec,
		rolesPicked
	}: {
		pickSpec: (className: Class, spec: Spec) => void;
		rolesPicked: { [key in Role]: number };
	} = $props();

	const roleFull = (spec: ClassSpecRole) => {
		return rolesPicked[spec[2]] < roles[spec[2]];
	};
</script>

<div class="flex flex-col gap-4">
	<div class="flex flex-row gap-4 flex-wrap">
		{#each Object.entries(classes).filter((classSpec) => classSpec[1].length >= 1) as classSpec}
			<div class="flex flex-row border-2 bg-slate-900 rounded-md border-{classSpec[0]}">
				{#each Object.values(classSpec[1])
					.map((spec) => classSpecToClassSpecRole([classSpec[0] as Class, spec]))
					.sort(sortByRoleClassSpec) as classSpecRole}
					<button
						disabled={!roleFull(classSpecRole)}
						class={clsx(
							'p-2',
							roleFull(classSpecRole) &&
								'cursor-pointer outline-slate-500 hover:brightness-150 hover:outline-slate-500',
							!roleFull(classSpecRole) && 'outline-slate-700 brightness-50 '
						)}
						onclick={() => pickSpec(classSpec[0] as Class, classSpecRole[1] as Spec)}
					>
						<SpecDisplay
							hideClassBorder
							className={classSpec[0] as Class}
							spec={classSpecRole[1] as Spec}
						/>
					</button>
				{/each}
			</div>
		{/each}
	</div>
</div>
