<script lang="ts">
	import ClassPicker from '$lib/components/ClassPicker.svelte';
	import EmptySpecDisplay from '$lib/components/EmptySpecDisplay.svelte';
	import SpecDisplay from '$lib/components/SpecDisplay.svelte';
	import { roles, rolesTotal } from '$lib/util/data';
	import { sortByClassSpec } from '$lib/util/sort';
	import type { Class, Comp, Role, Spec } from '$lib/util/types';
	import clsx from 'clsx';
	import {
		exportCompsToFile,
		importCompsFromFile,
		saveCompsToStorage,
		loadCompsFromStorage
	} from '$lib/util/comps';

	const compInit = {
		tank: [],
		healer: [],
		dps: []
	};

	let comps = $state<Comp[]>([{ ...compInit }]);

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

	const isEmptyComp = (index: number) => {
		return (
			comps[index].tank.length === 0 &&
			comps[index].healer.length === 0 &&
			comps[index].dps.length === 0
		);
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
			<div class="flex flex-col w-max gap-4 bg-slate-900 rounded-md border-2 border-slate-400">
				<p class="text-center rounded font-semibold">
					Comp {index + 1}
				</p>
				<div class="flex flex-row flex-wrap gap-4 h-max p-8">
					{#each [...new Array(roles.tank - comp.tank.length)]}
						<EmptySpecDisplay />
					{/each}
					{#each [...comp.tank].sort(sortByClassSpec) as spec}
						<SpecDisplay className={spec[0]} spec={spec[1]} />
					{/each}

					{#each [...new Array(roles.healer - comp.healer.length)]}
						<EmptySpecDisplay />
					{/each}
					{#each [...comp.healer].sort(sortByClassSpec) as spec}
						<SpecDisplay className={spec[0]} spec={spec[1]} />
					{/each}

					{#each [...new Array(roles.dps - comp.dps.length)]}
						<EmptySpecDisplay />
					{/each}

					{#each [...comp.dps].sort(sortByClassSpec) as spec}
						<SpecDisplay className={spec[0]} spec={spec[1]} />
					{/each}

					<button
						disabled={isEmptyComp(index)}
						onclick={removeComp(index)}
						class={clsx(
							'w-48 border-2',
							!isEmptyComp(index)
								? 'border-slate-400 cursor-pointer rounded-sm p-2 hover:bg-slate-700'
								: 'border-slate-400 rounded-sm p-2 hover:bg-slate-700 cursor-not-allowed'
						)}
					>
						Remove
					</button>
				</div>
			</div>
		{/each}
	</div>
</div>
