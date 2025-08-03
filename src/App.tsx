import Die from "./Die"
import React from "react"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import type { JSX } from 'react';


type Dice = {
  value: number
  isHeld: boolean
  id: string
}

function App(): JSX.Element {

  const[dice, setDice] = React.useState<Dice[]>(():Dice[] => generateAllNewDice())

  console.log(dice)
  const gameWon: boolean = dice.every(element=>(element.value===dice[0].value) && (element.isHeld===true) )
  // to focus keyboard on "New Game" button so that just click "spacebar" and new game start
  const newGameRef = React.useRef<HTMLButtonElement | null>(null)
  React.useEffect(()=>{
    if (gameWon && newGameRef.current) {
      newGameRef.current.focus();
    }
  }, [gameWon])
  
  function generateAllNewDice(): Dice[] {
    return new Array(10)
        .fill(0)
        .map((): Dice =>  ( {value: Math.ceil(Math.random() * 6), isHeld : false ,
            id : nanoid()
        }))
  }
 
  function roll(): void {
    if (!gameWon) {
      setDice(
        (oldDice:Dice[]): Dice[] =>
          oldDice.map((element: Dice): Dice => element.isHeld ? element : 
          {...element, value:Math.ceil(Math.random() * 6) })
        
      )
    } else { 
      //for starting the new game
      setDice(generateAllNewDice())
    }
    
  }

  function hold(id: string): void{
    setDice(
      (prevDice: Dice[]): Dice[]=>(
        prevDice.map((ele: Dice): Dice =>
          ele.id===id ? {...ele, isHeld:!ele.isHeld} : ele
        )
      )
    )
  }
  // console.log(numArray)
  
  const diceNum: JSX.Element[] = dice.map((dieObj: Dice): JSX.Element =>{
    return <Die 
      key={dieObj.id} 
      value = {dieObj.value} 
      isHeld = {dieObj.isHeld}
      hold = {hold}
      id = {dieObj.id}
    />
  })
  // console.log(diceNum)

  return (
    <main>
      {gameWon && <Confetti /> }
      <div className="title-text">
        <h1 >Tenzies</h1>
        {gameWon ? (
      <h1 className="winning-text">🎉 Congratulations! You Won! 🎲🎊</h1> 
      ) : (
      <p className="instructions">
        Roll until all dice are the same. 
        Click each die to freeze it at its current value between rolls.
      </p>
      )}
      </div>

      <div id="die">
      {diceNum }
      </div>
      <button className="rollBtn" onClick={roll} ref={newGameRef} >
        {gameWon ? "New Game" : "Roll"}
      </button>
      
    </main>
  )
}

export default App
