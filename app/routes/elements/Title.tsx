import React, { useEffect, useRef, useState } from 'react'

function Title({data, index, setBoardElements, boardElements, setQuestions, questions, questionIndex}: any) {
  
  const [textState, setTextState] = useState(questions[questionIndex]?.board[index]?.data?.text || "First Question")
  useEffect(()=>{
    
    const newText =
      questions[questionIndex]?.board[index]?.data.text || '';
    setTextState(newText); // Update local state
  }, 
  [questionIndex, index, questions])
    
    const handleChange = (e: any) =>{
      setTextState(e.target.value)

    const questionsCopy = JSON.parse(JSON.stringify(questions))
    questionsCopy[questionIndex].board[index].data.text = e.target.value
    console.log("Question", questionIndex , questionsCopy)
    setQuestions([...questionsCopy])
  
    }
  return (
    <div className=" rounded-md shadow-sm p-0">
    <textarea
      id={`title-${index}`}
      value={textState}
      onChange={handleChange}
      onFocus={(e)=>e.preventDefault()}
      style={{fontSize: "30px", resize: "none", height: "80px", lineHeight: "32px", fontWeight: "700", padding: "5px"}}
      className=" w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2  focus:border-green-500 text-gray-800 text-xl"
    />
  </div>
  )
}

export default Title