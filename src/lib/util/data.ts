import {
	Class,
	Spec,
	Role,
	type Comp,
	type ClassDetails,
	type SpecDetails,
	DamageType
} from './types';

// Create Spec <-> index mappings for encoding/decoding
const specList = Object.values(Spec);
const specToIndex = new Map<string, number>(specList.map((spec, i) => [spec, i]));
const indexToSpec = new Map<number, Spec>(specList.map((spec, i) => [i, spec]));

export const roleOrder = { [Role.tank]: 0, [Role.healer]: 1, [Role.dps]: 2 };

export const roleAmountsInComp = {
	[Role.tank]: 1,
	[Role.healer]: 1,
	[Role.dps]: 3
};
export const compTotalCharacters = Object.values(roleAmountsInComp).reduce(
	(acc, role) => acc + role,
	0
);

export const isCompFull = (comp: Comp) => {
	return comp.length >= compTotalCharacters;
};

export function encodeComp(comp: Comp): string {
	let bitfield = 0;
	let bits = 0;
	const bytes: number[] = [];
	for (const spec of comp) {
		const idx = specToIndex.get(spec);
		if (idx === undefined) throw new Error(`Unknown spec: ${spec}`);
		bitfield = (bitfield << 10) | idx;
		bits += 10;
		while (bits >= 8) {
			bits -= 8;
			bytes.push((bitfield >> bits) & 0xff);
		}
	}
	if (bits > 0) {
		bytes.push((bitfield << (8 - bits)) & 0xff);
	}
	const base64 = btoa(String.fromCharCode(...bytes))
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=+$/, '');
	return base64;
}

export function decodeComp(str: string): Comp {
	let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
	while (base64.length % 4) base64 += '=';
	const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
	let bitfield = 0;
	let bits = 0;
	const comp: Comp = [];
	for (const byte of bytes) {
		bitfield = (bitfield << 8) | byte;
		bits += 8;
		while (bits >= 10) {
			bits -= 10;
			const idx = (bitfield >> bits) & 0x3ff;
			const spec = indexToSpec.get(idx);
			if (!spec) throw new Error(`Unknown spec index: ${idx}`);
			comp.push(spec);
		}
	}
	return comp;
}

export const compToRoles = (comp: Comp) => {
	return {
		[Role.tank]: comp.filter((spec) => specDetails[spec].role === Role.tank),
		[Role.healer]: comp.filter((spec) => specDetails[spec].role === Role.healer),
		[Role.dps]: comp.filter((spec) => specDetails[spec].role === Role.dps)
	};
};

export const classDetails: { [key in Class]: ClassDetails } = {
	[Class.deathknight]: {
		color: '#c41e3a',
		specs: [Spec.deathknight_blood, Spec.deathknight_frost, Spec.deathknight_unholy]
	},
	[Class.demonhunter]: {
		color: '#a330c9',
		specs: [Spec.demonhunter_havoc, Spec.demonhunter_vengeance]
	},
	[Class.druid]: {
		color: '#ff7d0a',
		specs: [Spec.druid_balance, Spec.druid_feral, Spec.druid_guardian, Spec.druid_restoration]
	},
	[Class.evoker]: {
		color: '#33937f',
		specs: [Spec.evoker_devastation, Spec.evoker_preservation, Spec.evoker_augmentation]
	},
	[Class.hunter]: {
		color: '#aad372',
		specs: [Spec.hunter_beastmastery, Spec.hunter_marksmanship, Spec.hunter_survival]
	},
	[Class.mage]: {
		color: '#3fc7eb',
		specs: [Spec.mage_arcane, Spec.mage_fire, Spec.mage_frost]
	},
	[Class.monk]: {
		color: '#00ff98',
		specs: [Spec.monk_brewmaster, Spec.monk_mistweaver, Spec.monk_windwalker]
	},
	[Class.paladin]: {
		color: '#f48cba',
		specs: [Spec.paladin_holy, Spec.paladin_protection, Spec.paladin_retribution]
	},
	[Class.priest]: {
		color: '#ffffff',
		specs: [Spec.priest_discipline, Spec.priest_holy, Spec.priest_shadow]
	},
	[Class.rogue]: {
		color: '#fff468',
		specs: [Spec.rogue_assassination, Spec.rogue_outlaw, Spec.rogue_subtlety]
	},
	[Class.shaman]: {
		color: '#0070dd',
		specs: [Spec.shaman_elemental, Spec.shaman_enhancement, Spec.shaman_restoration]
	},
	[Class.warlock]: {
		color: '#8788ee',
		specs: [Spec.warlock_affliction, Spec.warlock_demonology, Spec.warlock_destruction]
	},
	[Class.warrior]: {
		color: '#c69b6d',
		specs: [Spec.warrior_arms, Spec.warrior_fury, Spec.warrior_protection]
	}
};

