import { useState } from "react";
import style from "./Dice.module.css";
import dicepic from "./utils/dice.png";
import { useRef } from "react";

export default function DiceApp() {
  const [dice, setDice] = useState(1);
  const [loading, setLoading] = useState(false);
  const selectRef = useRef();
  const diceNumber = useRef();

  const shuffleDice = () => {
    const selectedValue = parseInt(selectRef.current.value);
    let maxValue = 0;

    if(selectedValue === 6){
        maxValue = 6;
    }else if(selectedValue === 10){
        maxValue = 10;
    } else if (selectedValue === 20){
        maxValue = 20;
    }

    const newValue = Math.floor(Math.random() * maxValue) + 1;
    setLoading(true);

    setTimeout(() => {
      setDice(newValue);
      setLoading(false);
    }, 500);
  };

  const dclass = style[`face${dice}`];

  return (
    <>
      <h1 className={style.title}>Jeu de Dés</h1>
      <div className={style.diceContainer}>
        <div className={dclass}>
          <select ref={selectRef}>
            <option value="6">6</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <select></select>
          <img
            src={dicepic}
            id={style.pic}
            className={loading ? style.loading : ""}
          />
          <span className={loading ? style.hidden : style.diceNumber}>
            {dice}
          </span>
        </div>
        <button onClick={shuffleDice}>Lancer</button>
      </div>
    </>
  );
}
