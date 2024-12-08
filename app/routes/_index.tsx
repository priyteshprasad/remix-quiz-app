import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Form, useActionData, useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import { User, addUser, findUserByEmailPassword } from "users";
import { v4 as uuidv4 } from "uuid";


type ActionData = {
  error?: string;
  user?: User;
};

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const username = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return Response.json(
      { error: "Email and password are required." },
      { status: 400 }
    );
  }

  const newUser = {
    id: uuidv4(),
    username,
    email,
    password,
    role:"STUDENT"
  };

  const existingUser = findUserByEmailPassword(email, password);

  const user = existingUser || newUser;

  if (!existingUser) {
    addUser(user);
  }

  return Response.json({ user }, { status: 200 });
};

export default function Index() {



  return (
    <div className="h-screen flex items-center justify-center">
      <div className="space-y-4 text-center flex flex-col">
        <h1 className="text-5xl font-bold mb-8">Welcome to the Quiz App</h1>
        <div className=" flex justify-center">
          <img className="h-80" src="https://media.istockphoto.com/id/1186386668/vector/quiz-in-comic-pop-art-style-quiz-brainy-game-word-vector-illustration-design.jpg?s=612x612&w=0&k=20&c=mBQMqQ6kZuC9ZyuV5_uCm80QspqSJ7vRm0MfwL3KLZY=" alt="" />
        </div>
        <div className="flex space-x-4 justify-center">
          <Link to="/adminLogin">
            <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
              Login as Admin
            </button>
          </Link>
          <Link to="/studentLogin">
            <button className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400">
              Login as Student
            </button>
          </Link>
        </div>
        <p className="font-semibold">Powered by chaabi</p>
      </div>
    </div>
  )
  
}
