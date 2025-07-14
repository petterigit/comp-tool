import { roleOrder, specDetails } from '$lib/util/data';
import type { Spec } from './types';

export const sortByRoleClassSpec = (a: Spec, b: Spec) => {
	const detailsA = specDetails[a];
	const detailsB = specDetails[b];

	// Role
	const roleDiff = roleOrder[detailsA.role] - roleOrder[detailsB.role];
	if (roleDiff !== 0) return roleDiff;

	// Class name
	if (detailsA.class < detailsB.class) return -1;
	if (detailsA.class > detailsB.class) return 1;

	// Spec name
	if (a < b) return -1;
	if (a > b) return 1;
	return 0;
};

export const sortByClassSpec = (a: Spec, b: Spec) => {
	const detailsA = specDetails[a];
	const detailsB = specDetails[b];

	// Class
	if (detailsA.class < detailsB.class) return -1;
	if (detailsA.class > detailsB.class) return 1;

	// Spec
	if (a < b) return -1;
	if (a > b) return 1;

	return 0;
};
