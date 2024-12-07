import React from 'react'

function SingleSelectOptions({data} : any) {
    const {options , correctAnswer} = data
  return (
    <div>
        {options && options.map((option: string, index: number)=>(
            <p style={{border: '1px solid red'}} key={index}>
                {option}
            </p>
        ))}
    </div>
  )
}

export default SingleSelectOptions