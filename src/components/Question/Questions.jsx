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
	const isStatusCorrect = answerStatus || answerStatus === false;

	return (
		<>
			<h2 className="pt-3 font-bold">{question}</h2>
			<div className="mt-2 flex flex-wrap gap-2">
				{choices.map((choice, index) => (
					<button
						key={index}
						className={`${choice === isSelectedChoice ? "border-none bg-delft-soft" : ""} 
						${isStatusCorrect && choice === isSelectedChoice ? "bg-green-300" : ""}
						${isStatusCorrect && choice === isSelectedChoice ? "bg-red-300" : ""} 
						${
							choice !== isSelectedChoice && choice === correctAnswer && isChecked
								? "bg-green-200"
								: ""
						} rounded-lg border-2 border-delft-dark px-5 hover:bg-delft-soft`}
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
