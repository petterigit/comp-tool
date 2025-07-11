import { createCanvas, loadImage } from 'canvas';
import type { RequestHandler } from '@sveltejs/kit';
import { classColors, compToRoles, decodeComp } from '$lib/util/data';
import { sortByClassSpec } from '$lib/util/sort';

/**
 * Works currently for comps with 5 specs.
 * @param param0
 * @returns
 */
export const GET: RequestHandler = async ({ url }) => {
	const comp = url.searchParams.get('comp');
	if (!comp) {
		return new Response('Missing params', { status: 400 });
	}

	const decoded = decodeComp(comp).sort(sortByClassSpec);
	const compRoles = compToRoles(decoded);
	const compSpecs = Object.values(compRoles).flat();

	if (compSpecs.length === 0) {
		return new Response('Could not read comp', { status: 404 });
	}

	const specsCount = compSpecs.length;
	const gap = 5;
	const padding = 10;
	const imageSize = 56;
	const borderWidth = 4;

	const width =
		padding +
		imageSize * compSpecs.length +
		gap * (specsCount - 1) +
		borderWidth * specsCount * 2 +
		padding;

	const height = imageSize + padding * 2;
	const canvas = createCanvas(width, height);
	const ctx = canvas.getContext('2d');

	// Background
	ctx.fillStyle = '#222';
	ctx.fillRect(0, 0, width, height);

	let x = padding;
	const y = padding;

	const borderRadius = 6;
	for (const [className, spec] of compSpecs) {
		try {
			const imgPath = `static/icons/spec/${className}/${spec}.jpg`;
			const img = await loadImage(imgPath);
			ctx.drawImage(img, x, y, imageSize, imageSize);
			drawRoundedRect(
				ctx as unknown as CanvasRenderingContext2D,
				x - borderWidth / 2,
				y - borderWidth / 2,
				imageSize + borderWidth,
				imageSize + borderWidth,
				borderRadius,
				classColors[className] ?? '#fff',
				borderWidth
			);
			ctx.restore();

			x += imageSize + padding + borderWidth;
		} catch (e) {
			console.error(`Failed to load image for ${className}/${spec}:`, e);
		}
	}

	const buffer = canvas.toBuffer('image/png');
	return new Response(buffer, {
		headers: {
			'Content-Type': 'image/png',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};

const drawRoundedRect = (
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
	w: number,
	h: number,
	r: number,
	color: string,
	outline: number
) => {
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(x + r, y);
	ctx.lineTo(x + w - r, y);
	ctx.quadraticCurveTo(x + w, y, x + w, y + r);
	ctx.lineTo(x + w, y + h - r);
	ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
	ctx.lineTo(x + r, y + h);
	ctx.quadraticCurveTo(x, y + h, x, y + h - r);
	ctx.lineTo(x, y + r);
	ctx.quadraticCurveTo(x, y, x + r, y);
	ctx.closePath();
	ctx.lineWidth = outline;
	ctx.strokeStyle = color;
	ctx.stroke();
	ctx.restore();
};
