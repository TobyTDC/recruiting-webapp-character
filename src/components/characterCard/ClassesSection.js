import React from "react";
import '../../App.css';
import { ATTRIBUTE_INDEX_MAP, CLASS_LIST } from "../../consts";

export default function ClassesSection({attributes, classSelectHandler}) {

    /// functions
    function renderClass(className) {
        const requirements = CLASS_LIST[className];
        
        // Validate attributes
        let isRequirementsFulfilled = true;
        Object.keys(requirements).forEach(requirementKey => {
            let attributeIndex = ATTRIBUTE_INDEX_MAP[requirementKey]
            let attributeValue = attributes[attributeIndex]
            let requiredAttributeValue = requirements[requirementKey]
            
            isRequirementsFulfilled = isRequirementsFulfilled && (attributeValue >= requiredAttributeValue)
            
        });

        const fontColor = isRequirementsFulfilled ? {color: "red"} : {color: "white"};

        return <div key={className} className="App-class_str" style={fontColor} onClick={()=> classSelectHandler(className)}>{className}</div>
    }

    /// consts
    let classes = [];
    Object.keys(CLASS_LIST).forEach(className => {
        classes.push(renderClass(className))
    })

    return (
        <div className="App-attributes_section">
            <h1>Classes</h1>
            <div>
                {classes}
            </div>
        </div>
    )
};