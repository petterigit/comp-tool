import type { ClassSpecDict, Role } from './types';

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
export const rolesTotal = Object.values(roles).reduce((acc, role) => acc + role, 0);
