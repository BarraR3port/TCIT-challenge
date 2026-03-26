export interface Post {
	id: number;
	name: string;
	description: string;
	createdAt: string;
}

export interface PostRow {
	id: number;
	name: string;
	description: string;
	created_at: string;
}

export interface CreatePostBody {
	name: string;
	description: string;
}

export const toPost = (row: PostRow): Post => ({
	id: row.id,
	name: row.name,
	description: row.description,
	createdAt: row.created_at,
});
