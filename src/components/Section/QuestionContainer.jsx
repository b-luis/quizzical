import Button from "../Button/Button";
function QuestionContainer({ children }) {
	return (
		<>
			<section className="align-center mx-auto flex flex-col justify-center p-5 text-delft md:w-[700px]">
				<h2>
					<span className="font-bold">Directions: </span>Choose the correct answer from the options
					below.
				</h2>
				{children}
			</section>
		</>
	);
}

export default QuestionContainer;
