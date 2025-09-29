import { useState } from "react";
import style from "./Dice.module.css";
import dicepic from "./utils/dice.png";
import { useRef } from "react";

export default function DiceApp() {
  const [diceResults, setDiceResults] = useState([1]);
  const [loading, setLoading] = useState(false);
  const selectRef = useRef();
  const diceNumber = useRef();

  const shuffleDice = () => {
    const selectedValue = parseInt(selectRef.current.value);
    const numberOfDice = parseInt(diceNumber.current.value);
    let maxValue = 0;

    if(selectedValue === 6){
        maxValue = 6;
    }else if(selectedValue === 10){
        maxValue = 10;
    } else if (selectedValue === 20){
        maxValue = 20;
    }
    
    setLoading(true);
    
    // Générer les résultats pour tous les dés
    const newResults = [];
    for(let i = 0; i < numberOfDice; i++){
      const newValue = Math.floor(Math.random() * maxValue) + 1;
      newResults.push(newValue);
    }
    
    setTimeout(() => {
      setDiceResults(newResults);
      setLoading(false);
    }, 500);
  };  return (
    <>
      <h1 className={style.title}>Jeu de Dés</h1>
      <div className={style.diceContainer}>
        <div className={style.controls}>
          <label>Type de dé:</label>
          <select ref={selectRef}>
            <option value="6">D6 (6 faces)</option>
            <option value="10">D10 (10 faces)</option>
            <option value="20">D20 (20 faces)</option>
          </select>
          
          <label>Nombre de dés:</label>
          <select ref={diceNumber}>
            <option value="1">1 dé</option>
            <option value="2">2 dés</option>
            <option value="3">3 dés</option>
            <option value="4">4 dés</option>
          </select>
        </div>
        
        <div className={style.diceGrid}>
          {diceResults.map((diceValue, index) => (
            <div key={index} className={style.singleDice}>
              <img
                src={dicepic}
                className={`${style.diceImage} ${loading ? style.loading : ""}`}
                alt={`Dé ${index + 1}`}
              />
              <span className={loading ? style.hidden : style.diceNumber}>
                {diceValue}
              </span>
            </div>
          ))}
        </div>
        
        <div className={style.summary}>
          {diceResults.length > 1  && (
            <div className={style.total}>
              <strong>Total: {diceResults.reduce((sum, value) => sum + value, 0)}</strong>
            </div>
          )}
        </div>
        
        <button onClick={shuffleDice} className={style.rollButton}>
          Lancer {diceResults.length > 1 ? `les ${diceResults.length} dés` : 'le dé'}
        </button>
      </div>
    </>
  );
}
