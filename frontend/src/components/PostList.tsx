import { useAppDispatch, useAppSelector } from "../store/hooks";
import { deletePost } from "../store/postsSlice";

export default function PostList() {
	const dispatch = useAppDispatch();

	const { items, filter, loading } = useAppSelector((state) => state.posts);

	const filteredPosts = items.filter((post) =>
		post.name.toLowerCase().includes(filter.toLowerCase()),
	);

	if (loading) {
		return (
			<div className="flex justify-center py-14">
				<div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-600 border-t-transparent" />
			</div>
		);
	}

	if (filteredPosts.length === 0) {
		return (
			<div className="px-4 py-12 text-center text-sm text-zinc-500">
				{filter
					? "No se encontraron posts con ese nombre."
					: "No hay posts aún. ¡Crea uno!"}
			</div>
		);
	}

	return (
		<div className="overflow-x-auto">
			<table className="w-full text-left text-sm">
				<thead>
					<tr className="border-b border-zinc-200 bg-zinc-200/90">
						<th className="px-4 py-3 font-semibold text-zinc-800">Nombre</th>
						<th className="px-4 py-3 font-semibold text-zinc-800">
							Descripción
						</th>
						<th className="px-4 py-3 text-right font-semibold text-zinc-800">
							Acción
						</th>
					</tr>
				</thead>
				<tbody>
					{filteredPosts.map((post, index) => (
						<tr
							key={post.id}
							className={
								index % 2 === 0
									? "bg-white hover:bg-zinc-50/80"
									: "bg-zinc-50 hover:bg-zinc-100/80"
							}
						>
							<td className="border-b border-zinc-100 px-4 py-3 font-medium text-zinc-900">
								{post.name}
							</td>
							<td className="border-b border-zinc-100 px-4 py-3 text-zinc-600">
								{post.description}
							</td>
							<td className="border-b border-zinc-100 px-4 py-3 text-right">
								<button
									type="button"
									onClick={() => {
										dispatch(deletePost(post.id));
									}}
									className="rounded-md border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:border-red-300 hover:bg-red-100 cursor-pointer"
								>
									Eliminar
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
