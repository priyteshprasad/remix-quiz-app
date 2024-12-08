import React, { useEffect, useState } from "react";
import SingleSelectOptions from "./takeQuizElements/SingleSelectOptions";
import { ResultModal, submitQuiz } from "./takeQuizElements/ResultModal";
import {
  redirect,
  useLoaderData,
  useNavigate,
} from "@remix-run/react";
import { User, users } from "users";

const getUIElement = (
  element: any,
  answers: any,
  setAnswers: any,
  questionIndex: any
) => {
  switch (element.type) {
    case "TITLE":
      return (
        <h1 className="text-2xl font-bold mb-4">
          Q. {questionIndex + 1 + ". " + element.data.text}
        </h1>
      );
    case "DESCRIPTION":
      return <h4 className="text-lg mb-3">{element.data.text}</h4>;
    case "IMAGE":
      return (
        <img
          src={element.data.url}
          alt="Quiz Element"
          className="mb-4 max-w-full"
        />
      );
    case "SINGLE_SELECT_OPTIONS":
      return (
        <SingleSelectOptions
          element={element}
          answers={answers}
          setAnswers={setAnswers}
          questionIndex={questionIndex}
        />
      );
    default:
      return (
        <h1 className="text-red-500">
          Unsupported element type: {JSON.stringify(element)}
        </h1>
      );
  }
};

export const loader = async ({ params }: { params: { id: string } }) => {
  const user = users.find((user) => user.id === params.id);
  if (!user) {
    return redirect("/");
  }

  return new Response(JSON.stringify(user), {
    headers: { "Content-Type": "application/json" },
  });
};

export default function TakeQuiz() {
  const user = useLoaderData<User>();
  const [quiz, setQuiz] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [report, setReport] = useState<any>(null);

  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("logged_in_user") || "null");

    if (!user) {
      console.log("No user found, redirecting...");
      // redirect("/")
      window.location.href = "/"; // Redirect to home
    } else {
      console.log("User is", user);
    }
    const data = JSON.parse(localStorage.getItem("remix_quiz") || "[]");
    setQuiz(data);
    setCurrentQuestion(data[0] || null);
    setAnswers(new Array(data.length).fill(""));
  }, []);

  const handleQuestionChange = (index: any) => {
    setCurrentIndex(index);
    setCurrentQuestion(quiz[index]);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleQuizSubmit = () => {
    submitQuiz(quiz, answers, setReport, openModal);
  };
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("logged_in_user");
      navigate("/");
    }
  };

  if (quiz.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-xl text-gray-500">
          Quiz has not been set up yet. Ask Admin to create a quiz.
        </h1>
      </div>
    );
  }

  return (
    <>
    <div className="bg-sky-950 p-4 flex justify-between">
        <h1 className="text-3xl text-white text-center font-semibold">
          Welcome {user.name}
        </h1>
        <div className="flex gap-1">
          <button
            className="p-2 mx-1 rounded-md border text-center transition bg-gray-400 hover:bg-gray-600"
            onClick={handleLogout}
          >
            Logout
          </button>
          <button
            className="p-2 mx-1 rounded-md border text-center transition bg-red-400 hover:bg-red-600"
            onClick={handleQuizSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    <div className="min-h-screen h-full bg-gray-100 p-4">
      
      {/* <div style={{ position: "relative" }}>
        <h1 className="text-3xl font-bold  mb-6">Welcome {user.name}</h1>
        <button
          className="p-2 rounded-md border text-center transition bg-red-400 hover:bg-red-600"
          style={{ position: "absolute", top: "2px", right: "20px" }}
          onClick={handleQuizSubmit}
        >
          Submit
        </button>
        <button
          className="p-2 rounded-md border text-center transition bg-gray-400 hover:bg-gray-600"
          style={{ position: "absolute", top: "2px", right: "100px" }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div> */}
      <div
        style={{ minHeight: "600px", height: "80vh" }}
        className="h-4/5 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6"
      >
        {/* Current Question Board */}
        <div className="overflow-scroll lg:col-span-3 md:col-span-3 p-4 bg-white shadow-md rounded-md border border-gray-200">
          {currentQuestion?.board.map((element: any, index: any) => (
            <div key={index} className="mb-6">
              {getUIElement(element, answers, setAnswers, currentIndex)}
            </div>
          ))}
        </div>

        {/* Question Navigator */}
        <div className="overflow-scroll p-4 bg-white shadow-md rounded-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Question Navigator</h2>
          <div className="flex md:flex md:flex-col md:overflow-y-auto md:max-h-60 sm:flex sm:flex-row sm:overflow-x-auto sm:whitespace-nowrap gap-2">
            {quiz.map((_, index) => (
              <button
                key={index}
                onClick={() => handleQuestionChange(index)}
                className={`p-2 rounded-md border text-center transition ${
                  index === currentIndex
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                Question {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 text-center text-sm text-gray-500">
        <span className="flex gap-1">
          Your Answers:{" "}
          {answers &&
            answers.map((answer: string, index: number) => (
              <p className="bg-green-200 rounded-full px-2">{`${
                index + 1
              }. ${answer}`}</p>
            ))}
        </span>
      </div>

      {/* Result Modal */}
      <ResultModal report={report} isOpen={isModalOpen} onClose={closeModal} />
    </div>
    </>
  );
}
