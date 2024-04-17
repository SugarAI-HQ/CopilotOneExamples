import React, { useState } from "react";
import { MdAdd, MdDelete } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { useCopilot } from "@sugar-ai/copilot-one-js";

enum recurringType {
  none,
  hourly,
  daily,
  weekly,
  monthly,
  yearly,
}

export default function Todo() {
  const { useStateCopilot, registerSkill, unregisterSkill } = useCopilot();
  const [todos, setTodos] = useStateCopilot([], "todoApp", "todos");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [highlightedSetting, setHighlightedSetting] = useState();
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  return <div>Todo yey</div>;
}
