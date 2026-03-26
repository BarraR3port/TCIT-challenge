import { useEffect } from "react";
import PostFilter from "./components/PostFilter";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import { useAppDispatch } from "./store/hooks";
import { fetchPosts } from "./store/postsSlice";

export default function App() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchPosts());
	}, [dispatch]);

	return (
		<div className="min-h-screen bg-zinc-100">
			<div className="mx-auto max-w-3xl px-4 py-10">
				<h1 className="mb-8 text-center text-2xl font-bold tracking-tight text-zinc-900">
					TCIT Challenge — Posts
				</h1>

				<div className="space-y-6">
					{/* Filtro */}
					<PostFilter />

					{/* Lista */}
					<PostList />

					{/* Formulario */}
					<PostForm />
				</div>
			</div>
		</div>
	);
}
