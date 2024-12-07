import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragDrop from "./components/DragDrop";

// interface Widget {
//   id: string;
//   type: string;
//   content: string;
//   position: { x: number; y: number };
// }

export default function CreateQuiz() {
//   const [widgets, setWidgets] = useState<Widget[]>([]);

//   const [, drop] = useDrop({
//     accept: "widget",
//     drop: (item: Widget, monitor) => {
//       const offset = monitor.getClientOffset();
//       if (offset) {
//         const canvas = document.getElementById("canvas");
//         if (canvas) {
//           const rect = canvas.getBoundingClientRect();
//           const x = offset.x - rect.left;
//           const y = offset.y - rect.top;

//           const newWidget: Widget = {
//             ...item,
//             position: { x, y },
//           };

//           setWidgets((prevWidgets) => [...prevWidgets, newWidget]);
//         }
//       }
//     },
//   });

//   const WidgetItem = ({ widget }: { widget: Widget }) => {
//     const [, drag] = useDrag({
//       type: "widget",
//       item: widget,
//     });

//     return (
//       <div
//         ref={drag}
//         className="p-2 bg-gray-200 rounded-md shadow-sm cursor-pointer mb-2"
//       >
//         {widget.content}
//       </div>
//     );
//   };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <DragDrop />
      </div>
    </DndProvider>
  );
}
