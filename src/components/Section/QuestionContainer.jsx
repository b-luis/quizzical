function QuestionContainer({ children }) {
	return (
		<div className="align-center relative mx-auto flex h-screen w-full flex-col justify-center overflow-hidden text-delft md:w-[720px] ">
			<section className=" rounded-lg border-2 border-delft-light p-5 shadow-lg ">
				<h2>
					<span className="font-bold">Directions: </span>Choose the correct answer from the options
					below.
				</h2>
				{children}
			</section>
		</div>
	);
}

export default QuestionContainer;
