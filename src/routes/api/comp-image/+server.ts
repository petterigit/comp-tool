import { createCanvas, loadImage } from '@napi-rs/canvas';
import type { RequestHandler } from '@sveltejs/kit';
import { classDetails, decodeComp, specDetails } from '$lib/util/data';
import { sortByClassSpec } from '$lib/util/sort';

/**
 * Works currently for comps with 5 specs.
 * @param param0
 * @returns
 */
export const GET: RequestHandler = async ({ url }) => {
	const compEncoded = url.searchParams.get('comp');
	if (!compEncoded) {
		return new Response('Missing params', { status: 400 });
	}

	const comp = decodeComp(compEncoded).sort(sortByClassSpec);

	if (comp.length === 0) {
		return new Response('Could not read comp', { status: 404 });
	}

	const specsCount = comp.length;
	const gap = 5;
	const padding = 10;
	const imageSize = 56;
	const borderWidth = 4;

	const width =
		padding +
		imageSize * specsCount +
		gap * (specsCount - 1) +
		borderWidth * specsCount * 2 +
		padding;

	const height = imageSize + padding * 2;
	const canvas = createCanvas(width, height);
	const ctx = canvas.getContext('2d');

	let x = padding;
	const y = padding;

	const borderRadius = 6;
	for (const spec of comp) {
		try {
			const imgPath = `/icons/spec/${spec}.jpg`;
			const origin = url.origin || `https://${url.host}`;
			const imgUrl = `${origin}${imgPath}`;
			const img = await loadImage(imgUrl);
			ctx.drawImage(img, x, y, imageSize, imageSize);
			drawRoundedRect(
				ctx as unknown as CanvasRenderingContext2D,
				x - borderWidth / 2,
				y - borderWidth / 2,
				imageSize + borderWidth,
				imageSize + borderWidth,
				borderRadius,
				classDetails[specDetails[spec].class].color ?? '#fff',
				borderWidth
			);
			ctx.restore();

			x += imageSize + padding + borderWidth;
		} catch (e) {
			console.error(`Failed to load image for ${spec}:`, e);
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
