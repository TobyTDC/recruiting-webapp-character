import React, {useState} from 'react';
import '../../App.css';
import SkillCheckSection from './SkillCheckSection';
import AttributesSection from './AttributesSection';
import ClassesSection from './ClassesSection';
import ClassRequirementsSection from './ClassRequirementsSection';
import { CLASS_KEYS } from "../../consts";
import SkillsSection from './SkillsSection';

function OptionalClassRequirementsSection({className, closeClassRequirementsSection}) {
    if (!(CLASS_KEYS.includes(className))) {
        return null;
    }

    return <ClassRequirementsSection className={className} closeHandler={closeClassRequirementsSection}/>
}

export default function CharacterCard({
    character, 
    skillCheckResultsItem, 
    rollButtonClickHandler, 
    attributeButtonClickHandler, 
    skillButtonClickHandler
}) {
    /// states
    const [selectedClass, setSelectedClass] = useState("");


    /// functions
    function classSelectHandler(className) {
        setSelectedClass(className);
    };

    function closeClassRequirementsSection() {
        setSelectedClass("")
    }

    return (
        <div className="App-character_card">
            <h1>{`Character: ${character.id}`}</h1>
            <SkillCheckSection characterId={character.id} rollButtonClickHandler={rollButtonClickHandler}/>
            <div className="App-character_values_panel">
                <AttributesSection character={character} attributeButtonClickHandler={attributeButtonClickHandler}/>
                <ClassesSection attributes={character.attributes} classSelectHandler={classSelectHandler}/>
                <OptionalClassRequirementsSection className={selectedClass} closeClassRequirementsSection={closeClassRequirementsSection}/>
                <SkillsSection character={character} skillButtonClickHandler={skillButtonClickHandler}/>
            </div>
        </div>
    )
};