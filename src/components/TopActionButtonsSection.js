import React from 'react';
import { ACTION_BUTTONS_LIST } from '../consts';
import '../App.css';

export default function TopActionButtonsSection({handleActionButtonClick}) {

    const action_buttons = ACTION_BUTTONS_LIST.map((action_button) => {
        return (
            <button onClick={() => handleActionButtonClick(action_button.key)} key={action_button.key}>{action_button.title}</button>
        )
    })

    return(
        <div className="App-top_action_buttons_section">
            {action_buttons}
        </div>
    )
}