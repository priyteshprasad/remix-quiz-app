import React, { useState } from "react";
import Picture from "./Picture";
import { useDrop } from "react-dnd";
import "./styles.css";
import Title from "../elements/Title";
import SingleSelectOptions from "../elements/SingleSelectOptions";
import Image from "../elements/Image";
import Description from "../elements/Description";
import Panel from "../Panel/Panel"
interface PictureType {
  id: number;
  url: string;
}

const PictureList: PictureType[] = [
  {
    id: 1,
    url: "https://w7.pngwing.com/pngs/941/692/png-transparent-black-small-apple-logo-logo-material-apple-logo-black-thumbnail.png",
  },
  {
    id: 2,
    url: "https://png.pngitem.com/pimgs/s/274-2746107_heart-flower-leaf-heart-hd-png-download.png",
  },
  {
    id: 3,
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPjhCyUijzK271WSKkd5NvJCJvwQgvCZlEKQ&s",
  },
];

const initialBoardElements = [
  {
    id: 0,
    type: "TITLE",
    data: {
      text: "First Question",
    },
  },
  {
    id: 1,
    type: "DESCRIPTION",
    data: {
      text: "Out of all the options given below select the correct answer",
    },
  },
  {
    id: 2,
    type: "IMAGE",
    data: {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPjhCyUijzK271WSKkd5NvJCJvwQgvCZlEKQ&s",
    },
  },
  {
    id: 3,
    type: "SINGLE_SELECT_OPTIONS",
    data: {
      options: ["Option A", "Option B", "Option C", "Option D"],
    },
  },
];
const quiz = [
  // array of boards
];
const getElement= (element: any, index: number, setBoardElements: any, boardElements: any) =>{
  switch (element.type) {
    case "TITLE":
      return <Title data={element.data} key={index} index={index} setBoardElements={setBoardElements} boardElements={boardElements}/>
      break;
    case "SINGLE_SELECT_OPTIONS":
      return <SingleSelectOptions data={element.data} key={index}/>
      break;
    case "IMAGE":
      return <Image data={element.data} key={index}/>
      break;
    case "DESCRIPTION":
      return <Description data={element.data} key={index}/>
      break;
    default:
      break;
  }
  return <h2>{element.type}</h2>
}

const DragDrop: React.FC = () => {
  const [board, setBoard] = useState<PictureType[]>([]);
  const [boardElements, setBoardElements] = useState<any>([]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: (item: { id: number }) => addImageToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  const [{}, drop2] = useDrop(()=>({
    accept: "element",
    drop: (item)=> addElementToDashboard(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }))

  const addImageToBoard = (id: number) => {
    const pictureList = PictureList.filter((picture) => id === picture.id);
    setBoard((board) => [...board, pictureList[0]]);
  };
  const addElementToDashboard = (item: any) => {
    console.log("ITEM IS: ",item)
    
    setBoardElements((prev: any)=>[...prev, initialBoardElements[item.id]])
  }

  return (
    <div
      className="d-flex"
      style={{ display: "flex", justifyContent: "center ", gap: "20px" }}
    >
      <div>
        <h2>Panel</h2>

        <div className="Pictures" style={{ border: "1px solid pink" }}>
          <Panel />
        </div>
      </div>

      <div>
        <h2>Board 2</h2>
        <div className="Board" style={{ overflow: "scroll" }} ref={drop2}>
          {boardElements.map((item: any, index: number)=>(
            getElement(item, index, setBoardElements, boardElements)
          ))}
        </div>
      </div>
      {JSON.stringify(boardElements)}
    </div>
  );
};

export default DragDrop;
