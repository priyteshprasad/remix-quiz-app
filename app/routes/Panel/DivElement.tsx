import React from "react";
import { useDrag } from "react-dnd";

function DivElement({ id, type }: any) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "element",
    item: { id: id, type: type },
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const commonStyles = `
    bg-white shadow-md p-4 mb-4 rounded border border-gray-300 
    min-w-[180px] max-w-full 
    transition-transform duration-200 ease-in-out 
    hover:cursor-grab 
    ${isDragging ? "opacity-50 cursor-grabbing" : ""}
  `;

  switch (type) {
    case "ADD_TITLE":
      return (
        <div
          className={`${commonStyles} text-2xl font-bold`}
          ref={drag}
        >
          Title
        </div>
      );

    case "ADD_DESCRIPTION":
      return (
        <div
          className={`${commonStyles} text-base`}
          ref={drag}
        >
          Question description. A short description of the question in around 40
          to 100 words.
        </div>
      );

    case "ADD_IMAGE":
      return (
        <div
          className={`${commonStyles} flex flex-col items-center text-center`}
          ref={drag}
        >
          <p className="mb-2">Image</p>
          <img
            src="https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
            alt="Thumbnail"
            className="w-[80%] rounded"
          />
        </div>
      );

    case "ADD_SINGLE_SELECT_OPTIONS":
      return (
        <div
          className={`${commonStyles}`}
          ref={drag}
        >
          <p className="mb-2 font-medium">Single select options</p>
          <div className="space-y-2">
            <div className="flex items-center">
              <input type="radio" id="optionA" name="single-select" className="mr-2" />
              <label htmlFor="optionA">Option A</label>
            </div>
            <div className="flex items-center">
              <input type="radio" id="optionB" name="single-select" className="mr-2" />
              <label htmlFor="optionB">Option B</label>
            </div>
            <div className="flex items-center">
              <input type="radio" id="optionC" name="single-select" className="mr-2" />
              <label htmlFor="optionC">Option C</label>
            </div>
            <div className="flex items-center">
              <input type="radio" id="optionD" name="single-select" className="mr-2" />
              <label htmlFor="optionD">Option D</label>
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div
          className={commonStyles}
          ref={drag}
        >
          Actual draggable div
        </div>
      );
  }
}

export default DivElement;
