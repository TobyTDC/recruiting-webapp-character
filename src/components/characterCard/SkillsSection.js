import React from 'react';
import '../../App.css';
import { SKILL_LIST, ATTRIBUTE_INDEX_MAP } from '../../consts';

export default function SkillsSection({character, skillButtonClickHandler}) {

    // consts
    const skills = SKILL_LIST.map((skill, index) => {
        
        // TODO: Make this reusable
        let skillPoints = character.skillLevels[index]
        let attributeIndex = ATTRIBUTE_INDEX_MAP[skill.attributeModifier]

        let attrValue = character.attributes[attributeIndex]
        let modifierValue = Math.floor((attrValue - 10) / 2)
        

        return(
            <div className='App-skill_line' key={skill.name}>
                <div>{`${skill.name}: ${skillPoints}(Modifier: ${skill.attributeModifier}): ${modifierValue}`}</div>
                <button onClick={() => skillButtonClickHandler(character.id, index, 1)}>+</button>
                <button onClick={() => skillButtonClickHandler(character.id, index, -1)}>-</button>
                <div>{`total: ${skillPoints + modifierValue}`}</div>
            </div>
        )
    })

    const totalSkillPointsSpent = character.skillLevels.reduce((partialSum, a) => partialSum + a, 0)
    const intelligenceModifier = Math.floor((character.attributes[ATTRIBUTE_INDEX_MAP["Intelligence"]] - 10) / 2)
    const availableSkillPoints = 10 + 4 * intelligenceModifier - totalSkillPointsSpent

    return (
        <div className="App-skills_section">
            <h1>Skills</h1>
            <p className="App-skills_section-total_points_str">{`Total skill points avilable: ${availableSkillPoints}`}</p>
            <div>
                {skills}
            </div>
        </div>
    )
}