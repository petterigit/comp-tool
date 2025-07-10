<script lang="ts">
	import type { Class, Spec } from '$lib/util/types';
	import clsx from 'clsx';

	let {
		className,
		spec,
		size,
		hideClassBorder
	}: { className: Class; spec: Spec; size?: 'sm' | 'md' | 'lg'; hideClassBorder?: boolean } =
		$props();
	const sizeClass = $derived(
		{
			sm: 'w-8 h-8',
			md: 'w-12 h-12',
			lg: 'w-24 h-24'
		}[size ?? 'md']
	);

	const outlineSize = $derived(
		{
			sm: 'outline-[1px]',
			md: 'outline-[2px]',
			lg: 'outline-[4px]'
		}[size ?? 'md']
	);

	const outlineOffset = $derived(
		{
			sm: 'outline-offset-[-1px]',
			md: 'outline-offset-[-1px]',
			lg: 'outline-offset-[-2px]'
		}[size ?? 'md']
	);
</script>

<img
	class={clsx(
		sizeClass,
		outlineSize,
		outlineOffset,
		'rounded-xs',
		!hideClassBorder ? `outline-${className}` : 'outline-black'
	)}
	src={`icons/spec/${className}/${spec}.jpg`}
	alt={spec}
/>