export const specDetails: { [key in Spec]: SpecDetails } = {
	[Spec.druid_feral]: {
		role: Role.dps,
		class: Class.druid,
		damageType: DamageType.physical
	},
	[Spec.druid_guardian]: {
		role: Role.tank,
		class: Class.druid,
		damageType: DamageType.physical
	},
	[Spec.druid_balance]: {
		role: Role.dps,
		class: Class.druid,
		damageType: DamageType.magic
	},
	[Spec.druid_restoration]: {
		role: Role.healer,
		class: Class.druid,
		damageType: DamageType.physical
	},
	[Spec.deathknight_blood]: {
		role: Role.tank,
		class: Class.deathknight,
		damageType: DamageType.physical
	},
	[Spec.deathknight_frost]: {
		role: Role.dps,
		class: Class.deathknight,
		damageType: DamageType.magic
	},
	[Spec.deathknight_unholy]: {
		role: Role.dps,
		class: Class.deathknight,
		damageType: DamageType.hybrid
	},
	[Spec.demonhunter_havoc]: {
		role: Role.dps,
		class: Class.demonhunter,
		damageType: DamageType.magic
	},
	[Spec.demonhunter_vengeance]: {
		role: Role.tank,
		class: Class.demonhunter,
		damageType: DamageType.magic
	},
	[Spec.evoker_devastation]: {
		role: Role.dps,
		class: Class.evoker,
		damageType: DamageType.magic
	},
	[Spec.evoker_preservation]: {
		role: Role.healer,
		class: Class.evoker,
		damageType: DamageType.magic
	},
	[Spec.evoker_augmentation]: {
		role: Role.dps,
		class: Class.evoker,
		damageType: DamageType.magic
	},
	[Spec.hunter_beastmastery]: {
		role: Role.dps,
		class: Class.hunter,
		damageType: DamageType.physical
	},
	[Spec.hunter_marksmanship]: {
		role: Role.dps,
		class: Class.hunter,
		damageType: DamageType.physical
	},
	[Spec.hunter_survival]: {
		role: Role.dps,
		class: Class.hunter,
		damageType: DamageType.hybrid
	},
	[Spec.mage_arcane]: {
		role: Role.dps,
		class: Class.mage,
		damageType: DamageType.magic
	},
	[Spec.mage_fire]: {
		role: Role.dps,
		class: Class.mage,
		damageType: DamageType.magic
	},
	[Spec.mage_frost]: {
		role: Role.dps,
		class: Class.mage,
		damageType: DamageType.magic
	},
	[Spec.monk_brewmaster]: {
		role: Role.tank,
		class: Class.monk,
		damageType: DamageType.physical
	},
	[Spec.monk_mistweaver]: {
		role: Role.healer,
		class: Class.monk,
		damageType: DamageType.physical
	},
	[Spec.monk_windwalker]: {
		role: Role.dps,
		class: Class.monk,
		damageType: DamageType.hybrid
	},
	[Spec.paladin_holy]: {
		role: Role.healer,
		class: Class.paladin,
		damageType: DamageType.magic
	},
	[Spec.paladin_protection]: {
		role: Role.tank,
		class: Class.paladin,
		damageType: DamageType.magic
	},
	[Spec.paladin_retribution]: {
		role: Role.dps,
		class: Class.paladin,
		damageType: DamageType.hybrid
	},
	[Spec.priest_discipline]: {
		role: Role.healer,
		class: Class.priest,
		damageType: DamageType.magic
	},
	[Spec.priest_holy]: {
		role: Role.healer,
		class: Class.priest,
		damageType: DamageType.magic
	},
	[Spec.priest_shadow]: {
		role: Role.dps,
		class: Class.priest,
		damageType: DamageType.magic
	},
	[Spec.rogue_assassination]: {
		role: Role.dps,
		class: Class.rogue,
		damageType: DamageType.hybrid
	},
	[Spec.rogue_outlaw]: {
		role: Role.dps,
		class: Class.rogue,
		damageType: DamageType.magic
	},
	[Spec.rogue_subtlety]: {
		role: Role.dps,
		class: Class.rogue,
		damageType: DamageType.magic
	},
	[Spec.shaman_elemental]: {
		role: Role.dps,
		class: Class.shaman,
		damageType: DamageType.magic
	},
	[Spec.shaman_enhancement]: {
		role: Role.dps,
		class: Class.shaman,
		damageType: DamageType.magic
	},
	[Spec.shaman_restoration]: {
		role: Role.healer,
		class: Class.shaman,
		damageType: DamageType.magic
	},
	[Spec.warlock_affliction]: {
		role: Role.dps,
		class: Class.warlock,
		damageType: DamageType.magic
	},
	[Spec.warlock_demonology]: {
		role: Role.dps,
		class: Class.warlock,
		damageType: DamageType.magic
	},
	[Spec.warlock_destruction]: {
		role: Role.dps,
		class: Class.warlock,
		damageType: DamageType.magic
	},
	[Spec.warrior_arms]: {
		role: Role.dps,
		class: Class.warrior,
		damageType: DamageType.physical
	},
	[Spec.warrior_fury]: {
		role: Role.dps,
		class: Class.warrior,
		damageType: DamageType.physical
	},
	[Spec.warrior_protection]: {
		role: Role.tank,
		class: Class.warrior,
		damageType: DamageType.physical
	}
};
