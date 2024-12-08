import React, { useEffect, useState } from 'react';

function SingleSelectOptions({ data, index, questions, setQuestions, questionIndex }: any) {
    const { options, correctAnswer } = data;
    const [rightAnswer, setRightAnswer] = useState(correctAnswer);
    useEffect(()=>{
        setRightAnswer(correctAnswer)
    }, [questionIndex])
    const handleOptionChange = (option: string) => {
        const questionsCopy = JSON.parse(JSON.stringify(questions));
        questionsCopy[questionIndex].board[index].data.correctAnswer = option;
        setQuestions([...questionsCopy]);
        setRightAnswer(option);
    };

    const handleOptionTextChange = (e: React.ChangeEvent<HTMLInputElement>, optionIndex: number) => {
        const questionsCopy = JSON.parse(JSON.stringify(questions));
        questionsCopy[questionIndex].board[index].data.options[optionIndex] = e.target.value;
        setQuestions([...questionsCopy]);
    };

    return (
        <div className="p-4 border border-gray-300 rounded-md bg-white">
            <h2 className="text-lg font-semibold mb-2">Single Select</h2>
            <form>
                {options && options.map((option: string, optionIndex: number) => (
                    <div key={optionIndex} className="mb-2 flex items-center">
                        <input
                            type="radio"
                            id={`option-${optionIndex}`}
                            name="single-select"
                            checked={option === rightAnswer}
                            onChange={() => handleOptionChange(option)}
                            className="mr-2 cursor-pointer"
                        />
                        <input
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionTextChange(e, optionIndex)}
                            className="border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                        />
                    </div>
                ))}
            </form>
        </div>
    );
}

export default SingleSelectOptions;
