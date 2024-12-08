import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import Title from "../elements/Title";
import SingleSelectOptions from "../elements/SingleSelectOptions";
import Image from "../elements/Image";
import Description from "../elements/Description";
import Panel from "../Panel/Panel";
import { useNavigate } from "@remix-run/react";

const initialBoardElements = [
  {
    id: 0,
    type: "TITLE",
    data: { text: "First Question" },
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
    data: { url: "https://via.placeholder.com/150" },
  },
  {
    id: 3,
    type: "SINGLE_SELECT_OPTIONS",
    data: {
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: "Option B",
    },
  },
];

const getElement = (element: any, index: number, props: any) => {
  const {
    setBoardElements,
    boardElements,
    setQuestions,
    questions,
    questionIndex,
  } = props;
  switch (element.type) {
    case "TITLE":
      return (
        <Title
          data={element.data}
          key={index}
          index={index}
          setBoardElements={setBoardElements}
          boardElements={boardElements}
          setQuestions={setQuestions}
          questions={questions}
          questionIndex={questionIndex}
        />
      );
    case "SINGLE_SELECT_OPTIONS":
      return (
        <SingleSelectOptions
          data={element.data}
          key={index}
          index={index}
          setQuestions={setQuestions}
          questions={questions}
          questionIndex={questionIndex}
        />
      );
    case "IMAGE":
      return (
        <Image
          data={element.data}
          key={index}
          index={index}
          setBoardElements={setBoardElements}
          boardElements={boardElements}
          setQuestions={setQuestions}
          questions={questions}
          questionIndex={questionIndex}
        />
      );
    case "DESCRIPTION":
      return (
        <Description
          data={element.data}
          key={index}
          index={index}
          setBoardElements={setBoardElements}
          boardElements={boardElements}
          setQuestions={setQuestions}
          questions={questions}
          questionIndex={questionIndex}
        />
      );
    default:
      return <h2 key={index}>{element.type}</h2>;
  }
};

const DragDrop = () => {
  const [questions, setQuestions] = useState<any>([{ id: 0, board: [] }]);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [boardElements, setBoardElements] = useState<any>([]);
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const savedData = JSON.parse(localStorage.getItem("remix_quiz") || "[]");
      if (savedData.length > 0) {
        setQuestions(savedData);
        setBoardElements(savedData[0].board);
      }
    } catch (error) {
      console.error("Failed to load saved quiz data", error);
    }
  }, []);

  const handleBoardChange = (question: any, index: number) => {
    setBoardElements(question.board);
    setQuestionIndex(index);
  };

  const addElementToDashboard = (item: any) => {
    const newElement = { ...initialBoardElements[item.id], id: Date.now() };
    setQuestions((prevQuestions: any) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[questionIndex].board = [
        ...updatedQuestions[questionIndex].board,
        newElement,
      ];
      return updatedQuestions;
    });
  };

  const handleAddQuestion = () => {
    setQuestions((prev: any) => [...prev, { id: prev.length, board: [] }]);
  };

  const handleSaveQuiz = () => {
    try {
      localStorage.setItem("remix_quiz", JSON.stringify(questions));
      alert("Quiz saved successfully!");
    } catch (error) {
      console.error("Error saving quiz", error);
    }
  };

  const deleteQuestion = (id: any) => {
    if(questions.length === 1){

      setQuestions([{id: 0, board:[]}])
      setQuestionIndex(0)
      setBoardElements([])
    }else{

      setQuestions((prev: any) => prev.filter((q: any) => q.id !== id));
    }
  };

  const [, dropRef] = useDrop(
    () => ({
      accept: "element",
      drop: (item) => addElementToDashboard(item),
    }),
    [questionIndex]
  );
  const handleLogout = () =>{
    if(window.confirm("Are you sure want to logout?")){
      localStorage.removeItem("logged_in_user");
      navigate("/")
    }
  }

  return (
    <div>
      <div className="bg-sky-950 p-4 grid grid-cols-6">
        <h1 className="text-3xl text-white text-center font-semibold col-span-5">Welcome Admin!</h1>
        <button className="px-4 py-2 font-semibold rounded-lg shadow-md bg-yellow-500 hover:bg-yellow-700 focus:ring-2" onClick={handleLogout}>Logout</button>
      </div>
    
    <div className="p-4 grid grid-cols-8 md:grid-cols-8 gap-4">
      {/* Left Panel */}
      <div className="bg-blue-100 col-span-2 lg:col-span-2 md:col-span-3 sm:col-span-3 border rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Panel</h2>
        <Panel />
      </div>

      {/* Question Board */}
      <div
        ref={dropRef}
        className="col-span-6 lg:col-span-4 md:col-span-5 sm:col-span-5 border rounded-lg p-4 overflow-auto h-90 lg:h-auto bg-blue-100"
      >
        <h2 className="text-lg font-semibold mb-4">
          Question {questions && questions[questionIndex]?.id + 1}
        </h2>
        {questions && questions[questionIndex]?.board?.map((item: any, index: number) =>
          getElement(item, index, {
            setBoardElements,
            boardElements,
            setQuestions,
            questions,
            questionIndex,
          })
        )}
      </div>

      {/* Question Navigation */}
      <div className="col-span-8 sm:col-span-8 md:col-span-8 lg:col-span-2 border rounded-lg p-4 flex flex-col bg-blue-100">
        <h2 className="text-lg font-semibold mb-4">Questions</h2>
        <div className="h-full flex flex-col gap-4 justify-between  sm:flex sm:justify-between">
          <div className="flex flex-row lg:flex-col gap-2">
            {questions && questions.map((question: any, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={() => handleBoardChange(question, index)}
                >
                  Question {question?.id + 1}
                </button>
                <button
                  className="px-2 py-2 bg-red-500 text-white rounded"
                  onClick={() => deleteQuestion(question?.id)}
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
          <div className="flex lg:flex lg:flex-col gap-2">
            <button
              className=" px-4 py-2 bg-green-500 text-white rounded"
              onClick={handleAddQuestion}
            >
              + Add Question
            </button>
            <button
              className=" px-4 py-2 bg-purple-500 text-white rounded"
              onClick={handleSaveQuiz}
            >
              Save Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default DragDrop;
