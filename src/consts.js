export const ATTRIBUTE_LIST = [
    'Strength',
    'Dexterity',
    'Constitution',
    'Intelligence',
    'Wisdom',
    'Charisma',
];

export const ATTRIBUTE_INDEX_MAP = {
    'Strength': 0,
    'Dexterity': 1,
    'Constitution': 2,
    'Intelligence': 3,
    'Wisdom': 4,
    'Charisma': 5,
};

export const CLASS_LIST = {
    'Barbarian': {
        'Strength': 14,
        'Dexterity': 9,
        'Constitution': 9,
        'Intelligence': 9,
        'Wisdom': 9,
        'Charisma': 9,
    },
    'Wizard': {
        'Strength': 9,
        'Dexterity': 9,
        'Constitution': 9,
        'Intelligence': 14,
        'Wisdom': 9,
        'Charisma': 9,
    },
    'Bard': {
        'Strength': 9,
        'Dexterity': 9,
        'Constitution': 9,
        'Intelligence': 9,
        'Wisdom': 9,
        'Charisma': 14,
    },
}

export const CLASS_KEYS = ['Barbarian', 'Wizard', 'Bard']

export const SKILL_LIST = [
    { name: 'Acrobatics', attributeModifier: 'Dexterity' },
    { name: 'Animal Handling', attributeModifier: 'Wisdom' },
    { name: 'Arcana', attributeModifier: 'Intelligence' },
    { name: 'Athletics', attributeModifier: 'Strength' },
    { name: 'Deception', attributeModifier: 'Charisma' },
    { name: 'History', attributeModifier: 'Intelligence' },
    { name: 'Insight', attributeModifier: 'Wisdom' },
    { name: 'Intimidation', attributeModifier: 'Charisma' },
    { name: 'Investigation', attributeModifier: 'Intelligence' },
    { name: 'Medicine', attributeModifier: 'Wisdom' },
    { name: 'Nature', attributeModifier: 'Intelligence' },
    { name: 'Perception', attributeModifier: 'Wisdom' },
    { name: 'Performance', attributeModifier: 'Charisma' },
    { name: 'Persuasion', attributeModifier: 'Charisma' },
    { name: 'Religion', attributeModifier: 'Intelligence' },
    { name: 'Sleight of Hand', attributeModifier: 'Dexterity' },
    { name: 'Stealth', attributeModifier: 'Dexterity' },
    { name: 'Survival', attributeModifier: 'Wisdom' },

]

export const ACTION_BUTTONS_LIST = [
    { title: "Add New Character", key: "add_new_character"},
    { title: "Reset All Characters", key: "reset_all" },
    { title: "Save All Characters", key: "save_all" },
]

export const MAXIMUM_ATTRIBUTE_VALUE = 70

export const EMPTY_SKILL_CHECK_RESULTS_ITEM = {
    characterId: null,
    skill: null,
    rolledResult: null,
    dcValue: null,
    skillValue: null,
    finalResult: null,
}

export const EMPTY_CHARACTER = { // Lazy implmentation
    id: null,
    attributes: [10, 10, 10, 10, 10, 10], // TODO: Optimize this with dictionary
    skillLevels: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // TODO: Optimize this with dictionary
}