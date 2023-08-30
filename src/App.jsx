import { Start, Questions, QuestionContainer, Button } from "./components";
import { useState, useEffect } from "react";
import { decode } from "html-entities";
import { nanoid } from "nanoid";

function App() {
	const [start, setStart] = useState(false);
	const [allQuestions, setAllQuestions] = useState([]);
	const [selectedChoices, setSelectedChoices] = useState({});
	const [answerStatus, setAnswerStatus] = useState({});
	const [check, setCheck] = useState(false);

	useEffect(() => {
		// Fisher-Yates Algorithm
		function shuffleChoices(arr) {
			const shuffled = [...arr];
			for (let i = shuffled.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
			}
			return decode(shuffled);
		}

		async function getQuestions() {
			const res = await fetch("https://opentdb.com/api.php?amount=5");
			const data = await res.json();
			setAllQuestions(
				data.results.map((item) => ({
					...item,
					questionId: nanoid(),
					question: decode(item.question),
					choices: shuffleChoices([item.correct_answer, ...item.incorrect_answers])
				}))
			);
		}
		getQuestions();
	}, []);

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
		const updatedStatus = {};
		allQuestions.forEach((item) => {
			const selectedChoice = selectedChoices[item.questionId].selectedAnswer;
			const isCorrect = selectedChoice === item.correct_answer;
			updatedStatus[item.questionId] = isCorrect ? true : false;
			setAnswerStatus(updatedStatus);
		});
		setCheck(!check);
	};

	const btnChild = check ? "Play Again" : "Check Answer";

	return (
		<>
			{start ? (
				<>
					<QuestionContainer>
						{allQuestions.map((item) => (
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
						))}
						<Button onClick={checkAnswer}>{btnChild}</Button>
					</QuestionContainer>
				</>
			) : (
				<Start onClick={() => setStart(!start)} />
			)}
		</>
	);
}

export default App;
