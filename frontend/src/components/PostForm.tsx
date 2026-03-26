import { useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { createPost, fetchPosts } from "../store/postsSlice";

export default function PostForm() {
	const dispatch = useAppDispatch();
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!name.trim() || !description.trim()) return;
		try {
			await dispatch(
				createPost({ name: name.trim(), description: description.trim() }),
			).unwrap();
			setName("");
			setDescription("");
			await dispatch(fetchPosts());
		} catch {
			// createPost rejected — error state handled in slice
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="grid grid-cols-1 items-end gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_auto]"
		>
			<div className="flex min-w-0 flex-col gap-1.5">
				<label
					htmlFor="post-name"
					className="text-xs font-medium text-zinc-600"
				>
					Nombre
				</label>
				<input
					id="post-name"
					type="text"
					placeholder="Nombre"
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
				/>
			</div>
			<div className="flex min-w-0 flex-col gap-1.5">
				<label
					htmlFor="post-description"
					className="text-xs font-medium text-zinc-600"
				>
					Descripción
				</label>
				<input
					id="post-description"
					type="text"
					placeholder="Descripción"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
				/>
			</div>
			<button
				type="submit"
				className="rounded-md bg-teal-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-teal-700 active:bg-teal-800 sm:shrink-0 cursor-pointer"
			>
				Crear
			</button>
		</form>
	);
}
