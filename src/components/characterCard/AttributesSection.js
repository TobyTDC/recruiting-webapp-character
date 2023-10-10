import React from "react";
import '../../App.css';
import { ATTRIBUTE_INDEX_MAP, ATTRIBUTE_LIST } from "../../consts";

export default function AttributesSection({character, attributeButtonClickHandler}) {

    /// consts
    const attributes = character.attributes

    const attributeLines = ATTRIBUTE_LIST.map((attribute, index) => {
        const attrIndex = ATTRIBUTE_INDEX_MAP[attribute]
        const attrValue = attributes[attrIndex]
        const modifierValue = Math.floor((attrValue - 10) / 2)
        return (
            <div key={attribute}>
                {attribute}:&nbsp;{attrValue}
                (Modifier:&nbsp;{modifierValue})
                &nbsp;
                <button onClick={() => attributeButtonClickHandler(character.id, index, 1)}>+</button>
                <button onClick={() => attributeButtonClickHandler(character.id, index, -1)}>-</button>
            </div>
        )
    })

    return (
        <div className="App-attributes_section">
            <h1>Atrributes</h1>
            <div>
                {attributeLines}
            </div>
        </div>
    )
}