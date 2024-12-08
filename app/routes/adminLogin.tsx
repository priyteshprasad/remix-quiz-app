import { json } from "@remix-run/node";
import { useActionData, Form, useNavigate } from "@remix-run/react";
import { User, users } from "users";
import { useEffect } from "react";

type ActionData = {
  error?: string;
  user?: User;
};

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");

  if (typeof username !== "string" || typeof password !== "string") {
    return json<ActionData>(
      { error: "Invalid form submission." },
      { status: 400 }
    );
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
  if (user?.role !== "ADMIN") {
    return json<ActionData>({
      error: "You can not login as Admin, go to Student login",
    });
  }
  return json({ user });
};

export default function AdminLogin() {
  const actionData = useActionData<ActionData>();
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("logged_in_user");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      if (user.role === "ADMIN") {
        navigate(`/createQuiz/${user.id}`);
      } else {
        navigate("/");
      }
    }
  }, [navigate]);

  useEffect(() => {
    if (actionData && "user" in actionData) {
      localStorage.setItem("logged_in_user", JSON.stringify(actionData.user));
      if (actionData?.user?.role === "ADMIN") {
        navigate(`/createQuiz/${actionData.user.id}`);
      } else {
        navigate("/");
      }
    }
  }, [actionData, navigate]);

  return (
    <>
    <div className="bg-sky-950">

      <h1 className="text-3xl text-white py-4 text-center">Welcome to Quiz app</h1>
    </div>
      <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-6 text-gray-700">Admin Login</h2>
          <Form method="post" className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter your password"
              />
            </div>
            {actionData?.error && (
              <p className="text-red-500 text-sm">{actionData.error}</p>
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
            <button className="px-4 py-2 text-blue-300 font-semibold " onClick={()=>navigate("/studentLogin")}>
              Student
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
