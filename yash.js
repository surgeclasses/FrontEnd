import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useHttpClient } from "../../hooks/http-hook";
import Input from "../../components/Input";
import Button from "../../components/Button";
import LoadingSpinner from "../../components/LoadingSpinner";
import Modal from "../../components/Modal";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../util/validators";
import { useForm } from "../../hooks/form-hook";
import "./AddCourse.css";

const AddCourse = () => {
  const [loadedTechnologies, setLoadedTechnologies] = useState();
  const [loadedInstructors, setLoadedInstructors] = useState();
  const [selectedTechnology, setSelectedTechnology] = useState();
  const [selectedInstructor, setSelectedInstructor] = useState();
  const [isLive, setIsLive] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [editorState, setEditorState] = useState();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      fee: {
        value: 0,
        isValid: false,
      },
      instructor: {
        value: {
          name: "",
          id: "",
        },
        isValid: false,
      },
      duration: {
        value: 0,
        isValid: false,
      },
      isLive: {
        value: false,
        isValid: true,
      },
      startDate: {
        value: "",
        isValid: false,
      },
      keyFeatures: {
        value: "",
        isValid: false,
      },
      whotoLearn: {
        value: "",
        isValid: false,
      },
      tools: {
        value: "",
        isValid: false,
      },
      
    },
    false
  );

  const descriptionInputHandler = (e, editor) => {
    setEditorState(editor.getData());
  };

  useEffect(() => {
    const fetchAllTechnologies = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/technologies"
        );
        setLoadedTechnologies(responseData);
        setSelectedTechnology(responseData[0]._id);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchAllInstructors = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/instructor"
        );
        setLoadedInstructors(responseData);
        setSelectedInstructor({
          name: responseData.name,
          id: responseData[0]._id,
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllInstructors();
    fetchAllTechnologies();
  }, [selectedInstructor, selectedTechnology]);

  const history = useHistory();

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/courses`,
        "POST",
        JSON.stringify({
          title: formState.inputs.title.value,
          fee: formState.inputs.fee.value,
          technology: selectedTechnology,
          description: editorState,
          instructor: selectedInstructor,
          duration: formState.inputs.duration.value,
          isLive: isLive,
          startDate: formState.inputs.startDate.value,
          keyFeatures: formState.inputs.keyFeatures.value,
          whotoLearn: formState.inputs.whotoLearn.value,
          tools: formState.inputs.tools.value,


        }),
        {
          "Content-Type": "application/json",
        }
      );

      history.push("/AddCourse");
    } catch (err) {
      console.log(err);
    }
  };

  const techSelectHandler = (event) => {
    setSelectedTechnology(event.target.value);
  };

  const instructorSelectHandler = (event) => {
    setSelectedInstructor(event.target.value);
  };

  const liveChangeHandler = (event) => {
    setIsLive(event.target.checked);
  };

  return (
    <div className="body">
      <h1 className="center">Add A New Course</h1>
      <Modal error={error} onClear={clearError} />
      <div className="form-container">
        <form className="form" onSubmit={submitHandler}>
          {isLoading && <LoadingSpinner asOverlay />}
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            initialValue=""
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
          />
          <Input
            id="fee"
            element="input"
            label="Fee"
            initialValue=""
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid course fee."
            onInput={inputHandler}
          />
          <select
            className="selector"
            onChange={techSelectHandler}
            name="technology"
            id="technology"
          >
            {loadedTechnologies &&
              loadedTechnologies.map((technology) => {
                return (
                  <option value={technology._id}>{technology.title}</option>
                );
              })}
          </select>
          <h4 className="center">Description</h4>
          <div className="editor">
            <CKEditor
              editor={ClassicEditor}
              initialValue=""
              onChange={descriptionInputHandler}
            />
          </div>
          <select
            className="selector"
            onChange={instructorSelectHandler}
            name="instructor"
            id="instructor"
          >
            {loadedInstructors &&
              loadedInstructors.map((instructor) => {
                return (
                  <option
                    value={{ name: instructor.name, id: instructor._id }}
                  >
                    {instructor.name}
                  </option>
                );
              })}
          </select>
          <Input
            id="instructor"
            element="input"
            label="Instructor"
            initialValue=""
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid instructor name."
            onInput={inputHandler}
          />
          <Input
            id="duration"
            element="input"
            label="Duration (Hours)"
            initialValue=""
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid course duration (in Hours)."
            onInput={inputHandler}
          />
          <input
            id="isLive"
            type="checkbox"
            name="isLive"
            onChange={liveChangeHandler}
          />
          <label for="isLive">Is Course Live</label>
          <Input
            id="startDate"
            element="input"
            label="Start Date"
            initialValue=""
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid starting date."
            onInput={inputHandler}
          />
          <Input
              id="keyFeatures"
              element="input"
              label="Key Features"
              initialValue=""
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter valid key features."
              onInput={inputHandler}
            />
            <Input
            id="whotoLearn"
            element="input"
            label="Who to Learn"
            initialValue=""
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter valid content."
            onInput={inputHandler}
          /> 
          <Input
          id="tools"
          element="input"
          label="Tools and Programming Language"
          initialValue=""
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter valid tools."
          onInput={inputHandler}
        />
          <Button type="submit" disabled={!formState.isValid}>
            ADD COURSE
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
