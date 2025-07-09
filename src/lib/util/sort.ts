import { roleOrder } from '$lib/util/data';
import type { ClassSpec, ClassSpecRole } from './types';

export const sortByRoleClassSpec = (a: ClassSpecRole, b: ClassSpecRole) => {
	// Sort by role
	const roleDiff = roleOrder[a[2]] - roleOrder[b[2]];
	if (roleDiff !== 0) return roleDiff;
	// Then by class
	if (a[0] < b[0]) return -1;
	if (a[0] > b[0]) return 1;
	// Then by spec
	if (a[1] < b[1]) return -1;
	if (a[1] > b[1]) return 1;
	return 0;
};

export const sortByClassSpec = (a: ClassSpec, b: ClassSpec) => {
	// Sort by class
	if (a[0] < b[0]) return -1;
	if (a[0] > b[0]) return 1;
	// Sort by role
	if (a[1] < b[1]) return -1;
	if (a[1] > b[1]) return 1;
	return 0;
};
