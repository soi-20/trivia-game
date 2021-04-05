import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";

import "./Quiz.css";

export default function Quiz(props) {
	const [counter, setCounter] = useState(0);
	const [score, setScore] = useState(0);
	const [correct, setCorrect] = useState();
	const [clicked, setClicked] = useState(false);
	const [finished, setFinished] = useState(false);
	const answers = [props.questions[counter].correct_answer, ...props.questions[counter].incorrect_answers].sort();

	const submitAnswers = (e) => {
		if (!clicked) {
			if (e.target.value === props.questions[counter].correct_answer) {
				setScore(score + 1);
				setCorrect(true);
			} else {
				setCorrect(false);
			}
		}

		setClicked(true);
	};

	const nextQuestion = () => {
		if (counter < props.questions.length - 1) {
			setCounter(counter + 1);
		} else {
			setFinished(true);
		}
		setClicked(false);
	};

	return (
		<div className="quizContainer">
			{!finished ? (
				<div className="column2">
					<div className="questionScore">
						<h2 className="questionNum">
							Question:
							<span>
								{counter + 1} / {props.questions.length}
							</span>
						</h2>
						<h2 className="score">
							Score: <span>{score}</span>
						</h2>
					</div>
					<h2 className="question">{ReactHtmlParser(props.questions[counter].question)}</h2>
					<div className="answers">
						{answers.map((item) => {
							return (
								<button className="answer" onClick={(e) => submitAnswers(e)} value={item}>
									{ReactHtmlParser(item)}
								</button>
							);
						})}
					</div>
					{clicked && (
						<div className="rightWrongContainer">
							<h2 className="rightWrong">
								{correct ? (
									<span className="correctAnswer">Correct!</span>
								) : (
									<span className="wrongAnswer">
										Incorrect, the right answer is <span>{ReactHtmlParser(props.questions[counter].correct_answer)}</span>
									</span>
								)}
							</h2>
							<button className="next" onClick={nextQuestion}>
								Next
							</button>
						</div>
					)}
				</div>
			) : (
				<div className="finishedContainer">
					<h2 className="finished">
						<span>
							{score} / {props.questions.length}
						</span>{" "}
						answered correctly.
					</h2>
					<Link to="/">
						<button>Go Home</button>
					</Link>
				</div>
			)}
		</div>
	);
}
