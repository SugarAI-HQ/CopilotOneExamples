"use client";
import { NextPage } from "next";
import "../app/globals.css";
import React, { useEffect, useState } from "react";
import { MdAdd, MdDelete } from "react-icons/md";
import { FiSettings } from "react-icons/fi";

import {
  useCopilot,
  CopilotConfigType,
  CopilotProvider,
  VoiceAssistant,
} from "@sugar-ai/copilot-one-js";
import { FilterType, SettingsType, TodoSchemaType } from "../schema/todoSchema";
import { getPreviewConfig } from "@/helpers/copilot";

enum recurringType {
  none,
  hourly,
  daily,
  weekly,
  monthly,
  yearly,
}

const copilotPackage = "sugar/copilotexample/todoexample/0.0.1";

let copilotConfig: CopilotConfigType = {
  copilotId: "da82abb5-cf74-448b-b94d-7e17245cc5d9",
  server: {
    endpoint: "https://play.sugarcaneai.dev/api",
    token: "pk-m0j6E8CfMkedk0orAk0gXyALpOZULs3rSiYulaPFXd2rPlin",
  },

  ai: {
    defaultPromptTemplate: copilotPackage,
    defaultPromptVariables: {
      "#AGENT_NAME": "Tudy",
    },
    welcomeMessage: "Hello, I am Tudy. What task can I help you with today?",
    successResponse: "Task Done",
    failureResponse: "I am not able to do this",
  },
  style: {
    keyboardButton: {
      placeholder: "How can I help ?",
    },
  },
};

