<script lang="ts">
	import ClassPicker from '$lib/components/ClassPicker.svelte';

	import { compToRoles } from '$lib/util/data';
	import { type Class, type Comp as CompType, type Spec } from '$lib/util/types';

	import Comp from '$lib/components/Comp.svelte';

	let comp = $state<CompType>([]);
	const compRoles = $derived(compToRoles(comp));

	let pickSpec = (className: Class, spec: Spec) => {
		comp = [...comp, [className, spec]];
	};

	const resetComp = () => {
		comp = [];
	};

	const resetSpec = (index: number) => {
		comp = comp.filter((_, i) => i !== index);
	};
</script>

<ClassPicker
	rolesPicked={{
		tank: compRoles.tank.length,
		healer: compRoles.healer.length,
		dps: compRoles.dps.length
	}}
	{pickSpec}
/>

<div class="flex flex-col gap-8 overflow-auto w-full items-center">
	<Comp {comp} {resetSpec} {resetComp} />
</div>
