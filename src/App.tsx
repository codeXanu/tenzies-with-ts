import Die from "./Die"
import React from "react"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
function App() {

  const[dice, setDice] = React.useState(()=> generateAllNewDice())

  console.log(dice)
  const gameWon = dice.every(element=>(element.value===dice[0].value) && (element.isHeld===true) )
  // to focus keyboard on "New Game" button so that just click "spacebar" and new game start
  const newGameRef = React.useRef(null)
  React.useEffect(()=>{
    if (gameWon && newGameRef.current) {
      newGameRef.current.focus();
    }
  }, [gameWon])
  
  function generateAllNewDice() {
    return new Array(10)
        .fill(0)
        .map(() =>  ( {value: Math.ceil(Math.random() * 6), isHeld : false ,
            id : nanoid()
        }))
  }
 
  function roll() {
    if (!gameWon) {
      setDice(
        oldDice =>(
          oldDice.map(element => element.isHeld ? element : 
          {...element, value:Math.ceil(Math.random() * 6) })
        )
      )
    } else { 
      //for starting the new game
      setDice(generateAllNewDice())
    }
    
  }

  function hold(id: string){
    setDice(
      prevDice=>(
        prevDice.map(ele =>
          ele.id===id ? {...ele, isHeld:!ele.isHeld} : ele
        )
      )
    )
  }
  // console.log(numArray)
  
  const diceNum = dice.map((dieObj)=>{
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
