<script lang="ts">
	import ClassPicker from '$lib/components/ClassPicker.svelte';
	import SpecDisplay from '$lib/components/SpecDisplay.svelte';
	import type { Class, ClassSpecRole, Role, Spec } from '$lib/util/types';

	let specs = $state<ClassSpecRole[]>([]);

	let pickSpec = (className: Class, spec: Spec, role: Role) => {
		specs.push([className, spec, role]);
	};

	let showClassPicker = $derived(specs.length < 5);
</script>

<div
	class="w-screen h-screen overflow-hidden flex flex-col justify-center items-center gap-4 bg-slate-800 text-white"
>
	<h1 class="text-4xl">Welcome to comp tool</h1>
	<button
		onclick={() => (specs = [])}
		class="cursor-pointer border-2 border-slate-400 rounded-sm p-2 hover:bg-slate-700"
	>
		Reset
	</button>
	{#if showClassPicker}
		<ClassPicker {pickSpec} />
	{/if}

	<div class="flex flex-row flex-wrap gap-4">
		{#each specs as spec}
			<SpecDisplay className={spec[0]} spec={spec[1]} />
		{/each}
	</div>
</div>
