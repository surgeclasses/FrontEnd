import React from "react";
import { useHistory } from "react-router-dom";

import { useHttpClient } from "../../hooks/http-hook";
import Input from "../../components/Input";
import Button from "../../components/Button";
import LoadingSpinner from "../../components/LoadingSpinner";
import Modal from "../../components/Modal";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
} from "../../util/validators";
import { ImPhone, ImLocation, ImMail2 } from "react-icons/im";
import { BsCaretRightFill } from "react-icons/bs";
import { useForm } from "../../hooks/form-hook";
import "./Contact.css";

const Contact = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler, setFormData] = useForm(
    {
      first_name: {
        value: "",
        isValid: false,
      },
      last_name: {
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
      query: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const history = useHistory();

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(formState.inputs); // send this to the backend!
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/contact`,
        "POST",
        JSON.stringify({
          first_name: formState.inputs.first_name.value,
          last_name: formState.inputs.last_name.value,
          email: formState.inputs.email.value,
          mobile: formState.inputs.mobile.value,
          query: formState.inputs.query.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      // history.push("/");
      setFormData(
        {
          first_name: {
            value: "",
            isValid: false,
          },
          last_name: {
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
          query: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div class="flex-container ">
      <div class="flex-child">
        <form className="contactForm" onSubmit={submitHandler}>
          {isLoading && <LoadingSpinner asOverlay />}
          <React.Fragment>
            <div className="nameInOneLine">
              <Input
                id="first_name"
                type="text"
                element="input"
                label="First Name"
                errorText="Enter a valid Name"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                className="textArea-Name"
              />
              <Input
                id="last_name"
                type="text"
                element="input"
                label="Last Name"
                errorText="Enter a valid Name"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                className="textArea-Name"
              />
            </div>
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
              validators={
                ([VALIDATOR_MINLENGTH(10)], [VALIDATOR_MAXLENGTH(10)])
              }
              onInput={inputHandler}
              className="textArea-Field"
            />
            <Input
              id="query"
              type="text"
              label="Your Query"
              errorText="Enter a valid Detail"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
              className="textArea-Field"
            />
          </React.Fragment>
          <Button type="submit" disabled={!formState.isValid}>
            Send Query
          </Button>
        </form>

        {/*
          <div className="contact-info">
            <h3 className="contactInfo-heading"> Contact Information</h3>
            <br/>
            <p>
              <div className="contactInfo-block">
                <ImLocation /> 
                <div className="contactInfo-Text">No. 15, 25Th A Main, Mariswamy Layout<br/> Agara, HSR Layout, Sector - 1 <br/>Bengaluru </div>
                </div>
              </p>
              <br/>
              <p>
              <div className="contactInfo-block">
                <ImPhone /> <div className="contactInfo-Text">+91 9014089189 </div>
                </div>
              </p>
              <br/>
              <p>
              <div className="contactInfo-block">
                <ImMail2 /> <div className="contactInfo-Text">surgeclasses2020@gmail.com </div>
                </div>
              </p>
              <br/>
          </div>
      
*/}
      </div>
      <div class="flex-child infoSection" className="css-infosection">
        {/*}
            <h1 className="css-h1"> How Can We Help?</h1>
            <h2 className="css-h2"> 
              {" "}
              Please select a topic below related to your inquiry. If you don’t
              find what you need, fill out our contact form.
            </h2>
            <br/>
*/}
        <div className="css-Features">
        <div className="css-outerFeature">
          <div className="css-inerFeature">
            <h3 className="css-h3"> Register for a Demo </h3>
            <br />
            <p className="css-para">
              {" "}
              Register for a demo of one of our programs.{" "}
            </p>
          </div>
          <BsCaretRightFill className="css-caret" />
        </div>
        <br />
        <hr />
        <br />
        <div className="css-outerFeature">
          <div className="css-inerFeature">
            <h3 className="css-h3"> Become a Instructor </h3>
            <br />
            <p className="css-para"> Join our team of Instructors </p>
          </div>
          <BsCaretRightFill className="css-caret" />
        </div>
        </div>

        <div className="contact-info">
          <h3 className="contactInfo-heading"> Contact Information</h3>
          <br />
          <p>
            <div className="contactInfo-block">
              <ImLocation />
              <div className="contactInfo-Text">
                No. 15, 25Th A Main, Mariswamy Layout
                <br /> Agara, HSR Layout, Sector - 1 <br />
                Bengaluru{" "}
              </div>
            </div>
          </p>
          <br />
          <p>
            <div className="contactInfo-block">
              <ImPhone />{" "}
              <div className="contactInfo-Text">+91 9014089189 </div>
            </div>
          </p>
          <br />
          <p>
            <div className="contactInfo-block">
              <ImMail2 />{" "}
              <div className="contactInfo-Text">
                surgeclasses2020@gmail.com{" "}
              </div>
            </div>
          </p>
          <br />
        </div>
      </div>
    </div>
  );
};

export default Contact;
