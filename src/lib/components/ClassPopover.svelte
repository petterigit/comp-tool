<script lang="ts">
	import * as Popover from '$lib/components/ui/popover/index.js';
	import type { Spec } from '$lib/util/types';
	import SpecDisplay from './SpecDisplay.svelte';

	const { children, specs }: { children: any; specs: Spec[] } = $props();
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
		{#each specs as spec}
			<div class="flex flex-row gap-2">
				<SpecDisplay size="sm" {spec} />
				<p class="text-sm text-slate-300">
					{spec}
				</p>
			</div>
		{/each}
	</Popover.Content>
</Popover.Root>
