import React from "react";

interface SingleSelectOptionsProps {
  element: {
    data: {
      options: string[];
      correctAnswer: string;
    };
    id: number;
    type: string;
  };
  answers: string[];
  setAnswers: (newAnswers: string[]) => void;
  questionIndex: number;
}

function SingleSelectOptions({ element, answers, setAnswers, questionIndex }: SingleSelectOptionsProps) {
  const handleOptionChange = (selectedOption: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = selectedOption;
    setAnswers(updatedAnswers);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md border border-gray-300">
      <h3 className="text-lg font-semibold mb-2">Select an option:</h3>
      {element.data.options.map((option, index) => (
        <div key={index} className="flex items-center mb-2">
          <input
            type="radio"
            id={`option-${element.id}-${index}`}
            name={`question-${element.id}`}
            value={option}
            checked={answers[questionIndex] === option}
            onChange={() => handleOptionChange(option)}
            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <label
            htmlFor={`option-${element.id}-${index}`}
            className="ml-2 text-gray-700"
          >
            {option}
          </label>
        </div>
      ))}
    </div>
  );
}

export default SingleSelectOptions;
