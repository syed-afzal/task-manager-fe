import type React from "react";
import { useState } from "react";
import { CheckCircleIcon, XCircleIcon, TrashIcon } from "@heroicons/react/24/solid"; // Import Heroicons
import type { CheckList, Task } from "../types";

interface TaskItemProps {
  task: Task;
  onUpdate: (id: string, title: string, checklist: CheckList[]) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [checklist, setChecklist] = useState(task.checklist);

  const handleSave = () => {
    onUpdate(task._id, title, checklist); // Update parent state with the latest checklist state
    setIsEditing(false);
  };

  const handleChecklistItemToggle = (index: number) => {
    const updatedChecklist = checklist.map((item, i) =>
      i === index ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setChecklist(updatedChecklist);
  };

  const handleChecklistItemTextChange = (index: number, newText: string) => {
    const updatedChecklist = checklist.map((item, i) =>
      i === index ? { ...item, text: newText } : item
    );
    setChecklist(updatedChecklist);
  };

  const handleChecklistItemDelete = (index: number) => {
    const updatedChecklist = checklist.filter((_, i) => i !== index);
    setChecklist(updatedChecklist);
  };

  return (
    <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-xl rounded-lg px-8 py-6 mb-6 transition-transform transform hover:scale-105 hover:shadow-2xl">
      {isEditing ? (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-4 mb-4 text-lg font-semibold text-white bg-gray-700 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
          {checklist.map((item, index) => (
            <div key={index} className="flex items-center mb-4">
              <button
                onClick={() => handleChecklistItemToggle(index)}
                className={`w-6 h-6 mr-3 transition-all ${item.isCompleted ? "text-green-500" : "text-red-500"}`}
              >
                {item.isCompleted ? (
                  <CheckCircleIcon className="w-6 h-6" />
                ) : (
                  <XCircleIcon className="w-6 h-6" />
                )}
              </button>
              <input
                type="text"
                value={item.text}
                onChange={(e) => handleChecklistItemTextChange(index, e.target.value)}
                className="w-full p-3 bg-gray-600 rounded-lg shadow-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
              <button
                onClick={() => handleChecklistItemDelete(index)}
                className="ml-3 text-red-500 hover:text-red-700 transition-all"
              >
                <TrashIcon className="w-6 h-6" />
              </button>
            </div>
          ))}
          <div className="flex justify-end mt-6">
            <button
              onClick={handleSave}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition-all"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg ml-4 transition-all"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-3xl font-bold mb-6 text-white">{task.title}</h2>
          <ul className="mb-6">
            {checklist.map((item, index) => (
              <li key={index} className="flex items-center mb-4">
                <button
                  onClick={() => handleChecklistItemToggle(index)}
                  className={`w-6 h-6 mr-4 transition-all ${item.isCompleted ? "text-green-500" : "text-red-500"}`}
                >
                  {item.isCompleted ? (
                    <CheckCircleIcon className="w-6 h-6" />
                  ) : (
                    <XCircleIcon className="w-6 h-6" />
                  )}
                </button>
                <span className={item.isCompleted ? "line-through text-gray-500" : "text-white text-lg"}>
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex justify-end">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-lg transition-all"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task._id)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg ml-4 transition-all"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;
