import React, { useContext } from "react";
import "./DemoClass.css";

import { useHistory } from "react-router-dom";
import { useHttpClient } from "../../../hooks/http-hook";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import LoadingSpinner from "../../../components/LoadingSpinner";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_MAXLENGTH,
} from "../../../util/validators";
import { useForm } from "../../../hooks/form-hook";
import BodyClassName from "react-body-classname";

const DemoClass = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      fullName: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      mobile: {
        value: "",
        isValid: false,
      },
      courseName: {
        value: "",
        isValid: false,
      },
      collegeName: {
        value: "",
        isValid: false,
      },
      message: {
        value: "‎‎‎",
        isValid: true,
      },
    },
    false
  );

  const history = useHistory();

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(formState.inputs); // send this to the backend for Registering Demo Class
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/demoClass`,
        "POST",
        JSON.stringify({
          fullName: formState.inputs.fullName.value,
          email: formState.inputs.email.value,
          mobile: formState.inputs.mobile.value,
          courseName: formState.inputs.courseName.value,
          collegeName: formState.inputs.collegeName.value,
          message: formState.inputs.message.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      alert(
        "Thankyou for contacting us. We will soon give you update regarding demo classes"
      );

      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <BodyClassName className="DemoClass-Body">
      <div className="DemoClass-outerBox">
        <div class="DemoClass-form">
          {isLoading && <LoadingSpinner asOverlay />}
          <div class="DemoClass-image">
            <img
              src="https://image.ibb.co/kUagtU/rocket_contact.png"
              alt="rocket_contact"
            />
          </div>
          <h3>Drop Us a Message</h3>
          <form className="demoClass" onSubmit={submitHandler}>
            <div class="flexParent-demoClass">
              <div class="flexChild-demoClass">
                <div class="form-group">
                  <Input
                    id="fullName"
                    type="text"
                    element="input"
                    label="Your Name *"
                    errorText="Enter a valid Full Name"
                    validators={[VALIDATOR_REQUIRE()]}
                    onInput={inputHandler}
                    className="form-control"
                    value=""
                  />
                </div>
                <div class="form-group">
                  <Input
                    type="email"
                    label="Your Email *"
                    id="email"
                    errorText="Enter a valid Email"
                    validators={[VALIDATOR_EMAIL()]}
                    element="input"
                    onInput={inputHandler}
                    className="form-control"
                    value=""
                  />
                </div>
                <div class="form-group">
                  <Input
                    id="mobile"
                    type="text"
                    element="input"
                    label="Your Phone Number *"
                    value=""
                    errorText="Enter a valid Mobile Number"
                    validators={
                      ([VALIDATOR_MINLENGTH(10)], [VALIDATOR_MAXLENGTH(10)])
                    }
                    onInput={inputHandler}
                    className="form-control"
                  />
                </div>
                <div class="form-group">
                  <Input
                    id="courseName"
                    type="text"
                    element="input"
                    label="Desired Course Name *"
                    value=""
                    errorText="Enter a valid Course Name"
                    validators={[VALIDATOR_REQUIRE()]}
                    onInput={inputHandler}
                    className="form-control"
                  />
                </div>
              </div>
              <div class="flexChild-demoClass">
                <div class="form-group">
                  <Input
                    id="collegeName"
                    type="text"
                    element="input"
                    label="Your College Name *"
                    value=""
                    errorText="Enter a valid College Name"
                    validators={[VALIDATOR_REQUIRE()]}
                    onInput={inputHandler}
                    className="form-control"
                  />
                </div>
                <div class="form-group">
                  <Input
                    id="message"
                    type="text"
                    label="Message"
                    value=""
                    errorText="Enter a valid Message"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    onInput={inputHandler}
                    className="textarea-message"
                  />
                </div>
              </div>
            </div>
            <Button
              type="submit"
              disabled={!formState.isValid}
              className="btnContact"
            >
              Send Message
            </Button>
          </form>
          {/* <form className="demoClass" onSubmit={submitHandler}>
        <React.Fragment>
          <Input
            id="fullName"
            type="text"
            element="input"
            label="Your Name"
            errorText="Enter a valid Full Name"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            className="textArea-Name"
          />
          <Input
            type="email"
            label="Email"
            id="email"
            errorText="Enter a valid Email"
            validators={[VALIDATOR_EMAIL()]}
            element="input"
            onInput={inputHandler}
            className="textArea-Field"
          />
          <Input
            id="mobile"
            type="text"
            element="input"
            label="Mobile"
            errorText="Enter a valid Mobile Number"
            validators={([VALIDATOR_MINLENGTH(10)], [VALIDATOR_MAXLENGTH(10)])}
            onInput={inputHandler}
            className="textArea-Field"
          />
          <Input
            id="courseName"
            type="text"
            label="Desired Course Name"
            errorText="Enter a valid Course Name"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            className="textArea-Field"
          />
        </React.Fragment>
        
      </form> */}
        </div>
      </div>
    </BodyClassName>
  );
};

export default DemoClass;
