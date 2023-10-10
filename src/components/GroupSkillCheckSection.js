import React, {useState} from 'react';
import '../App.css';
import { SKILL_LIST, ATTRIBUTE_INDEX_MAP, EMPTY_CHARACTER } from '../consts';

export default function GroupSkillCheckSection({characterList, rollButtonClickHandler}) {

    /// Helpers - TODO: Make this reusable
    /// Update states
    let skillIndexMap = {};
    SKILL_LIST.map((skill, index) => {
        skillIndexMap[skill.name] = index
    })

    // TODO: Make this reusable
    function getTotalPoints(character, skillName) {
        let index = skillIndexMap[skillName];
        let attributeModifier = SKILL_LIST[index].attributeModifier;
        
        let skillPoints = character.skillLevels[index];
        let attributeIndex = ATTRIBUTE_INDEX_MAP[attributeModifier];

        let attrValue = character.attributes[attributeIndex];
        let modifierValue = Math.floor((attrValue - 10) / 2);

        const totalPoints = skillPoints + modifierValue;

        return totalPoints
    }

    function getBestCharacter(skillName) {
        let maxPoints = -1
        let bestCharacter = EMPTY_CHARACTER
        
        characterList.forEach(character => {
            let totalPoints = getTotalPoints(character, skillName)
            
            if (totalPoints > maxPoints) {
                maxPoints = totalPoints
                bestCharacter = character
            }
        });
        return bestCharacter;
    }
    /// states
    const [selectedSkill, setSeletedSkill] = useState("empty")
    const [dcValue, setDcValue] = useState(20)
    const [selectedCharacter, setSelectedCharacter] = useState(EMPTY_CHARACTER)

    function selectBestCharacter(skillName) {
        if (skillName === "empty") {
            setSelectedCharacter(EMPTY_CHARACTER)
        } else {
            setSelectedCharacter(getBestCharacter(skillName))
        }
    }

    /// consts
    let skillOptions = SKILL_LIST.map(skill => 
        (
            <option value={skill.name} key={skill.name}>
                {skill.name}
            </option>
        )
    )

    skillOptions = [ 
        (
            <option value="empty" key="empty">
                {`-----`}
            </option>
        ),
        ...skillOptions
    ]

    return (
        <div className="App-character_card-skill_check_section">
            <h1>Group Skill Check</h1>
            <h2>{
                selectedCharacter.id === null 
                ? `(Re)select an ability to begin`
                : `Character ${selectedCharacter.id} has the highest points in ${selectedSkill}: ${getTotalPoints(selectedCharacter, selectedSkill)
            }`}</h2>
            <div className="App-skill_check_actions">
                <div>
                    Skill:
                    <select className="App-character_skill_selector" onChange={e => {setSeletedSkill(e.target.value);selectBestCharacter(e.target.value);}}>
                        {skillOptions}
                    </select>
                </div>
                <div>
                    DC: 
                    <input 
                        className="App-skill_check_input" 
                        name="dcValueInput" 
                        type="number"
                        defaultValue={dcValue} 
                        onChange={e => setDcValue(e.target.value)}/>
                </div>
                <button onClick={() => {
                    if (selectedCharacter.id === null) {
                        alert("Please choose a skill for the Group Skill Selector")
                    } else {
                        rollButtonClickHandler(selectedCharacter.id, selectedSkill, dcValue)
                    }
                }}>Roll</button>
            </div>
        </div>
    )
};