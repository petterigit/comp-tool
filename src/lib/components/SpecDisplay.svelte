<script lang="ts">
	import type { Class, Spec } from '$lib/util/types';

	let { className, spec }: { className: Class; spec: Spec } = $props();
</script>

<img
	class="w-24 h-24 outline-[4px] outline-offset-[-2px] outline-{className} rounded-xs"
	src={`icons/spec/${className}/${spec}.jpg`}
	alt={spec}
/>
