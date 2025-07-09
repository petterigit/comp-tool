export type Class =
	| 'deathknight'
	| 'demonhunter'
	| 'druid'
	| 'evoker'
	| 'hunter'
	| 'mage'
	| 'monk'
	| 'paladin'
	| 'priest'
	| 'rogue'
	| 'shaman'
	| 'warlock'
	| 'warrior';

export type Spec =
	| 'feral'
	| 'guardian'
	| 'balance'
	| 'restoration'
	| 'blood'
	| 'frost'
	| 'unholy'
	| 'havoc'
	| 'vengeance'
	| 'devastation'
	| 'preservation'
	| 'augmentation'
	| 'beastmastery'
	| 'marksmanship'
	| 'survival'
	| 'arcane'
	| 'fire'
	| 'frost'
	| 'brewmaster'
	| 'mistweaver'
	| 'windwalker'
	| 'protection'
	| 'retribution'
	| 'discipline'
	| 'holy'
	| 'shadow'
	| 'assassination'
	| 'outlaw'
	| 'subtlety'
	| 'elemental'
	| 'enhancement'
	| 'affliction'
	| 'demonology'
	| 'destruction'
	| 'arms'
	| 'fury';

export type Role = 'tank' | 'healer' | 'dps';

export type ClassSpecDict = {
	[key in Class]: Spec[];
};

export type ClassSpec = [Class, Spec];
export type ClassSpecRole = [Class, Spec, Role];
