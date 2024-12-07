import React from 'react'

function Description({data}: any) {

  return (
    <p style={{border: "1px solid blue"}}>{data.text}</p>
  )
}

export default Description