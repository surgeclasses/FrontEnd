import React, { useContext } from "react";
// import "./DemoClass.css";
import "./BecomeInstructor.css";
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

const BecomeInstructor = () => {
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
      compName: {
        value: "",
        isValid: false,
      },
      skills: {
        value: "",
        isValid: false,
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
        `${process.env.REACT_APP_BACKEND_URL}/becomeInstructor`,
        "POST",
        JSON.stringify({
          fullName: formState.inputs.fullName.value,
          email: formState.inputs.email.value,
          mobile: formState.inputs.mobile.value,
          compName: formState.inputs.compName.value,
          skills: formState.inputs.skills.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      alert(
        "Thankyou for contacting us. We will soon give you update regarding Your Interest of becoming a Instructor"
      );

      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div class="container register">
      <div class="row">
        <div class="register-left">
          <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
          <h3>Welcome</h3>
          <br/>
          <br/>
          <h1 className="BecomeIntructor-h1">Become a Instructor</h1>
          <p className="BecomeIntructor-p">Join our team of Instructors</p>
        </div>
        <div class="register-right">
              <h3 class="register-heading">Apply for Becoming Our Part</h3>
              <form className="becomeInstructor-form" onSubmit={submitHandler}>
                <div class="flex-Parent">
                  <div class="flexChild">
                    <div class="form-group">
                      <Input
                        id="fullName"
                        type="text"
                        element="input"
                        label="Your Name *"
                        validators={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandler}
                        className="form-demoInstructor"
                        value=""
                      />
                    </div>
                    <div class="form-group">
                      <Input
                        type="email"
                        label="Your Email *"
                        id="email"
                        validators={[VALIDATOR_EMAIL()]}
                        element="input"
                        onInput={inputHandler}
                        className="form-demoInstructor"
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
                        validators={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandler}
                        className="form-demoInstructor"
                      />
                    </div>
                  </div>
                  <div class="flexChild">
                  <div class="form-group">
                      <Input
                        id="compName"
                        type="text"
                        element="input"
                        label="Your Company Name *"
                        value=""
                        validators={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandler}
                        className="form-demoInstructor"
                      />
                    </div>
                    <div class="form-group">
                      <Input
                        id="skills"
                        type="text"
                        label="Skills*"
                        value=""
                        validators={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandler}
                        className="textarea-skill"
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
              
          </div>
        </div>
      
    </div>
  );
};

export default BecomeInstructor;
