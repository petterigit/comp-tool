<script lang="ts">
	import type { Class, ClassSpecDict, Role, Spec } from '$lib/util/types';
	import clsx from 'clsx';

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
		<div class="flex flex-row gap-1 p-2 border-2 bg-slate-900 rounded-md border-{classSpec[0]}">
			{#each Object.values(classSpec[1]) as spec}
				<button
					{disabled}
					class={clsx(!disabled && 'cursor-pointer')}
					onclick={() => handleClick(classSpec[0] as Class, spec as Spec, role)}
				>
					<img
						class={clsx(
							'w-12 h-12 outline-[2px] outline-offset-[-2px]  rounded-xs',
							!disabled && 'outline-slate-500 hover:brightness-150 hover:outline-slate-500',
							disabled && 'outline-slate-700 brightness-50 '
						)}
						src={`icons/spec/${classSpec[0]}/${spec}.jpg`}
						alt={`${classSpec[0]} ${spec}`}
					/>
				</button>
			{/each}
		</div>
	{/each}
</div>
