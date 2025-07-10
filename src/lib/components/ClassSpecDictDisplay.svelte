<script lang="ts">
	import type { Class, ClassSpecDict, Role, Spec } from '$lib/util/types';
	import clsx from 'clsx';
	import SpecDisplay from './SpecDisplay.svelte';

	let {
		classSpecDict,
		handleClick,
		role,
		disabled
	}: {
		role: Role;
		disabled?: boolean;
		classSpecDict: ClassSpecDict;
		handleClick: (className: Class, spec: Spec, role: Role) => void;
	} = $props();
</script>

<div class="flex flex-row gap-4 flex-wrap">
	{#each Object.entries(classSpecDict).filter((classSpec) => classSpec[1].length >= 1) as classSpec}
		<div class="flex flex-row border-2 bg-slate-900 rounded-md border-{classSpec[0]}">
			{#each Object.values(classSpec[1]) as spec}
				<button
					{disabled}
					class={clsx(
						'p-2',
						!disabled &&
							'cursor-pointer outline-slate-500 hover:brightness-150 hover:outline-slate-500',
						disabled && 'outline-slate-700 brightness-50 '
					)}
					onclick={() => handleClick(classSpec[0] as Class, spec as Spec, role)}
				>
					<SpecDisplay hideClassBorder className={classSpec[0] as Class} {spec} />
				</button>
			{/each}
		</div>
	{/each}
</div>
