import { useEffect } from "react";
import { DndProvider} from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragDrop from "./components/DragDrop";
import { User, users } from "users";
import { redirect, useLoaderData } from "@remix-run/react";

export const loader = async ({ params }: { params: { id: string } }) => {
  const user = users.find(user => user.id === params.id);
  if (!user) {
    return redirect("/");
  }

  return new Response(JSON.stringify(user), {
    headers: { "Content-Type": "application/json" },
  });
};
export default function CreateQuiz() {
  const user = useLoaderData<User>();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("logged_in_user") || "null");

    if (!user) {
      console.log("No user found, redirecting...");
      window.location.href = "/"; // Redirect to home
    } else {
      console.log("User is", user);
    }
  },[])

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <DragDrop user={user}/>
      </div>
    </DndProvider>
  );
}
