import { useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { setFilter } from "../store/postsSlice";

export default function PostFilter() {
	const dispatch = useAppDispatch();

	const [input, setInput] = useState("");

	const handleSearch = () => {
		dispatch(setFilter(input));
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") handleSearch();
	};

	return (
		<div className="flex items-center gap-3">
			<input
				type="text"
				placeholder="Filtro de Nombre"
				value={input}
				onChange={(e) => setInput(e.target.value)}
				onKeyDown={handleKeyDown}
				className="flex-1 rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
			/>
			<button
				type="button"
				onClick={handleSearch}
				className="rounded-md bg-teal-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-teal-700 active:bg-teal-800"
			>
				Buscar
			</button>
		</div>
	);
}
