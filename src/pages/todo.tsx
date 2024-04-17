import React, { useState } from "react";
import { MdAdd, MdDelete } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import {
  useCopilot,
  CopilotConfigType,
  CopilotProvider,
  VoiceToSkillComponent,
} from "@sugar-ai/copilot-one-js";

const copilotConfig: CopilotConfigType = {
  copilotId: "da82abb5-cf74-448b-b94d-7e17245cc5d9",
  style: {
    container: {
      position: "bottom-right",
    },
  },

  server: {
    endpoint: "http://localhost:3000/api",
    // endpoint: "https://staging.sugarcaneai.dev/api",
    token: "pk-ZSl1A2XLH8AGY5JqkLDDX75BwZmKR7wCYL22Rcr8vVURvYVZ",

    // headers: {
    //   // optional headers, to be sent with each api request
    //   'X-COPILOT-ID': '1234',
    // },
  },

  ai: {
    defaultPromptTemmplate: "pulkit.ag02/recipiess/recipie/0.0.1",
    defaultPromptVariables: {
      "#AGENT_NAME": "Tudy",
    },
    successResponse: "Task Done",
    failureResponse: "I am not able to do this",
  },
};

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

  return <div>Todo</div>;
}
