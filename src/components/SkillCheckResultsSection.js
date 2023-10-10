import React from 'react';
import '../App.css';
import dice_logo from '../dice.png';

export default function SkillCheckResultsSection({skillCheckResultsItem}) {

    let skillSectionPanel = (
        <div>
            <h2>Character: {skillCheckResultsItem.characterId}</h2>
            <h3>Skill: {skillCheckResultsItem.skill === null ? null : `${skillCheckResultsItem.skill}: ${skillCheckResultsItem.skillValue}`}</h3>
            <h3>You Rolled: {skillCheckResultsItem.rolledResult}</h3>
            <h3>The DC was: {skillCheckResultsItem.dcValue}</h3>
            <h3>Result: {skillCheckResultsItem.finalResult}</h3>
        </div>
    );


    return (
        <section className="App-skill_check_section">
            <img src={dice_logo}/>
            <h1>Skill Check Results</h1>
            {skillSectionPanel}
        </section>
    )
}