const TodoApp = () => {
  const { useStateEmbedding, registerAction, unregisterAction } = useCopilot();

  const [todos, setTodos] = useStateEmbedding([], "todoApp", "todos");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [highlightedSetting, setHighlightedSetting] = useState("");
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  const addTodo = (task: string) => {
    // @ts-ignore
    setTodos((ts) => [...ts, { task, id: ts.length + 1, completed: false }]);
  };

  registerAction(
    "addTodo",
    {
      name: "addTodo",
      description: "Add a new todo",
      parameters: [
        {
          name: "task",
          type: "string",
          description: "Task description",
          required: true,
        },
      ],
    },
    addTodo
  );

  const deleteTodo = (task: string) => {
    setTodos(
      (todos as any).filter(
        (todo: TodoSchemaType) => todo.task.toLowerCase() !== task.toLowerCase()
      )
    );
  };

  registerAction(
    "deleteTodo",
    {
      name: "deleteTodo",
      description: "Delete a todo based on task comparison",
      parameters: [
        {
          name: "task",
          type: "string",
          description: "Task to be deleted",
          required: true,
        },
      ],
    },
    deleteTodo
  );

  const markTodoAsDone = (task: string) => {
    setTodos(
      (todos as any).map((todo: TodoSchemaType) => {
        if (todo.task.toLowerCase() === task.toLowerCase()) {
          return { ...todo, completed: !todo.completed }; // Toggle completed status
        }
        return todo;
      })
    );
  };

  const markTodoAsDoneById = function nameFunc(todoId: number) {
    setTodos(
      (todos as any).map((todo: TodoSchemaType) => {
        if (todo.id == todoId) {
          return { ...todo, completed: true };
        }
        return todo;
      })
    );
  };
  registerAction(
    "markTodoAsDoneById",
    {
      name: "markTodoAsDoneById",
      description: "Mark a todo as done by its ID",
      parameters: [
        {
          name: "todoId",
          type: "number",
          description: "ID of the todo to mark as done",
          required: true,
        },
      ],
    },
    markTodoAsDoneById
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // @ts-ignore
    addTodo(input, false, recurringType.none);
    setInput("");
  };

  const filterTodos = () => {
    if (!Array.isArray(todos)) {
      return [];
    }

    switch (filter) {
      case "remaining":
        return todos.filter((todo: TodoSchemaType) => !todo.completed);
      case "done":
        return todos.filter((todo: TodoSchemaType) => todo.completed);
      default:
        return todos;
    }
  };

  const handleSettingsToggle = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const manageSettings = (settingName: string) => {
    setIsSettingsOpen(true);
    setHighlightedSetting(settingName);
  };

  registerAction(
    "manageSettings",
    {
      name: "manageSettings",
      description: "Manage Settings for todo App ",
      parameters: [
        {
          name: "settingName",
          type: "string",
          enum: [
            "notifications",
            "dark_mode",
            "sound_effects",
            "auto_expire",
            "recurring_on",
          ],
          description: "Name of the setting",
          required: true,
        },
      ],
    },
    manageSettings
  );

  return (
    <div className="container mx-auto p-8">
      <SettingsPopup
        isOpen={isSettingsOpen}
        onClose={handleSettingsToggle}
        highlightedSetting={highlightedSetting}
      />
      <VoiceAssistant
        id={"preview"}
        promptTemplate={copilotPackage}
        position={"bottom-center"}
        // promptVariables={{ "#AGENT_NAME": "Tudy" }}
        // voiceButtonStyle={{ backgroundColor: "#39f" }}
      ></VoiceAssistant>
      {/* <VoiceAssistant
        id={"preview"}
        promptTemplate={copilotPackage}
        position={"top-center"}
        // promptVariables={{ "#AGENT_NAME": "Tudy" }}
        // voiceButtonStyle={{ backgroundColor: "#39f" }}
      ></VoiceAssistant> */}
      {/* <VoiceAssistant
        id={"preview"}
        promptTemplate={copilotPackage}
        position={"bottom-right"}
        promptVariables={{ "#AGENT_NAME": "Tudy" }}
        // buttonStyle={{ backgroundColor: "#39f" }}
      ></VoiceAssistant>

      <h1 className="text-3xl font-bold mb-4">
        Todos ({todos.length}){" "}
        <button onClick={handleSettingsToggle} className="">
          <FiSettings className="h-5 w-5 text-gray-500 hover:text-gray-700" />{" "}
          {/* Settings icon */}
        </button>
      </h1>
      <form onSubmit={handleSubmit} className="mb-4 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:border-blue-500"
          placeholder="Add a new todo"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-r focus:outline-none focus:shadow-outline flex items-center"
        >
          <MdAdd className="mr-2" />
        </button>
      </form>
      <div className="flex mb-4">
        <button
          onClick={() => setFilter("all")}
          className={`mr-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded ${
            filter === "all" ? "bg-gray-400" : ""
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("remaining")}
          className={`mr-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded ${
            filter === "remaining" ? "bg-gray-400" : ""
          }`}
        >
          Remaining
        </button>
        <button
          onClick={() => setFilter("done")}
          className={`bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded ${
            filter === "done" ? "bg-gray-400" : ""
          }`}
        >
          Done
        </button>
      </div>
      <ul>
        {filterTodos().map((todo, index) => (
          <li
            key={index}
            className={`flex items-center justify-between py-2 ${
              todo.completed ? "line-through text-gray-500" : ""
            }`}
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => markTodoAsDone(todo.task)}
                className="mr-2"
              />
              <span>{todo.task}</span>
            </div>
            <div>
              <MdDelete
                className="text-red-500 hover:text-red-600 cursor-pointer"
                onClick={() => deleteTodo(todo.task)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const SettingsPopup: React.FC<SettingsType> = ({
  isOpen,
  onClose,
  highlightedSetting,
}) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gray-800 opacity-50"></div>
      <div className="bg-white rounded-lg p-8 z-10 min-w-[400px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Settings</h2>
          <button onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-500 hover:text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <ul>
          <li
            className={`flex justify-between items-center mb-4 ${
              highlightedSetting === "notifications" ? "bg-yellow-200" : ""
            }`}
          >
            <span className="text-sm">Notifications</span>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
          </li>
          <li
            className={`flex justify-between items-center mb-4 ${
              highlightedSetting === "dark_mode" ? "bg-yellow-200" : ""
            }`}
          >
            <span className="text-sm">Dark Mode</span>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
          </li>
          <li
            className={`flex justify-between items-center mb-4 ${
              highlightedSetting === "sound_effects" ? "bg-yellow-200" : ""
            }`}
          >
            <span className="text-sm">Sound effects</span>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
          </li>
          <li
            className={`flex justify-between items-center mb-4 ${
              highlightedSetting === "auto_expire" ? "bg-yellow-200" : ""
            }`}
          >
            <span className="text-sm">Auto Expire</span>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
          </li>
          <li
            className={`flex justify-between items-center mb-4 ${
              highlightedSetting === "recurring_on" ? "bg-yellow-200" : ""
            }`}
          >
            <span className="text-sm">Recurring on</span>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
};

const Todo: NextPage = () => {
  const [config, setConfig] = useState(copilotConfig);

  useEffect(() => {
    const encodedData = window.location.search.split("=")[1];
    if (typeof encodedData !== "undefined" && encodedData) {
      const previewConfig = JSON.parse(atob(encodedData));
      const finalConfig = { ...config, ...previewConfig };
      setConfig(finalConfig);
    }
  }, []);

  return (
    <CopilotProvider config={config as CopilotConfigType}>
      <TodoApp />
    </CopilotProvider>
  );
};
export default Todo;
