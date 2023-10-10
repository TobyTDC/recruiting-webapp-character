import React, {useState} from 'react';
import '../../App.css';
import { SKILL_LIST } from '../../consts';

export default function SkillCheckSection({characterId, rollButtonClickHandler}) {

    /// states
    const [selectedSkill, setSeletedSkill] = useState(SKILL_LIST[0]) // Default the selected skill to the first one
    const [dcValue, setDcValue] = useState(20)

    /// consts
    const skillOptions = SKILL_LIST.map(skill => 
        (
            <option value={skill.name} key={skill.name}>
                {skill.name}
            </option>
        )
    )

    return (
        <div className="App-character_card-skill_check_section">
            <h1>Skill Check</h1>
            <div className="App-skill_check_actions">
                <div>
                    Skill:
                    <select className="App-character_skill_selector" onChange={e => {setSeletedSkill(e.target.value);}}>
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
                <button onClick={() => rollButtonClickHandler(characterId, selectedSkill, dcValue)}>Roll</button>
            </div>
        </div>
    )
};