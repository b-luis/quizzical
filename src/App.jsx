import { Start, Questions, QuestionContainer, Button } from "./components";
import { useState, useEffect } from "react";
import { decode } from "html-entities";
import { nanoid } from "nanoid";
import axios from "axios";

const App = () => {
	const [start, setStart] = useState(false);
	const [allQuestions, setAllQuestions] = useState([]);
	const [selectedChoices, setSelectedChoices] = useState({});
	const [answerStatus, setAnswerStatus] = useState({});
	const [check, setCheck] = useState(false);
	const [score, setScore] = useState(0);

	useEffect(() => {
		// Fisher-Yates Algorithm
		function shuffleChoices(arr) {
			const shuffled = [...arr];
			for (let i = shuffled.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
			}
			return shuffled;
		}

		if (allQuestions.length <= 0) {
			async function getQuestions() {
				try {
					const response = await axios.get("https://opentdb.com/api.php?amount=5");
					const data = response.data;
					setAllQuestions(
						data.results.map((item) => ({
							...item,
							questionId: nanoid(),
							question: decode(item.question),
							choices: shuffleChoices([item.correct_answer, ...item.incorrect_answers])
						}))
					);
				} catch (error) {
					console.error("Error fetching questions:", error);
				}
			}
			getQuestions();
		} else {
		}
	}, [allQuestions]);

	const handleChoice = (questionId, choice) => {
		setSelectedChoices((prevChoices) => ({
			...prevChoices,
			[questionId]: {
				selectedAnswer: choice,
				isSelected: true
			}
		}));
	};

	const checkAnswer = () => {
		// todo: display the scores
		// todo: must disable the buttons - resolved

		const updatedStatus = {};
		let totalCorrect = 0;

		allQuestions.forEach((item) => {
			const selectedChoice = selectedChoices[item.questionId].selectedAnswer;
			const isCorrect = selectedChoice === item.correct_answer;
			updatedStatus[item.questionId] = isCorrect ? "correct" : "incorrect";
			if (isCorrect) totalCorrect++;
		});

		setAnswerStatus(updatedStatus);
		// state that watch out when the check answer button is clicked
		setCheck((prevCheck) => !prevCheck);
		setScore((prevScore) => prevScore + totalCorrect);
	};

	// console.log(Object.values(answerStatus).filter((item) => item === "correct").length);

	console.log(score);
	const playAgain = () => {
		setSelectedChoices({});
		setAnswerStatus({});
		setCheck(false);
		setAllQuestions([]);
		setScore(0);
	};

	const btnChild = check ? "Play Again" : "Check Answer";

	return (
		<>
			{start ? (
				<>
					<button
						className="overflow-hidden p-5 text-delft shadow-md hover:bg-slate-200 "
						onClick={() => setStart(!start)}
					>
						Return Home
					</button>
					<QuestionContainer>
						{allQuestions.map((item) => (
							<>
								<h3 className="mt-2 w-[320px]  p-1 text-delft underline decoration-dotted underline-offset-8">
									{item.category}
								</h3>
								<Questions
									key={item.questionId}
									question={item.question}
									choices={item.choices}
									onClick={(choice) => handleChoice(item.questionId, choice)}
									isSelected={selectedChoices[item.questionId]}
									correctAnswer={item.correct_answer}
									answerStatus={answerStatus[item.questionId]}
									isChecked={check}
								/>
							</>
						))}
						{Object.keys(selectedChoices).length < 5 && (
							<p className="py-4 text-red-500">
								Note: Must select one choice each per question to see the results.
							</p>
						)}

						{(check && (
							<div className="flex  flex-row items-center justify-center space-x-4">
								<p className="text-xl font-bold">You scored {score}/5 correct answers </p>{" "}
								<Button onClick={playAgain}>Play Again</Button>
							</div>
						)) || <Button onClick={checkAnswer}>{btnChild}</Button>}
					</QuestionContainer>
				</>
			) : (
				<Start onClick={() => setStart(!start)} />
			)}
		</>
	);
};

export default App;
