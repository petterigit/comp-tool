import { rolesTotal } from './data';
import type { Comp } from './types';

export const COMPS_STORAGE_KEY = 'comps-tool-comps';

export function filterNonEmptyComps(comps: Comp[]) {
	return comps.filter((comp) => comp.tank.length + comp.healer.length + comp.dps.length > 0);
}

export function shouldAddEmptyComp(comps: Comp[], rolesTotal: number) {
	if (comps.length === 0) return true;
	const last = comps[comps.length - 1];
	const lastCount = last.tank.length + last.healer.length + last.dps.length;
	const lastCompIsFull = lastCount === rolesTotal;
	return lastCompIsFull;
}

export function exportCompsToFile(comps: Comp[]) {
	const nonEmptyComps = filterNonEmptyComps(comps);
	const dataStr = JSON.stringify(nonEmptyComps, null, 2);
	const blob = new Blob([dataStr], { type: 'application/json' });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = 'comps.json';
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
}

export function importCompsFromFile(event: Event, compInit: Comp) {
	return new Promise<Comp[] | null>((resolve) => {
		const input = event.target as HTMLInputElement;
		if (!input.files || input.files.length === 0) return resolve(null);
		const file = input.files[0];
		const reader = new FileReader();
		reader.onload = (e) => {
			try {
				const imported = JSON.parse(e.target?.result as string);
				if (Array.isArray(imported)) {
					let newComps = imported;
					if (shouldAddEmptyComp(newComps, rolesTotal)) {
						newComps = [...newComps, { ...compInit }];
					}
					resolve(newComps);
					return;
				}
			} catch {
				// ignore
			}
			resolve(null);
		};
		reader.readAsText(file);
	});
}

export function saveCompsToStorage(comps: Comp[]) {
	localStorage.setItem(COMPS_STORAGE_KEY, JSON.stringify(comps));
}

export function loadCompsFromStorage(): Comp[] | null {
	const raw = localStorage.getItem(COMPS_STORAGE_KEY);
	if (!raw) return null;
	const parsed = JSON.parse(raw);
	if (Array.isArray(parsed)) return parsed;
	return null;
}
