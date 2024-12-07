import React, { useState } from 'react'

function Title({data, index, setBoardElements, boardElements}: any) {
    const {text} = data

    const handleChange = (e: any) =>{
      // Create a new copy of the element to update
    const updatedElement = {
      ...boardElements[index], 
      data: {
        ...boardElements[index].data, 
        text: e.target.value, // Update only the text field
      },
    };

    // Create a new array with the updated element
    const newList = [...boardElements];
    newList[index] = updatedElement;

    // Update the state with the new array
    setBoardElements(newList);
    console.log(newList);
    }
  return (
    <div className='title' style={{border: '1px solid green'}}>
        <input type="text" placeholder={text} onChange={handleChange}/>
    </div>
  )
}

export default Title