import React from "react";
import '../../App.css';
import { CLASS_LIST } from "../../consts";

export default function ClassRequirementsSection({className, closeHandler}) {

    /// functions
    function renderClassRequirements(className) {

        const requirements = CLASS_LIST[className];
        
        // Validate attributes
        let classRequirements = [];
        Object.keys(requirements).forEach(requirementKey => {
            let requiredAttributeValue = requirements[requirementKey]
            const requirementComponent = (
                <div key={requirementKey} className="App-requirement_str">{`${requirementKey}: ${requiredAttributeValue}`}</div>
            )
            classRequirements.push(requirementComponent)
        });

        return classRequirements
    }

    /// consts
    const classRequirements = renderClassRequirements(className)

    return (
        <div className="App-class_requirements_section">
            <h1>{className}&nbsp;Minimum <br/> Requirements</h1>
            <div>
                {classRequirements}
            </div>
            <button onClick={() => closeHandler()}>Close Requirement View</button>
        </div>
    )
};