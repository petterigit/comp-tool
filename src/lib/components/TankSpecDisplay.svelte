<script lang="ts">
	import type { Class, ClassSpecDict, Spec } from '$lib/util/types';

	let {
		classSpecDict,
		handleClick
	}: { classSpecDict: ClassSpecDict; handleClick: (className: Class, spec: Spec) => void } =
		$props();
</script>

<div class="flex flex-row gap-1">
	{#each Object.entries(classSpecDict) as classSpec}
		{#each Object.values(classSpec[0]) as spec}
			<button
				class="cursor-pointer"
				onclick={() => handleClick(classSpec[0] as Class, spec as Spec)}
			>
				<img
					class="w-12 h-12 outline-[2px] outline-offset-[-2px] outline-slate-500 rounded-xs hover:brightness-150 hover:outline-slate-500"
					src={`icons/spec/${classSpec[0]}/${spec}.jpg`}
					alt={`${classSpec[0]} ${spec}`}
				/>
			</button>
		{/each}
	{/each}
</div>
