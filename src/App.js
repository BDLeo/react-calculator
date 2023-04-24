import './App.css';
import { useState } from 'react';

// Initial values & declaration of button array, to be mapped later
let calcArray = [];
let operator = null
let calcArrayTwo = [];
let operatorSelected = false;
let result
let opUpdate

const btnArray = [
  {
    display: "7",
    btnType: "num",
  }, {
    display: "8",
    btnType: "num",
  }, {
    display: "9",
    btnType: "num",
  },  {
    display: "C",
    btnType: "clr",
  },  {
    display: "4",
    btnType: "num",
  },  {
    display: "5",
    btnType: "num",
  },  {
    display: "6",
    btnType: "num",
  },  {
    display: "*",
    btnType: "op",
  },  {
    display: "1",
    btnType: "num",
  },  {
    display: "2",
    btnType: "num",
  },  {
    display: "3",
    btnType: "num",
  },  {
    display: "/",
    btnType: "op",
  },  {
    display: "+",
    btnType: "op",
  },  {
    display: "0",
    btnType: "num",
  },  {
    display: "-",
    btnType: "op",
  },  {
    display: "=",
    btnType: "eq",
  }
]
for (let i = 0; i < btnArray.length; i++) {
    btnArray[i].index = (i)
}


// React.js
const App = () => {

// Use states
  const [displayShow, setDisplay] = useState("0");
  const [displayShowTwo, setDisplayTwo] = useState("");
  const [displayOp, setDisplayOp] = useState("")

  const displayUpdate = () => {
    setDisplay(calcArray.join(""));
    setDisplayTwo(calcArrayTwo.join(""));
    setDisplayOp(opUpdate)
  }

// Calculator functionality
// Setting the operator variable triggered by button press, and storing future number inputs in a second array.
const operatorSelect = (opSign) => {

  operatorSelected = true;
  opUpdate = opSign;
  displayUpdate();
  if (opSign === "+") {
    operator = "add"
  } else if (opSign === "-") {
    operator = "sub"
  } else if (opSign === "*") {
    operator = "mult"
  } else {
    operator = "divd"
  }
}

const arrayNum = (value) => {
  if (operatorSelected === false) {
    calcArray.push(value)
  } else {
    calcArrayTwo.push(value)
  }
}

  // Clear function
const clear = () => {
  operator = null;
  opUpdate = null;
  calcArrayTwo = [];
  operatorSelected = false
}

  // Equals function, converting the arrays into usable numbers and completing the calculation
  const equals = () => {
    const calcNumOne = Number(displayShow)
    const calcNumTwo = Number(displayShowTwo)
  if (operator === "add") {
    result = calcNumOne + calcNumTwo
  } else if (operator === "sub") {
    result = calcNumOne - calcNumTwo
  } else if (operator === "mult") {
    result = calcNumOne * calcNumTwo
  } else if (operator === "divd") {
    result = calcNumOne / calcNumTwo
  }
  clear()
  operatorSelected = true;
  calcArray = [result]
}

  const calcButton = (props) => {
    // number buttons & assigning inputs to an array
    if (props.btnType === "num") {
      return(
        <button key={props.index} onClick={() => {arrayNum(props.display); displayUpdate()}}>{props.display}</button>
      )
    // Operator selection buttons
    } else if (props.btnType === "op") {
      return (
        <button key={props.index} onClick={() => {operatorSelect(props.display); displayUpdate()}}>{props.display}</button>
      )
    // Clear button
    } else if (props.btnType === "clr") {
      return (
        <button key={props.index} onClick={() => {clear(); calcArray = ["0"]; displayUpdate(); calcArray = []}}>{props.display}</button>
      )
    // Equals button
    } else {
      return (
        <button key={props.index} onClick={() => {equals(); displayUpdate()}}>{props.display}</button>
      ) 
    }
  
  }

  return (
    <div className="App">
      <div id="calcBorder">
        <div id="calcDisplay">
          <p>{displayShow} {displayOp} {displayShowTwo}</p>
        </div>
        <div id="calcButtons">
          {btnArray.map(calcButton)}
        </div>
      </div>
    </div>
  );
}



export default App;
