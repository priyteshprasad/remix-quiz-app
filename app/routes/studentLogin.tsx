import { Form, json, useActionData, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { User, users } from "users";

type ActionData = {
  error?: string;
  user?: User;
};

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");

  if (typeof username !== "string" || typeof password !== "string") {
    return Response.json({ error: "Invalid data." }, { status: 400 });
  }
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) {
    return json<ActionData>(
      { error: "Invalid username or password." },
      { status: 401 }
    );
  }
  return json({ user });
};

const StudentLogin = () => {
  const actionData = useActionData<ActionData>();
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("logged_in_user");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      if (user.role === "STUDENT") {
        navigate(`/takeQuiz/${user.id}`);
      } else if (user.role === "ADMIN") {
        navigate(`/takeQuiz/${user.id}`);
      } else {
        navigate("/");
      }
    }
  }, []);

  useEffect(() => {
    if (actionData && "user" in actionData) {
      localStorage.setItem("logged_in_user", JSON.stringify(actionData.user));
      if (actionData?.user?.role === "STUDENT") {
        navigate(`/takeQuiz/${actionData.user.id}`);
      } else if(actionData?.user?.role === "ADMIN"){
        navigate(`/takeQuiz/${actionData?.user?.id}`);
      }
    }
  }, [actionData, navigate]);

  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [userIdError, setUserIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const handleLogin = () => {
    setUserIdError("");
    setPasswordError("");
    if (userId !== "defaultuser@quiz.com") {
      setUserIdError("Invalid id! use id: defaultuser@quiz.com");
      return;
    }
    if (password !== "defaultPassword") {
      setPasswordError("Wrong Password! use password: defaultPassword");
      return;
    }
    navigate("/takeQuiz");
  };
  return (
    <>
      <div className="bg-sky-950">
        <h1 className="text-3xl text-white py-4 text-center">
          Welcome to Quiz app
        </h1>
      </div>
      <div className="h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-6 text-gray-700">
            Student Login
          </h2>
          <Form method="post">
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-2"
              >Userid</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter username"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
            {userIdError && (
              <p className="text-red-500 text-sm mb-4">{userIdError}</p>
            )}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter user password"
                name="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
            {actionData?.error && (
              <p className="text-red-500 text-sm mb-4">{actionData.error}</p>
            )}
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Login
            </button>
          </Form>
          <hr className="my-4" />
          <div className="flex item-center justify-center">
            <button className="">or Login as</button>
            <button className=" px-4 py-2 text-blue-300 font-semibold " onClick={()=>navigate("/adminLogin")}>
              Admin
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentLogin;
