function Button({ children, onClick }) {
	return (
		<button
			className="mt-3 w-48 self-center rounded-lg bg-delft-dark py-4 text-primary shadow-md hover:bg-delft focus:bg-delft sm:text-2xl"
			onClick={onClick}
		>
			{children}
		</button>
	);
}

export default Button;
