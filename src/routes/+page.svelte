<script lang="ts">
	import ClassPicker from '$lib/components/ClassPicker.svelte';

	import { compToRoles, compTotalCharacters, isCompFull } from '$lib/util/data';
	import {
		type CompRoles,
		type Class,
		type Comp as CompType,
		type Role,
		type Spec
	} from '$lib/util/types';
	import {
		exportCompsToFile,
		importCompsFromFile,
		saveCompsToStorage,
		loadCompsFromStorage
	} from '$lib/util/comps';
	import Comp from '$lib/components/Comp.svelte';
	import { onMount } from 'svelte';

	let comps = $state<CompType[]>([[]]);
	const currentCompIndex = $derived(comps.length - 1);
	const currentComp = $derived(comps[currentCompIndex]);
	const currentCompRoles = $derived(compToRoles(currentComp));

	onMount(() => {
		const stored = loadCompsFromStorage();
		if (stored) {
			comps = stored;
		}
	});

	$effect(() => saveCompsToStorage(comps));

	let pickSpec = (className: Class, spec: Spec) => {
		comps[currentCompIndex] = [...currentComp, [className, spec]];

		if (isCompFull(currentComp)) {
			comps = [...comps, []];
		}
	};

	const removeComp = (index: number) => () => {
		if (index === comps.length - 1) {
			comps[index] = [];
			return;
		}

		comps.splice(index, 1);
		return;
	};

	function exportComps() {
		exportCompsToFile(comps);
	}

	async function importComps(event: Event) {
		const imported = await importCompsFromFile(event, []);
		if (!imported) {
			alert('Could not import comps. Check if your file is correct.');
			return;
		}
		comps = imported;
	}
</script>

<div
	class="w-screen h-screen overflow-hidden flex flex-col justify-center items-center gap-4 bg-slate-800 text-white"
>
	<div class="flex gap-2">
		<button
			class="border-2 border-slate-400 rounded-sm p-2 bg-slate-700 hover:bg-slate-600"
			onclick={exportComps}
		>
			Export Comps
		</button>
		<label
			class="border-2 border-slate-400 rounded-sm p-2 bg-slate-700 hover:bg-slate-600 cursor-pointer"
		>
			Import Comps
			<input type="file" accept="application/json" onchange={importComps} style="display:none" />
		</label>
	</div>

	<ClassPicker
		rolesPicked={{
			tank: currentCompRoles.tank.length,
			healer: currentCompRoles.healer.length,
			dps: currentCompRoles.dps.length
		}}
		{pickSpec}
	/>

	<div class="flex flex-col gap-8 overflow-auto w-full items-center">
		{#each comps as comp, index}
			<Comp {comp} removeComp={removeComp(index)} name={`Comp ${index + 1}`} />
		{/each}
	</div>
</div>
