import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Quiz from "./components/Quiz";
import "./App.css";

function App() {
	const [questions, setQuestions] = useState();
	const [questionsNum, setQuestionsNum] = useState(10);
	const [category, setCategory] = useState("any");
	const [difficulty, setDifficulty] = useState("any");
	const [answerType, setAnswerType] = useState("any");

	let query = `https://opentdb.com/api.php?amount=${questionsNum}${category !== "any" && "&category=" + category}${
		difficulty !== "any" && "&difficulty=" + difficulty
	}${answerType !== "any" && "&type=" + answerType}`;

	query = query.replace(/false/gm, "");

	useEffect(() => {
		fetch("https://opentdb.com/api.php?amount=10")
			.then((res) => res.json())
			.then((data) => setQuestions(data.results));
	}, []);

	const startGame = () => {
		fetch(query)
			.then((res) => res.json())
			.then((data) => setQuestions(data.results));
	};

	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<div className="App">
						<h1>Wild Trivia</h1>
						<div className="optionsContainer">
							<div className="column">
								<label for="trivia_amount">Number of Questions (50 Max):</label>
								<input
									className="input"
									onChange={(e) => setQuestionsNum(e.target.value)}
									type="number"
									name="trivia_amount"
									min="1"
									value={questionsNum}
									max="50"
								/>
							</div>

							<div className="column">
								<label for="trivia_category">Select Category: </label>
								<select onChange={(e) => setCategory(e.target.value)} className="input" name="trivia_category">
									<option value="any">Any Category</option>
									<option value="9">General Knowledge</option>
									<option value="10">Entertainment: Books</option>
									<option value="11">Entertainment: Film</option>
									<option value="12">Entertainment: Music</option>
									<option value="13">Entertainment: Musicals &amp; Theatres</option>
									<option value="14">Entertainment: Television</option>
									<option value="15">Entertainment: Video Games</option>
									<option value="16">Entertainment: Board Games</option>
									<option value="17">Science &amp; Nature</option>
									<option value="18">Science: Computers</option>
									<option value="19">Science: Mathematics</option>
									<option value="20">Mythology</option>
									<option value="21">Sports</option>
									<option value="22">Geography</option>
									<option value="23">History</option>
									<option value="24">Politics</option>
									<option value="25">Art</option>
									<option value="26">Celebrities</option>
									<option value="27">Animals</option>
									<option value="28">Vehicles</option>
									<option value="29">Entertainment: Comics</option>
									<option value="30">Science: Gadgets</option>
									<option value="31">Entertainment: Japanese Anime &amp; Manga</option>
									<option value="32">Entertainment: Cartoon &amp; Animations</option>{" "}
								</select>
							</div>
							<div className="column">
								<label for="trivia_difficulty">Select Difficulty: </label>

								<select onChange={(e) => setDifficulty(e.target.value)} className="input" name="trivia_difficulty">
									<option value="any">Any Difficulty</option>
									<option value="easy">Easy</option>
									<option value="medium">Medium</option>
									<option value="hard">Hard</option>
								</select>
							</div>
							<div className="column">
								<label for="trivia_type">Select Type: </label>

								<select onChange={(e) => setAnswerType(e.target.value)} className="input" name="trivia_type">
									<option value="any">Any Type</option>
									<option value="multiple">Multiple Choice</option>
									<option value="boolean">True / False</option>
								</select>
							</div>
						</div>
						<Link to="quiz">
							<button onClick={startGame} className="startBtn">
								Start
							</button>
						</Link>
					</div>
				</Route>
				<Route path="/quiz">
					<Quiz questions={questions} />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
