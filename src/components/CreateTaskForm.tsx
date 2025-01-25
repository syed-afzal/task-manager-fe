import type React from "react";
import { useState } from "react";
import { TrashIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid"; // Importing additional icons

interface CreateTaskFormProps {
  onSubmit: (title: string, checklist: { text: string; isCompleted: boolean; icon: string }[]) => void;
  onCancel: () => void;
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState("");
  const [checklistItems, setChecklistItems] = useState([{ text: "", isCompleted: false, icon: "check" }]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(
      title,
      checklistItems.filter((item) => item.text.trim() !== ""), // Remove empty checklist items
    );
  };

  // Add new checklist item
  const handleAddChecklistItem = () => {
    setChecklistItems([...checklistItems, { text: "", isCompleted: false, icon: "check" }]);
  };

  // Update checklist item text
  const handleChecklistItemChange = (index: number, value: string) => {
    const updatedItems = [...checklistItems];
    updatedItems[index].text = value;
    setChecklistItems(updatedItems);
  };

  // Toggle checklist item completion
  const handleChecklistItemToggle = (index: number) => {
    const updatedItems = [...checklistItems];
    updatedItems[index].isCompleted = !updatedItems[index].isCompleted;
    setChecklistItems(updatedItems);
  };

  // Delete checklist item
  const handleDeleteChecklistItem = (index: number) => {
    const updatedItems = checklistItems.filter((_, i) => i !== index);
    setChecklistItems(updatedItems);
  };



  return (
    <form onSubmit={handleSubmit} className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white rounded-lg p-6 shadow-xl space-y-6">
      <h2 className="text-2xl font-semibold">Create a New Task</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" htmlFor="title">
          Task Title
        </label>
        <input
          className="w-full px-4 py-2 text-white placeholder-gray-400 bg-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="title"
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Checklist Items</label>
        {checklistItems.map((item, index) => (
          <div key={index} className="flex items-center mb-3 space-x-3">
            <input
              className="w-full px-4 py-2 text-white placeholder-gray-400 bg-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder={`Checklist item ${index + 1}`}
              value={item.text}
              onChange={(e) => handleChecklistItemChange(index, e.target.value)}
            />
            {/* Custom Checkbox with Icon */}
            <div onClick={() => handleChecklistItemToggle(index)} className="cursor-pointer">
              {item.isCompleted ? (
                <CheckCircleIcon className="w-5 h-5 text-green-500" />
              ) : (
                <XCircleIcon className="w-5 h-5 text-red-500" />
              )}
            </div>
            <button
              type="button"
              onClick={() => handleDeleteChecklistItem(index)}
              className="text-red-500 hover:text-red-700 ml-2 p-2 rounded-full transition-all duration-200"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddChecklistItem}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
        >
          Add Checklist Item
        </button>
      </div>

      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="submit"
        >
          Create Task
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreateTaskForm;
