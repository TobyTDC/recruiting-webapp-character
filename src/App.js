import { useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts.js';
import Header from './components/Header';
import MainSection from './components/Main';


function App() {
  const [num, setNum] = useState(0);
  return (
    <div className="App">
      <Header/>
      <MainSection/>
    </div>
  );
}

export default App;
