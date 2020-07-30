import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactHtmlParser from "react-html-parser";
import { CSSTransition } from "react-transition-group";

import { useForm } from "../../hooks/form-hook";
import { useHttpClient } from "../../hooks/http-hook";
import Button from "../../components/Button";

import "./Forum.css";
import upvotesIcon from "../../assets/upvotes.png";
import answerIcon from "../../assets/answer_icon.png";
import commentIcon from "../../assets/comment_icon.png";

const FAQS = [
  {
    question: "Some question here",
    date: "2020-06-29T18:46:09.182+00:00",
    description: "Description of the question",
    upvotes: [],
    answers: [
      {
        response: {
          reply: "Some Answer",
          date: "2020-06-29T18:46:09.182+00:00",
          upvotes: [],
          comments: [
            {
              comment: " Comment on the answer",
              user: "Name",
            },
            {
              comment: " Comment on the answer",
              user: "Some Name",
            },
          ],
        },
      },
      {
        response: {
          reply: "Another Answer",
          date: "2020-06-29T18:46:09.182+00:00",
          upvotes: [],
          comments: [
            {
              comment: " Comment on the answer",
              user: "Some Name",
            },
            {
              comment: " Comment on the answer",
              user: "Some Other Name",
            },
          ],
        },
      },
    ],
  },
  {
    question: "Some other question here",
    date: "2020-06-29T18:46:09.182+00:00",
    description: "Description of the question",
    upvotes: [],
    answers: [
      {
        response: {
          reply: "Some Answer",
          date: "2020-06-29T18:46:09.182+00:00",
          upvotes: [],
          comments: [
            {
              comment: " Comment on the answer",
              user: "",
            },
            {
              comment: " Comment on the answer",
              user: "",
            },
          ],
        },
      },
      {
        response: {
          reply: "Another Answer",
          date: "2020-06-29T18:46:09.182+00:00",
          upvotes: [],
          comments: [
            {
              comment: " Comment on the answer",
              user: "",
            },
            {
              comment: " Comment on the answer",
              user: "",
            },
          ],
        },
      },
    ],
  },
];

const Forum = (props) => {
  const cid = props.cid;
  const [loadedForum, setLoadedForum] = useState();
  const [isValid, setIsValid] = useState(false);
  const [questionInput, setQuestionInput] = useState("");
  const [questionDescription, setQuestionDescription] = useState("");
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchForum = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/forum/" + cid
        );
        if (!isLoading) setLoadedForum(responseData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchForum();
  }, []);

  const questionInputHandler = (event) => {
    setQuestionInput(event.target.value);
    if (questionDescription.length > 0 && questionDescription.length > 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const descriptionInputHandler = (e, editor) => {
    setQuestionDescription(editor.getData());
    if (questionDescription.length > 0 && questionDescription.length > 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const upvoteAnswerClickHandler = () => {};

  const upvoteQuestionClickHandler = () => {};

  const postCommentClickHandler = () => {};

  const postAnswerClickHandler = () => {};

  const submitHandler = async (event) => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/forum`,
        "POST",
        JSON.stringify({
          question: questionInput,
          date: new Date(),
          description: questionDescription,
          course: cid,
        }),
        {
          "Content-Type": "application/json",
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const CommentListItem = ({ comment, user }) => {
    return (
      <li className="comments-item">
        <h5>-{user}</h5>
        <p>{comment}</p>
      </li>
    );
  };

  const CommentList = ({ comments, show }) => (
    <CSSTransition
      in={show}
      timeout={200}
      classNames="slide-in-top"
      mountOnEnter
      unmountOnExit
    >
      <ul className="comments-list">
        {comments.map((item, i) => (
          <CommentListItem key={i} comment={item.comment} user={item.user} />
        ))}
      </ul>
    </CSSTransition>
  );

  const ListItem = ({ response }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <li className="answers-item">
        <p className="answer-content">{response.reply}</p>
        <div className="answer-upvotes">
          <span className="answer-count">
            {!!response.upvotes.users ? response.upvotes.users.length : 0}{" "}
            Upvotes
          </span>
          <br />
          <Moment className="date-span" format="D MMM YYYY">
            {response.date}
          </Moment>
        </div>
        <br />

        <div>
          <span onClick={upvoteAnswerClickHandler} className="mark-upvotes">
            <img className="upvotes-icon" src={upvotesIcon} /> Upvote
          </span>
          <span onClick={postCommentClickHandler} className="post-comment">
            <img className="upvotes-icon" src={commentIcon} /> Comment
          </span>
          <span
            className="answers-span"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            {response.comments ? response.comments.length : 0} Comments
          </span>
        </div>
        {response.comments && (
          <CommentList show={isOpen} comments={response.comments} />
        )}
      </li>
    );
  };

  const List = ({ answers, show }) => (
    <CSSTransition
      in={show}
      timeout={200}
      classNames="slide-in-top"
      mountOnEnter
      unmountOnExit
    >
      <ul className="answers-list">
        {answers.map((item, i) => (
          <ListItem key={i} response={item.response} />
        ))}
      </ul>
    </CSSTransition>
  );

  const FullListItem = ({ question }) => {
    const [isOpen, setIsOpen] = useState();
    if (!!question) {
      return (
        <li className="question-block">
          <h3>{question.question}</h3>
          <div className="upvotes">
            <span className="count">
              {!!question.upvotes.users ? question.upvotes.users.length : 0}{" "}
              Upvotes
            </span>
            <br />
            <Moment className="date-span" format="D MMM YYYY">
              {question.date}
            </Moment>
          </div>
          <p className="question-description">
            {ReactHtmlParser(question.description)}
          </p>

          <div>
            <span onClick={upvoteQuestionClickHandler} className="mark-upvotes">
              <img className="upvotes-icon" src={upvotesIcon} /> Upvote
            </span>
            <span onClick={postAnswerClickHandler} className="post-comment">
              <img className="upvotes-icon" src={answerIcon} /> Answer
            </span>
            <span
              className="answers-span"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              {question.answers ? question.answers.length : 0} Answers
            </span>
          </div>
          
          {question.answers && (
            <List show={isOpen} answers={question.answers} />
          )}
        </li>
      );
    }
    return null;
  };

  const FullList = ({ items }) => {
    if (items.length > 0) {
      return (
        <ul className="questions-list">
          {items.map((item, i) => (
            <FullListItem key={i} question={item} />
          ))}
        </ul>
      );
    }
    return null;
  };

  return (
    <div className="forum-container">
      <h2>Ask A Question</h2>
      <input
        placeholder="Question"
        className="question-input"
        onChange={questionInputHandler}
      />
      <h3>Describe your question</h3>
      <CKEditor
        className="description-input"
        editor={ClassicEditor}
        onChange={descriptionInputHandler}
      />
      <br />
      <Button
        disabled={!isValid}
        className="ask-button"
        onClick={submitHandler}
      >
        Ask
      </Button>
      {/* {loadedForum && <FullList items={loadedForum} />} */}
      {FAQS && <FullList items={FAQS} />}
    </div>
  );
};

export default Forum;
