<script lang="ts">
	import ClassPicker from '$lib/components/ClassPicker.svelte';

	import { type Comp as CompType, type Spec } from '$lib/util/types';

	import Comp from '$lib/components/Comp.svelte';
	import { compToRoles } from '$lib/util/data';

	let comp = $state<CompType>([]);
	const compRoles = $derived(compToRoles(comp));

	let pickSpec = (spec: Spec) => {
		comp = [...comp, spec];
	};

	const resetComp = () => {
		comp = [];
	};

	const resetSpec = (index: number) => {
		comp = comp.filter((_, i) => i !== index);
	};
</script>

<ClassPicker specsPicked={comp} {pickSpec} />

<div class="flex flex-col gap-8 overflow-auto w-full items-center">
	<Comp {comp} {resetSpec} {resetComp} />
</div>
