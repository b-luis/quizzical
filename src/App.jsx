import { Intro, Questions, QuestionContainer, Button, Return } from "./components";
import { useState, useEffect } from "react";
import { decode } from "html-entities";
import { nanoid } from "nanoid";
import axios from "axios";

const App = () => {
	// State variables
	const [start, setStart] = useState(false);
	const [allQuestions, setAllQuestions] = useState([]);
	const [selectedChoices, setSelectedChoices] = useState({});
	const [answerStatus, setAnswerStatus] = useState({});
	const [check, setCheck] = useState(false);
	const [score, setScore] = useState(0);

	// Fetch questions on initial load
	useEffect(() => {
		// Fisher-Yates Algorithm for shuffling choices
		function shuffleChoices(arr) {
			const shuffled = [...arr];
			for (let i = shuffled.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
			}
			return shuffled;
		}

		// Fetch questions only if not fetched before
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

	// Function to check answers
	const checkAnswer = () => {
		const updatedStatus = {};
		let totalCorrect = 0;

		allQuestions.forEach((item) => {
			const selectedChoice = selectedChoices[item.questionId].selectedAnswer;
			const isCorrect = selectedChoice === item.correct_answer;
			updatedStatus[item.questionId] = isCorrect ? "correct" : "incorrect";
			if (isCorrect) totalCorrect++;
		});

		// Update answer status, check state, and score state
		setAnswerStatus(updatedStatus);
		setCheck((prevCheck) => !prevCheck); // will update when the "Check Answers" is clicked
		setScore((prevScore) => prevScore + totalCorrect);
	};

	// FOR DEBUGGING
	// console.log(Object.values(answerStatus).filter((item) => item === "correct").length);

	// Function to reset the game
	const playAgain = () => {
		setSelectedChoices({});
		setAnswerStatus({});
		setCheck(false);
		setAllQuestions([]);
		setScore(0);
	};

	const btnChild = check ? "Play Again" : "Check Answer";
	const displayQuestions = allQuestions.map((item) => (
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
	));

	return (
		<>
			{start ? (
				<>
					<Return onClick={() => setStart(!start)}>Return Home</Return>
					<QuestionContainer>
						{displayQuestions}

						{Object.keys(selectedChoices).length < 5 && (
							<p className="py-4 text-red-500">
								Note: Must select one choice each per question to see the results.
							</p>
						)}

						{(check && (
							<div className="flex flex-row items-center justify-center space-x-4">
								<p className="text-xl font-bold">You scored {score}/5 correct answers </p>{" "}
								<Button onClick={playAgain}>{btnChild}</Button>
							</div>
						)) || <Button onClick={checkAnswer}>{btnChild}</Button>}
					</QuestionContainer>
				</>
			) : (
				<Intro onClick={() => setStart(!start)} />
			)}
		</>
	);
};

export default App;
