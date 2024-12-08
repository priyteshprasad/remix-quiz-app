import React, { useEffect, useState } from 'react'

function Description({data, index, setQuestions, questions, questionIndex}: any) {
  const [textState, setTextState] = useState(questions[questionIndex]?.board[index]?.data?.text || "Description")
  
  useEffect(()=>{
    const newText = questions[questionIndex]?.board[index]?.data.text || "";
    setTextState(newText)
  }, [questionIndex])
  
  const handleChange = (e: any) =>{
    setTextState(e.target.value)

  const questionsCopy = JSON.parse(JSON.stringify(questions))
  questionsCopy[questionIndex].board[index].data.text = e.target.value
  console.log("Question", questionIndex , questionsCopy)
  setQuestions([...questionsCopy])
  }
  return (
    <div className="h-20 rounded-md shadow-sm p-0">
    <textarea
      id={`title-${index}`}
      value={textState}
      onChange={handleChange}
      onFocus={(e)=>e.preventDefault()}
      style={{fontSize: "15px", resize: "none", lineHeight: "15px", fontWeight: "700", padding: "5px"}}
      className="h-full w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2  focus:border-green-500 text-gray-800 text-xl"
    />
  </div>
  )
}

export default Description