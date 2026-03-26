import { useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { createPost } from "../store/postsSlice";

export default function PostForm() {
	const dispatch = useAppDispatch();
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!name.trim() || !description.trim()) return;
		await dispatch(
			createPost({ name: name.trim(), description: description.trim() }),
		).then((res) => {
			if (res.meta.requestStatus === "fulfilled" && res.payload) {
				setName("");
				setDescription("");
			} else {
				console.error(res.payload);
			}
		});
	};

	return (
		<form onSubmit={handleSubmit} className="flex items-center gap-3">
			<input
				type="text"
				placeholder="Nombre"
				value={name}
				onChange={(e) => setName(e.target.value)}
				className="flex-1 rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
			/>
			<input
				type="text"
				placeholder="Descripción"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				className="flex-[2] rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
			/>
			<button
				type="submit"
				className="rounded-md bg-teal-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-teal-700 active:bg-teal-800 cursor-pointer"
			>
				Crear
			</button>
		</form>
	);
}
