function Return({ onClick, children }) {
	return (
		<button
			className="overflow-hidden p-5 text-delft shadow-md hover:bg-slate-200 "
			onClick={onClick}
		>
			{children}
		</button>
	);
}

export default Return;
