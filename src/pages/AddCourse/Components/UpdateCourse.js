import React, { useEffect, useState, Fragment } from "react";
import { useParams, useHistory } from "react-router-dom";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import "./UpdateCourse.css";
import { useHttpClient } from "../../../hooks/http-hook";
import Modal from "../../../components/Modal";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../../util/validators";
import { useForm } from "../../../hooks/form-hook";

const UpdateCourse = () => {
  const [loadedTechnologies, setLoadedTechnologies] = useState();
  const [loadedInstructors, setLoadedInstructors] = useState();
  const [selectedInstructor, setSelectedInstructor] = useState();
  const [selectedTechnology, setSelectedTechnology] = useState();
  const [loadedCourse, setLoadedCourse] = useState();
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
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      instructor: {
        value: "",
        isValid: false,
      },
      duration: {
        value: "",
        isValid: false,
      },
      isLive: {
        value: "",
        isValid: false,
      },
      startDate: {
        value: "",
        isValid: false,
      },
      keyFeatures: {
        value: "",
        isValid: false,
      },
      whotoLearn:{
        value:"",
        isValid: false,
      },
      tools:{
        value:"",
        isValid: false,
      }
    },
    false
  );

  let { cid } = useParams();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/courses/" + cid
        );
        setLoadedCourse(responseData);
        setFormData(
          {
            title: {
              value: responseData.title,
              isValid: true,
            },
            fee: {
              value: responseData.fee,
              isValid: true,
            },
            instructor: {
              value: responseData.instructor,
              isValid: true,
            },
            duration: {
              value: responseData.duration,
              isValid: true,
            },
            isLive: {
              value: responseData.isLive,
              isValid: true,
            },
            startDate: {
              value: responseData.startDate,
              isValid: true,
            },
            keyFeatures: {
              value: responseData.keyFeatures,
              isValid: true,
            },
            whotoLearn: {
              value: responseData.whotoLearn,
              isValid: true ,
            },
            tools: {
              value: responseData.tools,
              isValid: true,
            }
          },
          true
        );
        setIsLive(responseData.isLive);
        setEditorState(responseData.description);
      } catch (err) {
        console.log(err);
      }
    };

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
          name: responseData[0].name,
          id: responseData[0]._id,
        });
      } catch (err) {
        console.log(err);
      }
    };
    
    fetchAllInstructors();
    fetchAllTechnologies();
    fetchCourse();
  }, []);

  const history = useHistory();

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(formState.inputs); // send this to the backend!
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/courses/${cid}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          fee: formState.inputs.fee.value,
          description: editorState,
          technology: selectedTechnology,
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

      history.push("/EditCourse");
    } catch (err) {
      console.log(err);
    }
  };

  const techSelectHandler = (event) => {
    setSelectedTechnology(event.target.value);
  };

  // const editSyllabusHandler = () => {
  //   history.push("/AddSyllabus/" + loadedCourse._id);
  // };

  const instructorSelectHandler = (event) => {
    setSelectedInstructor(event.target.value);
  };

  const liveChangeHandler = (event) => {
    setIsLive(prevIsLive => !prevIsLive);
  };
  
  const descriptionInputHandler = (e, editor) => {
    setEditorState(editor.getData());
  };

  return (
    <div className="body">
      <Modal error={error} clearError={clearError} />
      {isLoading && <LoadingSpinner />}
      {loadedCourse && (
        <div className="form-container">
          <form className="form" onSubmit={submitHandler}>
            {isLoading && <LoadingSpinner asOverlay />}
            <Input
              id="title"
              element="input"
              type="text"
              label="Title"
              initialValue={loadedCourse.title}
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid title."
              onInput={inputHandler}
            />
            <Input
              id="fee"
              element="input"
              label="Fee"
              initialValue={loadedCourse.fee}
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
                onChange={descriptionInputHandler}
                data={loadedCourse.description}
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
              id="duration"
              element="input"
              label="Duration (Hours)"
              initialValue={loadedCourse.duration}
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid course duration (in Hours)."
              onInput={inputHandler}
            />
            <input
              id="isLive"
              type="checkbox"
              name="isLive"
              checked={isLive}
              onChange={liveChangeHandler}
            />
            <label for="isLive">Is Course Live</label>
            <Input
              id="startDate"
              element="input"
              label="Start Date"
              initialValue={loadedCourse.startDate}
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid starting date."
              onInput={inputHandler}
            />
            <Input
              id="keyFeatures"
              //element="input"
              label="Key Features"
              initialValue={loadedCourse.keyFeatures.map(p=>p.keyFeatures)}
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter valid key features."
              onInput={inputHandler}
            />
            <Input
            id="whotoLearn"
            //element="input"
            label="Who to Learn"
            initialValue={loadedCourse.whotoLearn.map(p=>p.whotoLearn)}
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter valid content."
            onInput={inputHandler}
          /> 
          <Input
          id="tools"
          //element="input"
          label="Tools and Programming Language"
          initialValue={loadedCourse.tools.map(p=>p.tools)}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter valid tools."
          onInput={inputHandler}
        />
            <Button type="submit">Update Course</Button>
            <Button to={`/AddSyllabus/${loadedCourse._id}`}>Edit Syllabus</Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateCourse;
