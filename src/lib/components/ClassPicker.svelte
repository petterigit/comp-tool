<script lang="ts">
	import { dps, healers, tanks } from '$lib/util/data';
	import type { Class, Role, Spec } from '$lib/util/types';
	import ClassSpecDictDisplay from './ClassSpecDictDisplay.svelte';

	let { pickSpec }: { pickSpec: (className: Class, spec: Spec, role: Role) => void } = $props();

	function handlePickSpec(className: Class, spec: Spec, role: Role) {
		pickSpec(className, spec, role);
	}
</script>

<div class="flex flex-col gap-4">
	<p>Tank</p>
	<div class="flex flex-row gap-4">
		<ClassSpecDictDisplay role="tank" classSpecDict={tanks} handleClick={handlePickSpec} />
	</div>
	<p>Healer</p>
	<div class="flex flex-row gap-4">
		<ClassSpecDictDisplay role="healer" classSpecDict={healers} handleClick={handlePickSpec} />
	</div>
	<p>DPS</p>
	<div class="flex flex-row gap-4">
		<ClassSpecDictDisplay role="dps" classSpecDict={dps} handleClick={handlePickSpec} />
	</div>
</div>
