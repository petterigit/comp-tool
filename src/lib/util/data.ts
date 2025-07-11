import type { Class, ClassSpecDict, Comp, Role } from './types';

export const classes: ClassSpecDict = {
	deathknight: ['blood', 'frost', 'unholy'],
	demonhunter: ['havoc', 'vengeance'],
	druid: ['feral', 'guardian', 'balance', 'restoration'],
	evoker: ['devastation', 'preservation', 'augmentation'],
	hunter: ['beastmastery', 'marksmanship', 'survival'],
	mage: ['arcane', 'fire', 'frost'],
	monk: ['brewmaster', 'mistweaver', 'windwalker'],
	paladin: ['holy', 'protection', 'retribution'],
	priest: ['discipline', 'holy', 'shadow'],
	rogue: ['assassination', 'outlaw', 'subtlety'],
	shaman: ['elemental', 'enhancement', 'restoration'],
	warlock: ['affliction', 'demonology', 'destruction'],
	warrior: ['arms', 'fury', 'protection']
};

export const tanks: ClassSpecDict = {
	deathknight: ['blood'],
	demonhunter: ['vengeance'],
	druid: ['guardian'],
	evoker: [],
	hunter: [],
	mage: [],
	monk: ['brewmaster'],
	paladin: ['protection'],
	priest: [],
	rogue: [],
	shaman: [],
	warlock: [],
	warrior: ['protection']
};

export const healers: ClassSpecDict = {
	deathknight: [],
	demonhunter: [],
	druid: ['restoration'],
	evoker: ['preservation'],
	hunter: [],
	mage: [],
	monk: ['mistweaver'],
	paladin: ['holy'],
	priest: ['discipline', 'holy'],
	rogue: [],
	shaman: ['restoration'],
	warlock: [],
	warrior: []
};

export const dps: ClassSpecDict = {
	deathknight: ['frost', 'unholy'],
	demonhunter: ['havoc'],
	druid: ['feral', 'balance'],
	evoker: ['devastation', 'augmentation'],
	hunter: ['beastmastery', 'marksmanship', 'survival'],
	mage: ['arcane', 'fire', 'frost'],
	monk: ['windwalker'],
	paladin: ['retribution'],
	priest: ['shadow'],
	rogue: ['assassination', 'outlaw', 'subtlety'],
	shaman: ['elemental', 'enhancement'],
	warlock: ['affliction', 'demonology', 'destruction'],
	warrior: ['arms', 'fury']
};

export const roleOrder: Record<Role, number> = { tank: 0, healer: 1, dps: 2 };

export const roles = {
	tank: 1,
	healer: 1,
	dps: 3
};
export const compTotalCharacters = Object.values(roles).reduce((acc, role) => acc + role, 0);

export const isCompFull = (comp: Comp) => {
	return comp.length >= compTotalCharacters;
};

export const compToRoles = (comp: Comp) => {
	return {
		tank: comp.filter((spec) => tanks[spec[0]].includes(spec[1])),
		healer: comp.filter((spec) => healers[spec[0]].includes(spec[1])),
		dps: comp.filter((spec) => dps[spec[0]].includes(spec[1]))
	};
};

export const compToMeleeRangedHealer = (comp: Comp) => {
	return {
		melee: comp.filter((spec) =>
			['deathknight', 'demonhunter', 'druid', 'monk', 'paladin', 'rogue', 'warrior'].includes(
				spec[0]
			)
		),
		ranged: comp.filter((spec) =>
			['hunter', 'mage', 'priest', 'shaman', 'warlock'].includes(spec[0])
		),
		healer: comp.filter((spec) =>
			['evoker', 'druid', 'monk', 'paladin', 'priest', 'shaman'].includes(spec[0])
		)
	};
};

export const compToPhysicalMagicHybrid = (comp: Comp) => {
	return {
		physical: comp.filter((spec) =>
			[
				'deathknight',
				'demonhunter',
				'druid',
				'hunter',
				'monk',
				'paladin',
				'rogue',
				'warrior'
			].includes(spec[0])
		),
		magic: comp.filter((spec) => ['mage', 'priest', 'warlock', 'evoker'].includes(spec[0])),
		hybrid: comp.filter((spec) => ['shaman'].includes(spec[0]))
	};
};

export function encodeComp(comp: Comp): string {
	const classList = Object.keys(classes);
	const bytes = [];
	let bitfield = 0;
	let bits = 0;
	for (const [className, spec] of comp) {
		const specs = classes[className];
		bitfield = (bitfield << 4) | classList.indexOf(className);
		bits += 4;
		bitfield = (bitfield << 6) | specs.indexOf(spec);
		bits += 6;
		while (bits >= 8) {
			bytes.push((bitfield >> (bits - 8)) & 0xff);
			bits -= 8;
		}
	}
	if (bits > 0) bytes.push((bitfield << (8 - bits)) & 0xff);
	return btoa(String.fromCharCode(...bytes));
}

export function decodeComp(str: string): Comp {
	const classList = Object.keys(classes);
	const bytes = Uint8Array.from(atob(str), (c) => c.charCodeAt(0));
	let bitfield = 0;
	let bits = 0;
	const comp: Comp = [];
	for (const byte of bytes) {
		bitfield = (bitfield << 8) | byte;
		bits += 8;
		while (bits >= 10 && comp.length < 5) {
			bits -= 10;
			const val = (bitfield >> bits) & 0x3ff;
			const classIndex = val >> 6;
			const specIndex = val & 0x3f;
			const className = classList[classIndex] as Class;
			const specName = classes[className][specIndex];
			comp.push([className, specName]);
		}
	}
	return comp;
}
