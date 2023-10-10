import React, {useEffect, useState} from "react";
import '../App.css';
import TopActionButtonsSection from "./TopActionButtonsSection";
import SkillCheckResultsSection from "./SkillCheckResultsSection";
import CharacterCard from "./characterCard/CharacterCard";
import { 
    EMPTY_SKILL_CHECK_RESULTS_ITEM,
    MAXIMUM_ATTRIBUTE_VALUE,
    ATTRIBUTE_INDEX_MAP,
    SKILL_LIST,
    URL,
} from "../consts";
import axios from "axios";

export default function MainSection() {

    /// States

    // For now the index could be the id for each character in the list
    const [characterList, setCharacterList] = useState([]);
    const [skillCheckResultsItem, setSkillCheckResultsItem] = useState(EMPTY_SKILL_CHECK_RESULTS_ITEM);

    /// Fetch Characters
    async function fetchAllCharacters() {
        axios.defaults.headers.common['Accept'] = 'application/json'; // Set headers to 'application/json'
        try {
            await axios.get(URL).then(function (response) {
                let newCharacters = []
                if (response.status == 200) {
                    newCharacters = response.data.body["characterList"]
                } else {
                    alert(`No characters fetched: ${response.status}`)
                }
                setCharacterList(newCharacters)
                console.log(response)
            })
        } catch {
            alert('Error saving all characters')
        }
    }

    useEffect(() => {fetchAllCharacters()}, [])
    
    /// Top Actions
    function addNewCharacter() {
        let newCharacter = { // Lazy implmentation
            id: characterList.length + 1, // id == index - 1
            attributes: [10, 10, 10, 10, 10, 10], // TODO: Optimize this with dictionary
            skillLevels: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // TODO: Optimize this with dictionary
        };
        setCharacterList([...characterList, newCharacter]);
    }

    function removeAllCharacters() {
        setCharacterList([])
    }

    async function saveAllCharacters() {
        axios.defaults.headers.common['Accept'] = 'application/json'; // Set headers to 'application/json'
        try {
            await axios.post(URL, {characterList}).then(function (response) {
                alert('All characters saved')
                console.log(response)
            })
        } catch {
            alert('Error saving all characters')
        }
    }

    function handleActionButtonClick(actionType) {
        switch (actionType) { // TODO: Use const for keys
            case "add_new_character":
                addNewCharacter()
                break;
            case "reset_all":
                removeAllCharacters()
                break;
            case "save_all":
                saveAllCharacters()
                break;
            default:
                break;
        }

    }

    /// Characters

    // A helper var
    let skillIndexMap = {};

    SKILL_LIST.map((skill, index) => {
        skillIndexMap[skill.name] = index
    })

    function rollButtonClickHandler(characterId, skillName, dcValue) {
        // TODO: Make this reusable
        let character = characterList[characterId - 1]; // index == id - 1
        let index = skillIndexMap[skillName];
        let attributeModifier = SKILL_LIST[index].attributeModifier;
        
        let skillPoints = character.skillLevels[index];
        let attributeIndex = ATTRIBUTE_INDEX_MAP[attributeModifier];

        let attrValue = character.attributes[attributeIndex];
        let modifierValue = Math.floor((attrValue - 10) / 2);

        const totalPoints = skillPoints + modifierValue;

        let diceValue = Math.floor(Math.random() * 20) + 1; // produces values between 1 - 20

        let finalResult;
        if (totalPoints + diceValue >= dcValue) {
            if (diceValue == 20) {
                finalResult = "CRITICAL SUCCESS";
            } else {
                finalResult = "SUCCESS";
            }
        } else if (diceValue == 1) {
            finalResult = "CRITICAL FAILURE";
        } else {
            finalResult = "FAILURE";
        }

        let newSkillCheckResultsItem = {
            characterId: characterId,
            skill: skillName,
            rolledResult: diceValue,
            dcValue: dcValue,
            skillValue: totalPoints,
            finalResult: finalResult,
        };

        setSkillCheckResultsItem(newSkillCheckResultsItem);
    };

    function attributeButtonClickHandler(characterId, attrIndex, increment) {
        let shouldAbort = false;
        let newCharacters = characterList.map(character =>
            {
                let newCharacter = character
                if (character.id === characterId) {
                    let newAttributes = character.attributes.slice();
                    let attrSum = newAttributes.reduce((partialSum, a) => partialSum + a, 0);

                    if (newAttributes[attrIndex] + increment < 0) {
                        alert("Attribute value cannot be negative");
                        shouldAbort = true;
                    }
                    
                    if (attrSum + increment > MAXIMUM_ATTRIBUTE_VALUE && increment > 0) {
                        alert(`Total attribute value cannot be more than ${MAXIMUM_ATTRIBUTE_VALUE}`);
                        shouldAbort = true;
                    }

                    newAttributes[attrIndex] += increment;

                    // Check for skill points
                    let totalSkillPointsSpent = character.skillLevels.reduce((partialSum, a) => partialSum + a, 0)
                    let intelligenceModifier = Math.floor((character.attributes[ATTRIBUTE_INDEX_MAP["Intelligence"]] - 10) / 2)
                    let availableSkillPoints = 10 + 4 * intelligenceModifier - totalSkillPointsSpent
                    if (availableSkillPoints < 0) {
                        alert(`Cannot decrease Intelligence anymore, insufficient available skill points`);
                        shouldAbort = true;
                    }

                    if (!shouldAbort) {
                        newCharacter.attributes = newAttributes;
                    }
                }
                return newCharacter;
            }
        )
        setCharacterList(newCharacters);
    }

    function skillButtonClickHandler(characterId, skillIndex, increment) {
        let shouldAbort = false;
        let newCharacters = characterList.map(character => {
            let newCharacter = character;
            if (character.id === characterId) {
                let newSkillLevels = character.skillLevels.slice();
                let totalSkillPointsSpent = newSkillLevels.reduce((partialSum, a) => partialSum + a, 0);
                let intelligenceModifier = Math.floor((character.attributes[ATTRIBUTE_INDEX_MAP["Intelligence"]] - 10) / 2);
                let availableSkillPoints = 10 + 4 * intelligenceModifier - totalSkillPointsSpent;

                if (availableSkillPoints + increment < 0) {
                    alert("No available skill points left");
                    shouldAbort = true;
                }

                if (newSkillLevels[skillIndex] + increment < 0) {
                    alert("Skill level cannot be less than 0");
                    shouldAbort = true;
                }

                newSkillLevels[skillIndex] += increment;
                if (!shouldAbort) {
                    newCharacter.skillLevels = newSkillLevels;
                }
            }
            return newCharacter;
        })
        setCharacterList(newCharacters);
    };

    // consts
    const characterCards = characterList.map(character => {
            return (
                <CharacterCard
                    key={character.id}
                    character={character}
                    skillCheckResultsItem={skillCheckResultsItem}
                    rollButtonClickHandler={rollButtonClickHandler}
                    attributeButtonClickHandler={attributeButtonClickHandler}
                    skillButtonClickHandler={skillButtonClickHandler}
                />
            )
    })

    return (
        <section className="App-section">
            <TopActionButtonsSection handleActionButtonClick={handleActionButtonClick}/>
            <SkillCheckResultsSection skillCheckResultsItem={skillCheckResultsItem}/>
            <section className="APP-characters_section">
                {characterCards}
            </section>
        </section>
    )
}