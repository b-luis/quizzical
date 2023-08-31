function getButtonStyles(choice, isSelectedChoice, answerStatus, isChecked, correctAnswer) {
	const defaultStyles =
		"rounded-lg border-2 border-delft-dark px-5 hover:border-none hover:bg-delft-soft";
	const selectedStyles = choice === isSelectedChoice ? "border-none bg-delft-soft" : "";
	const correctStyles =
		answerStatus === "correct" && choice === isSelectedChoice ? "border-none bg-green-300" : "";
	const incorrectStyles =
		answerStatus === "incorrect" && choice === isSelectedChoice ? "bg-red-300" : "";
	const correctAnswerStyles =
		choice !== isSelectedChoice && choice === correctAnswer && isChecked
			? "border-none bg-green-300"
			: "";

	return `${defaultStyles} ${selectedStyles} ${correctStyles} ${incorrectStyles} ${correctAnswerStyles}`;
}

function Questions({
	choices,
	question,
	onClick,
	isSelected,
	isChecked,
	answerStatus,
	correctAnswer
}) {
	const isSelectedChoice = isSelected?.selectedAnswer;
	return (
		<>
			<h2 className="pt-3 font-bold">{question}</h2>
			<div className="mt-2 flex flex-wrap gap-2">
				{choices.map((choice, index) => (
					<button
						key={index}
						disabled={isChecked}
						className={`${getButtonStyles(
							choice,
							isSelectedChoice,
							answerStatus,
							isChecked,
							correctAnswer
						)}`}
						onClick={() => onClick(choice)}
					>
						{choice}
					</button>
				))}
			</div>
			<hr className="mt-5" />
		</>
	);
}

export default Questions;
