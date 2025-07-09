<script lang="ts">
	import { dps, healers, tanks } from '$lib/util/data';
	import type { Class, Role, Spec } from '$lib/util/types';
	import ClassSpecDictDisplay from './ClassSpecDictDisplay.svelte';

	let {
		pickSpec,
		rolesPicked
	}: {
		pickSpec: (className: Class, spec: Spec, role: Role) => void;
		rolesPicked: { [key in Role]: number };
	} = $props();

	function handlePickSpec(className: Class, spec: Spec, role: Role) {
		pickSpec(className, spec, role);
	}
</script>

<div class="flex flex-col gap-4">
	<p>Tank</p>

	<ClassSpecDictDisplay
		disabled={rolesPicked.tank >= 1}
		role="tank"
		classSpecDict={tanks}
		handleClick={handlePickSpec}
	/>

	<p>Healer</p>

	<ClassSpecDictDisplay
		disabled={rolesPicked.healer >= 1}
		role="healer"
		classSpecDict={healers}
		handleClick={handlePickSpec}
	/>

	<p>DPS</p>
	<ClassSpecDictDisplay
		disabled={rolesPicked.dps >= 3}
		role="dps"
		classSpecDict={dps}
		handleClick={handlePickSpec}
	/>
</div>
