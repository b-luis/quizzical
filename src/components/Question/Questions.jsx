import Button from "../Button/Button";
function Questions({ choices, question, onClick, isSelected }) {
	return (
		<>
			<h2 className="pt-3 font-bold">{question}</h2>
			<div className="mt-2 flex flex-wrap gap-2">
				{choices.map((choice, index) => (
					<button
						key={index}
						className={`${
							choice === isSelected?.selectedAnswer ? "border-none bg-delft-soft" : ""
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
