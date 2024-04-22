import {
  CopilotConfigType,
  CopilotProvider,
  VoiceAssistant,
  useCopilot,
} from "@sugar-ai/copilot-one-js";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";

const copilotPackage = "sugar/copilotexample/todoexample/0.0.1";

// @ts-ignore
let copilotConfig: CopilotConfigType = {
  copilotId: "da82abb5-cf74-448b-b94d-7e17245cc5d9",
  server: {
    endpoint: "https://play.sugarcaneai.dev/api",
    token: "pk-m0j6E8CfMkedk0orAk0gXyALpOZULs3rSiYulaPFXd2rPlin",
  },

  // ai: {
  //   defaultPromptTemplate: copilotPackage,
  //   defaultPromptVariables: {
  //     "#AGENT_NAME": "Tudy",
  //   },
  //   welcomeMessage:
  //     "Hello, I am Tudy. I am here to help you use this todo App. What would you like to do?",
  //   successResponse: "Task Done",
  //   failureResponse: "I am not able to do this",
  // },
};

const FormApp = () => {
  const { useStateEmbedding, registerAction } = useCopilot();

  const [formData, setFormData] = useState({
    educationHistory: [
      {
        schoolName: "",
        degreeName: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
      },
    ],
    workHistory: [
      {
        title: "",
        company: "",
        startDate: "",
        endDate: "",
        currentlyHere: false,
        description: "",
      },
    ],
  });

  const handleInputChange = (index, event, type) => {
    const { name, value, checked, type: inputType } = event.target;
    const newFormData = { ...formData };
    if (type === "education") {
      newFormData.educationHistory[index][name] = value;
    } else {
      if (inputType === "checkbox") {
        newFormData.workHistory[index][name] = checked;
      } else {
        newFormData.workHistory[index][name] = value;
      }
    }
    setFormData(newFormData);
  };

  const addEducation = (
    schoolName: string,
    degreeName: string,
    fieldOfStudy: string,
    startDate: string,
    endDate: string
  ) => {
    const newFormData = { ...formData };
    newFormData.educationHistory.push({
      schoolName: schoolName,
      degreeName: degreeName,
      fieldOfStudy: fieldOfStudy,
      startDate: startDate,
      endDate: endDate,
    });

    setFormData(newFormData);
  };

  registerAction(
    "addEducation",
    {
      name: "addEducation",
      description: "Add a new education",
      parameters: [
        {
          name: "schoolName",
          type: "string",
          description: "School Name",
          required: true,
        },
        {
          name: "degreeName",
          type: "string",
          description: "Degree of Study",
          required: true,
        },
        {
          name: "fieldOfStudy",
          type: "string",
          description: "field of study",
          required: true,
        },
        {
          name: "startDate",
          type: "string",
          description: "Start date of study",
          required: true,
        },
        {
          name: "endDate",
          type: "string",
          description: "End Date of study",
          required: true,
        },
      ],
    },
    addEducation
  );

  const addWork = (e: any) => {
    const newFormData = { ...formData };
    newFormData.workHistory.push({
      title: "",
      company: "",
      startDate: "",
      endDate: "",
      currentlyHere: false,
      description: "",
    });
    setFormData(newFormData);
  };

  const removeItem = (index, type) => {
    const newFormData = { ...formData };
    if (type === "education") {
      newFormData.educationHistory.splice(index, 1);
    } else {
      newFormData.workHistory.splice(index, 1);
    }
    setFormData(newFormData);
  };

  function FileToAction() {}

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Education History</h2>
        {formData.educationHistory.map((item, index) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              name="schoolName"
              value={item.schoolName}
              onChange={(e) => handleInputChange(index, e, "education")}
              placeholder="School Name (Required)"
              className="border border-gray-300 rounded px-4 py-2 mb-2 w-full"
            />
            <input
              type="text"
              name="degreeName"
              value={item.degreeName}
              onChange={(e) => handleInputChange(index, e, "education")}
              placeholder="Degree Name (Required)"
              className="border border-gray-300 rounded px-4 py-2 mb-2 w-full"
            />
            <input
              type="text"
              name="fieldOfStudy"
              value={item.fieldOfStudy}
              onChange={(e) => handleInputChange(index, e, "education")}
              placeholder="Field of Study"
              className="border border-gray-300 rounded px-4 py-2 mb-2 w-full"
            />
            <input
              type="text"
              name="startDate"
              value={item.startDate}
              onChange={(e) => handleInputChange(index, e, "education")}
              placeholder="Start Date (Required)"
              className="border border-gray-300 rounded px-4 py-2 mb-2 w-full"
            />
            <input
              type="text"
              name="endDate"
              value={item.endDate}
              onChange={(e) => handleInputChange(index, e, "education")}
              placeholder="End Date"
              className="border border-gray-300 rounded px-4 py-2 mb-2 w-full"
            />
            <button
              onClick={() => removeItem(index, "education")}
              className="bg-red-500 text-white px-4 py-2 rounded mr-2"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={(e) => addEducation("", "", "", "", "")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add new
        </button>
      </div>

      <VoiceAssistant
        id={"preview"}
        promptTemplate={copilotPackage}
        position={"bottom-center"}
        // promptVariables={{ "#AGENT_NAME": "Tudy" }}
        // voiceButtonStyle={{ backgroundColor: "#39f" }}
      ></VoiceAssistant>

      <div>
        <h2 className="text-lg font-semibold mb-4">Work History</h2>
        {formData.workHistory.map((item, index) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              name="title"
              value={item.title}
              onChange={(e) => handleInputChange(index, e, "work")}
              placeholder="Title (Required)"
              className="border border-gray-300 rounded px-4 py-2 mb-2 w-full"
            />
            <input
              type="text"
              name="company"
              value={item.company}
              onChange={(e) => handleInputChange(index, e, "work")}
              placeholder="Company (Required)"
              className="border border-gray-300 rounded px-4 py-2 mb-2 w-full"
            />
            <input
              type="text"
              name="startDate"
              value={item.startDate}
              onChange={(e) => handleInputChange(index, e, "work")}
              placeholder="Start Date (Required)"
              className="border border-gray-300 rounded px-4 py-2 mb-2 w-full"
            />
            <input
              type="text"
              name="endDate"
              value={item.endDate}
              onChange={(e) => handleInputChange(index, e, "work")}
              placeholder="End Date"
              className="border border-gray-300 rounded px-4 py-2 mb-2 w-full"
            />
            <label className="flex items-center mb-2">
              <input
                type="checkbox"
                name="currentlyHere"
                checked={item.currentlyHere}
                onChange={(e) => handleInputChange(index, e, "work")}
                className="mr-2"
              />
              Currently here
            </label>
            <textarea
              name="description"
              value={item.description}
              onChange={(e) => handleInputChange(index, e, "work")}
              placeholder="Description (Optional)"
              className="border border-gray-300 rounded px-4 py-2 mb-2 w-full"
            ></textarea>
            <button
              onClick={() => removeItem(index, "work")}
              className="bg-red-500 text-white px-4 py-2 rounded mr-2"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={() => addNewItem("work")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add new
        </button>
      </div>

      <div>
        <button> Fill from Linkedin</button>
        <button> Upload Resume</button>
      </div>
    </div>
  );
};

const Form: NextPage = () => {
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
      <FormApp />
    </CopilotProvider>
  );
};
export default Form;
