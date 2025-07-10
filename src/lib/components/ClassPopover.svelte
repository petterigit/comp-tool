<script lang="ts">
	import * as Popover from '$lib/components/ui/popover/index.js';
	import type { ClassSpec } from '$lib/util/types';
	import SpecDisplay from './SpecDisplay.svelte';

	const { children, specs }: { children: any; specs: ClassSpec[] } = $props();
</script>

<Popover.Root>
	<Popover.Trigger>
		<span
			class="flex flex-row items-center gap-2 p-2 cursor-pointer rounded-md hover:bg-slate-800 hover:outline-2"
		>
			{@render children()}
			<span class="icon-[lucide--info] bg-white"></span>
		</span>
	</Popover.Trigger>
	<Popover.Content>
		{#each specs as classSpec}
			<div class="flex flex-row gap-2">
				<SpecDisplay size="sm" className={classSpec[0]} spec={classSpec[1]} />
				<p class="text-sm text-slate-300">
					{classSpec[1]}
				</p>
			</div>
		{/each}
	</Popover.Content>
</Popover.Root>
