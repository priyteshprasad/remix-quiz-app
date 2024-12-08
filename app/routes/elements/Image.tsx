import React, { useState } from "react";

function Image({ data, index, setQuestions, questions, questionIndex }: any) {
  const [url, setUrl] = useState(data.url);
  const handleChange = (e: any) => {
    
    const imageUrl = e.target.value;

    const questionsCopy = JSON.parse(JSON.stringify(questions));
    questionsCopy[questionIndex].board[index].data.url = imageUrl;
    
    setQuestions([...questionsCopy]);
    setUrl(imageUrl);
  };
  return (
    <div className="w-full bg-white rounded-md flex flex-col items-center justify-center w-full h-[250px] my-5">
      <div className="h-4/5">
        <img
          src={url || "https://via.placeholder.com/150"}
          alt="img"
          className="h-full w-auto object-contain rounded-md"
        />
      </div>
      <input
        onChange={handleChange}
        placeholder="Enter image url"
        className="mt-2 w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default Image;
