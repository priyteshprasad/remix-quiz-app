import React from 'react'
import { useDrag } from 'react-dnd';

function DivElement({id, type}: any) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "element",
        item: { id: id, type: type },
        collect: (monitor: any) => ({
          isDragging: !!monitor.isDragging(),
        }),
      }));
    switch (type) {
        case "ADD_TITLE":
            return (
                <div
                    style={{
                      border: "1px dashed tomato",
                      margin: "5px",
                      opacity: isDragging ? "0.5" : "1",
                    }}
                    ref={drag}
                  >
                    Actual draggable div Title {id}
                  </div>
              )
            break;
        case "ADD_DESCRIPTION":
            return (
                <div
                    style={{
                      border: "1px dashed tomato",
                      margin: "5px",
                      opacity: isDragging ? "0.5" : "1",
                    }}
                    ref={drag}
                  >
                    Actual draggable div Title {id}
                  </div>
              )
            break;
        case "ADD_IMAGE":
            return (
                <div
                    style={{
                      border: "1px dashed tomato",
                      margin: "5px",
                      opacity: isDragging ? "0.5" : "1",
                    }}
                    ref={drag}
                  >
                    Actual draggable div Title {id}
                  </div>
              )
            break;
        case "ADD_SINGLE_SELECT_OPTIONS":
            return (
                <div
                    style={{
                      border: "1px dashed tomato",
                      margin: "5px",
                      opacity: isDragging ? "0.5" : "1",
                    }}
                    ref={drag}
                  >
                    Actual draggable div Title {id}
                  </div>
              )
            break;
    
        default:
            break;
    }
  return (
    <div
        style={{
          border: "1px dashed tomato",
          margin: "5px",
          opacity: isDragging ? "0.5" : "1",
        }}
        ref={drag}
      >
        Actual draggable div
      </div>
  )
}

export default DivElement