import React from "react";
import { useDrag } from "react-dnd";
import DivElement from "./DivElement";

const elements = [
  {
    id: 0, 
    type: "ADD_TITLE",
  },
  {
    id: 1,
    type: "ADD_DESCRIPTION",
  },
  {
    id: 2,
    type: "ADD_IMAGE",
  },
  {
    id: 3,
    type: "ADD_SINGLE_SELECT_OPTIONS",
  },
  
];
function Panel() {
  return (
    <div style={{ width: "200px", height: "600px", border: "2px solid brown" }}>
      {elements.map((element, index) => (
        <DivElement id={element.id} type={element.type} key={index}/>
      ))}
    </div>
  );
}

export default Panel;
