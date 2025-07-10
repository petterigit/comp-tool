<script lang="ts">
	import ClassPicker from '$lib/components/ClassPicker.svelte';
	import EmptySpecDisplay from '$lib/components/EmptySpecDisplay.svelte';
	import SpecDisplay from '$lib/components/SpecDisplay.svelte';
	import { roles, rolesTotal } from '$lib/util/data';
	import { sortByClassSpec } from '$lib/util/sort';
	import type { Class, Comp as CompType, Role, Spec } from '$lib/util/types';
	import clsx from 'clsx';
	import {
		exportCompsToFile,
		importCompsFromFile,
		saveCompsToStorage,
		loadCompsFromStorage
	} from '$lib/util/comps';
	import Comp from '$lib/components/Comp.svelte';

	const compInit = {
		tank: [],
		healer: [],
		dps: []
	};

	let comps = $state<CompType[]>([{ ...compInit }]);

	$effect(() => {
		const stored = loadCompsFromStorage();
		if (stored) {
			comps = stored;
		}
	});

	$effect(() => saveCompsToStorage(comps));

	let pickSpec = (className: Class, spec: Spec, role: Role) => {
		const comp = currentComp;
		comps[currentCompIndex][role] = [...comp[role], [className, spec]];

		if (comp.tank.length + comp.healer.length + comp.dps.length === rolesTotal) {
			comps = [...comps, { ...compInit }];
		}
	};

	const removeComp = (index: number) => () => {
		if (index === comps.length - 1) {
			comps[index] = compInit;
			return;
		}

		comps.splice(index, 1);
		return;
	};

	const currentCompIndex = $derived(comps.length - 1);

	const currentComp = $derived(comps[currentCompIndex]);

	function exportComps() {
		exportCompsToFile(comps);
	}

	async function importComps(event: Event) {
		const imported = await importCompsFromFile(event, compInit);
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
			tank: currentComp.tank.length,
			healer: currentComp.healer.length,
			dps: currentComp.dps.length
		}}
		{pickSpec}
	/>

	<div class="flex flex-col gap-8 overflow-auto w-full items-center">
		{#each comps as comp, index}
			<Comp {comp} removeComp={removeComp(index)} name={`Comp ${index + 1}`} />
		{/each}
	</div>
</div>
