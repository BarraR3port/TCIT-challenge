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
			<div className="mx-auto max-w-4xl px-4 py-10">
				<h1 className="mb-6 text-center text-2xl font-bold tracking-tight text-zinc-900">
					TCIT Challenge — Posts
				</h1>

				<div className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
					<section
						className="border-b border-zinc-200 px-4 py-4"
						aria-label="Filtro de búsqueda"
					>
						<PostFilter />
					</section>

					<section className="min-h-48" aria-label="Listado de posts">
						<PostList />
					</section>

					<section
						className="border-t border-zinc-200 bg-zinc-50/80 px-4 py-4"
						aria-label="Crear post"
					>
						<PostForm />
					</section>
				</div>
			</div>
		</div>
	);
}
