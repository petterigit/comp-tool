import { specDetails } from './data';
import { DamageType, Spec } from './types';

export const filterDamageTypePhysical = (spec: Spec) =>
	specDetails[spec].damageType === DamageType.physical;
export const filterDamageTypeMagic = (spec: Spec) =>
	specDetails[spec].damageType === DamageType.magic;
export const filterDamageTypeHybrid = (spec: Spec) =>
	specDetails[spec].damageType === DamageType.hybrid;
