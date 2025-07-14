<script lang="ts">
	import ClassPicker from '$lib/components/ClassPicker.svelte';

	import { type Comp as CompType, type Spec } from '$lib/util/types';

	import Comp from '$lib/components/Comp.svelte';

	import { page } from '$app/state';

	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { decodeComp, encodeComp } from '$lib/util/data';

	let comp = $state<CompType>([]);

	let pickSpec = (spec: Spec) => {
		comp = [...comp, spec];
	};

	const resetComp = () => {
		comp = [];
	};

	const resetSpec = (index: number) => {
		comp = comp.filter((_, i) => i !== index);
	};

	onMount(() => {
		const urlComp = page.url.searchParams.get('comp');
		if (!urlComp) {
			return;
		}

		const decoded = decodeComp(urlComp);
		comp = decoded;
	});

	$effect(() => {
		const urlComp = page.url.searchParams.get('comp');
		const prevComp = urlComp ? decodeComp(urlComp) : [];

		// If specs have not been removed/added
		if (prevComp.length === comp.length) {
			return;
		}

		if (comp.length === 0) {
			goto('/', {
				replaceState: true,
				noScroll: true,
				keepFocus: true
			});
		} else {
			goto(`?comp=${encodeComp(comp)}`, {
				replaceState: true,
				noScroll: true,
				keepFocus: true
			});
		}
	});
</script>

<ClassPicker specsPicked={comp} {pickSpec} />

<div class="flex flex-col gap-8 overflow-auto w-full items-center">
	<Comp {comp} {resetSpec} {resetComp} />
</div>
