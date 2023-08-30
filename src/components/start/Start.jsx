import Button from "../Button/Button";
import styles from "./Start.module.css"; // Import the styles

function Start({ onClick }) {
	return (
		<main className="align-center relative flex h-screen w-full flex-col justify-center overflow-hidden text-center text-delft">
			<h1 className="text-3xl font-bold sm:text-6xl">Quizzical</h1>
			<p className="px-20 py-5 text-justify sm:px-32 sm:text-center sm:text-2xl">
				Dive into endless fun and knowledge with Trivia Quest! Challenge yourself with a variety of
				exciting trivia questions sourced from the{" "}
				<span className="font-bold hover:text-razzle-rose-700 hover:underline hover:decoration-razzle-rose hover:decoration-wavy hover:underline-offset-2">
					<a href="https://opentdb.com/api_config.php" target="_blank">
						Open Trivia Database API.
					</a>
				</span>
			</p>
			<Button onClick={onClick}>Start quiz</Button>
			<div className={`${styles.convex} ${styles.top}`}></div>
			<div className={`${styles.convex} ${styles.bottom}`}></div>
		</main>
	);
}

export default Start;
