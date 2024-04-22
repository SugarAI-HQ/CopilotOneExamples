import { resume } from "@/helpers/data";
import {
  CopilotConfigType,
  CopilotProvider,
  VoiceAssistant,
  useCopilot,
} from "@sugar-ai/copilot-one-js";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";

const copilotPackage = "sugar/copilotexample/file-to-action/0.0.2";

// @ts-ignore
let copilotConfig: CopilotConfigType = {
  copilotId: "da82abb5-cf74-448b-b94d-7e17245cc5d9",
  server: {
    endpoint: "https://play.sugarcaneai.dev/api",
    token: "pk-m0j6E8CfMkedk0orAk0gXyALpOZULs3rSiYulaPFXd2rPlin",
  },

  ai: {
    defaultPromptTemplate: copilotPackage,
    // defaultPromptVariables: {
    // },
    welcomeMessage:
      "Hello, I am Foundy. I am here to help you use filling Founder Profile?",
    successResponse: "Task Done",
    failureResponse: "I am not able to do this",
  },
};

const FormApp = () => {
  const { useStateEmbedding, registerAction } = useCopilot();

  const [formData, setFormData] = useState({
    educationHistory: [
      // {
      //   schoolName: "",
      //   degreeName: "",
      //   fieldOfStudy: "",
      //   startDate: "",
      //   endDate: "",
      // },
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
      description: "Add a new college/school education",
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

  const addJobDeails = (
    title: string,
    company: string,
    startDate: string,
    endDate: string,
    currentlyHere: boolean,
    description: string
  ) => {
    const newFormData = { ...formData };
    newFormData.workHistory.push({
      title: title,
      company: company,
      startDate: startDate,
      endDate: endDate,
      currentlyHere: currentlyHere,
      description: description,
    });

    setFormData(newFormData);
  };

  registerAction(
    "addJobDeails",
    {
      name: "addJobDeails",
      description: "Add Job details",
      parameters: [
        {
          name: "title",
          type: "string",
          description: "Job Title at Company",
          required: true,
        },
        {
          name: "company",
          type: "string",
          description: "Name of the company",
          required: true,
        },
        {
          name: "startDate",
          type: "string",
          description: "Start date of Job",
          required: true,
        },
        {
          name: "endDate",
          type: "string",
          description: "End Date of Job",
          required: true,
        },
        {
          name: "currentlyHere",
          type: "boolean",
          description: "Still contunining in the job ?",
          required: true,
        },
        {
          name: "description",
          type: "string",
          description:
            "Job descrption, things you have done and are responsible here",
          required: true,
        },
      ],
    },
    addJobDeails
  );

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
    <div className="container mx-auto p-8 dark:bg-gray-800">
      <div className="mb-8">
        <div className="space-y-12">
<<<<<<< HEAD
          <div className="border-b border-gray-900/10 pb-12">
=======
          <div className="border-b border-gray-900/10">
>>>>>>> 6d1abb4 (Inferecing working)
            <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
              Education History
            </h2>
          </div>
        </div>

        {formData.educationHistory.map((item, index) => (
          <div
            key={index}
            className="mt-10 grid grid-cols-1 gap-x-3 sm:grid-cols-2"
          >
            <div className="sm:col-span-3">
              <label
                htmlFor="schoolName"
<<<<<<< HEAD
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white "
=======
                className="block text-sm font-medium leading-6 text-gray-900 "
>>>>>>> 6d1abb4 (Inferecing working)
              >
                School Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="schoolName"
                  value={item.schoolName}
                  onChange={(e) => handleInputChange(index, e, "education")}
                  placeholder="School Name (Required)"
<<<<<<< HEAD
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-700"
=======
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
>>>>>>> 6d1abb4 (Inferecing working)
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="degreeName"
<<<<<<< HEAD
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white "
=======
                className="block text-sm font-medium leading-6 text-gray-900 "
>>>>>>> 6d1abb4 (Inferecing working)
              >
                Degree Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="degreeName"
                  value={item.degreeName}
                  onChange={(e) => handleInputChange(index, e, "education")}
                  placeholder="Degree Name (Required)"
<<<<<<< HEAD
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-700"
=======
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
>>>>>>> 6d1abb4 (Inferecing working)
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="fieldOfStudy"
<<<<<<< HEAD
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white "
=======
                className="block text-sm font-medium leading-6 text-gray-900 "
>>>>>>> 6d1abb4 (Inferecing working)
              >
                Field of Study
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="fieldOfStudy"
                  value={item.fieldOfStudy}
                  onChange={(e) => handleInputChange(index, e, "education")}
                  placeholder="Field of Study"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-700"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="startDate"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white "
              >
                Start Date
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="startDate"
                  value={item.startDate}
                  onChange={(e) => handleInputChange(index, e, "education")}
                  placeholder="Start Date (Required)"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-700"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="endDate"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white "
              >
                End Date
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="endDate"
                  value={item.endDate}
                  onChange={(e) => handleInputChange(index, e, "education")}
                  placeholder="End Date"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-700"
                />
              </div>
            </div>
            <div className="mt-6 flex items-center justify-start gap-x-3">
              <button
                type="button"
                onClick={() => removeItem(index, "education")}
                className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-red:outline-indigo-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <div className="mt-6 flex items-center justify-start gap-x-3">
          <button
            type="button"
            onClick={(e) => addEducation("", "", "", "", "")}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-indigo:outline-indigo-600"
          >
            Add new
          </button>
        </div>
      </div>

      <VoiceAssistant
        id={"preview"}
        promptTemplate={copilotPackage}
        position={"bottom-center"}
        promptVariables={{ "#AGENT_NAME": "Sugar", "#RESUME": resume }}
        // voiceButtonStyle={{ backgroundColor: "#39f" }}
      ></VoiceAssistant>

      <div className="mb-8">
        <div className="space-y-12">
<<<<<<< HEAD
          <div className="border-b border-gray-900/10 pb-12">
=======
          <div className="border-b border-gray-900/10">
>>>>>>> 6d1abb4 (Inferecing working)
            <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
              Work History
            </h2>
          </div>
        </div>
        {formData.workHistory.map((item, index) => (
          <div
            key={index}
            className="mt-10 grid grid-cols-1 gap-x-3 sm:grid-cols-2"
          >
            <div className="sm:col-span-3">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white "
              >
                Title
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="title"
                  value={item.title}
                  onChange={(e) => handleInputChange(index, e, "work")}
                  placeholder="Title (Required)"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-700"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="company"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white "
              >
                Company
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="company"
                  value={item.company}
                  onChange={(e) => handleInputChange(index, e, "work")}
                  placeholder="Company (Required)"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-700"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="startDate"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white "
              >
                Start Date
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="startDate"
                  value={item.startDate}
                  onChange={(e) => handleInputChange(index, e, "work")}
                  placeholder="Start Date (Required)"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-700"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="endDate"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                End Date
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="endDate"
                  value={item.endDate}
                  onChange={(e) => handleInputChange(index, e, "work")}
                  placeholder="End Date"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-700"
                />
              </div>
            </div>
            <div className="mt-10 space-y-10">
              <div className="relative flex gap-x-3">
                <div className="flex h-6 items-center">
                  <input
                    type="checkbox"
                    name="currentlyHere"
                    checked={item.currentlyHere}
                    onChange={(e) => handleInputChange(index, e, "work")}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <div className="text-sm leading-6">
                  <label
                    htmlFor="currentlyHere"
                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                  >
                    Currently here
                  </label>
                </div>
              </div>
            </div>
            <div className="col-span-full">
              <div className="mt-2">
                <textarea
                  name="description"
                  value={item.description}
                  onChange={(e) => handleInputChange(index, e, "work")}
                  placeholder="Description (Optional)"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-700"
                />
              </div>
            </div>
            <div className="mt-6 flex items-center justify-start gap-x-3">
              <button
                type="button"
                onClick={() => removeItem(index, "work")}
                className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-red:outline-indigo-600 btn-lg"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <div className="mt-6 flex items-center justify-start gap-x-3">
          <button
            type="button"
            onClick={() => addJobDeails("", "", "", "", false, "")}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-indigo:outline-indigo-600"
          >
            Add new
          </button>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-x-3 sm:grid-cols-2 dark:text-white">
        <div className="sm:col-span-1">
          <button className="px-4 py-2 mb-4 border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150 text-lg">
<<<<<<< HEAD
            <span className="pt-0.5 block text-sm font-medium leading-6 text-gray-900 dark:text-white">
              Fill from
            </span>
=======
            <span className="pt-0.5 dark:text-white">Fill from</span>
>>>>>>> 6d1abb4 (Inferecing working)
            <img
              className="w-6 h-6"
              src="https://www.svgrepo.com/show/475661/linkedin-color.svg"
              loading="lazy"
              alt="google logo"
            />
          </button>
        </div>
        <div className="sm:col-span-1">
          <input
            type="file"
            className="text-gray-500 font-medium text-sm bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-indigo-800 file:hover:bg-indigo-700 file:text-white rounded"
          />
        </div>
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
