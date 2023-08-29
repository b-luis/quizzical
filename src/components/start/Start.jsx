function Start() {
	return (
		<main className="align-center text-delft relative flex h-screen w-full flex-col justify-center overflow-hidden text-center">
			<h1 className="text-3xl font-bold sm:text-6xl">Quizzical</h1>
			<p className="px-20 py-5 text-justify sm:px-32 sm:text-center sm:text-2xl">
				Dive into endless fun and knowledge with Trivia Quest! Challenge yourself with a variety of
				exciting trivia questions sourced from the{" "}
				<span className="hover:decoration-razzle-rose hover:text-razzle-rose-700 font-bold hover:underline hover:decoration-wavy hover:underline-offset-2">
					<a href="https://opentdb.com/api_config.php" target="_blank">
						Open Trivia Database API.{" "}
					</a>
				</span>
			</p>
			<button className="text-primary bg-delft-dark hover:bg-delft focus:bg-delft mt-3 w-48 self-center rounded-lg py-4 shadow-md sm:text-2xl">
				Start quiz
			</button>
			<div className="convex top"></div>
			<div className="convex bottom"></div>
		</main>
	);
}

export default Start;
