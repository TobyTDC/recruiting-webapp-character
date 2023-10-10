import React from "react";
import '../App.css';
import logo from '../bg3.webp';

export default function Header() {
    return (
        <header className="App-header">
            <h1>React Coding Exercise - Toby Tang</h1>
            <img src={logo} alt="logo"/>
        </header>
    )
}