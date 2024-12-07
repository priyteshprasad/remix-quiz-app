import React from 'react'

function Image({data} : any) {
  return (
    <div>
        <img src={data.url} alt="img" />
    </div>
  )
}

export default Image