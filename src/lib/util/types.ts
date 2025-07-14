export enum Class {
	deathknight = 'deathknight',
	demonhunter = 'demonhunter',
	druid = 'druid',
	evoker = 'evoker',
	hunter = 'hunter',
	mage = 'mage',
	monk = 'monk',
	paladin = 'paladin',
	priest = 'priest',
	rogue = 'rogue',
	shaman = 'shaman',
	warlock = 'warlock',
	warrior = 'warrior'
}

export enum Spec {
	druid_feral = 'druid_feral',
	druid_guardian = 'druid_guardian',
	druid_balance = 'druid_balance',
	druid_restoration = 'druid_restoration',
	deathknight_blood = 'deathknight_blood',
	deathknight_frost = 'deathknight_frost',
	deathknight_unholy = 'deathknight_unholy',
	demonhunter_havoc = 'demonhunter_havoc',
	demonhunter_vengeance = 'demonhunter_vengeance',
	evoker_devastation = 'evoker_devastation',
	evoker_preservation = 'evoker_preservation',
	evoker_augmentation = 'evoker_augmentation',
	hunter_beastmastery = 'hunter_beastmastery',
	hunter_marksmanship = 'hunter_marksmanship',
	hunter_survival = 'hunter_survival',
	mage_arcane = 'mage_arcane',
	mage_fire = 'mage_fire',
	mage_frost = 'mage_frost',
	monk_brewmaster = 'monk_brewmaster',
	monk_mistweaver = 'monk_mistweaver',
	monk_windwalker = 'monk_windwalker',
	paladin_holy = 'paladin_holy',
	paladin_protection = 'paladin_protection',
	paladin_retribution = 'paladin_retribution',
	priest_discipline = 'priest_discipline',
	priest_holy = 'priest_holy',
	priest_shadow = 'priest_shadow',
	rogue_assassination = 'rogue_assassination',
	rogue_outlaw = 'rogue_outlaw',
	rogue_subtlety = 'rogue_subtlety',
	shaman_elemental = 'shaman_elemental',
	shaman_enhancement = 'shaman_enhancement',
	shaman_restoration = 'shaman_restoration',
	warlock_affliction = 'warlock_affliction',
	warlock_demonology = 'warlock_demonology',
	warlock_destruction = 'warlock_destruction',
	warrior_arms = 'warrior_arms',
	warrior_fury = 'warrior_fury',
	warrior_protection = 'warrior_protection'
}

export enum Role {
	'tank',
	'healer',
	'dps'
}

export type ClassSpecDict = {
	[key in Class]: Spec[];
};

export interface ClassDetails {
	color: string;
	specs: Spec[];
}

export interface SpecDetails {
	role: Role;
	class: Class;
}

export type Comp = Spec[];
