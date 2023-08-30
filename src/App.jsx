import { Start, Questions, QuestionContainer, Button } from "./components";
import { useState, useEffect } from "react";
import { decode } from "html-entities";
import { nanoid } from "nanoid";

function App() {
	const [start, setStart] = useState(false);
	const [allQuestions, setAllQuestions] = useState([]);
	const [selectedChoices, setSelectedChoices] = useState({});

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
				answerId: questionId,
				selectedAnswer: choice,
				isSelected: true
			}
		}));
	};

	const checkAnswer = () => {
		// map thru the selectedChoices and compare it to the correct answers per answerId
	};

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
							/>
						))}
						<Button onClick={() => checkAnswer}>Check Answer</Button>
					</QuestionContainer>
				</>
			) : (
				<Start onClick={() => setStart(!start)} />
			)}
		</>
	);
}

export default App;
