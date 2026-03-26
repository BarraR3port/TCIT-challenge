export interface Post {
	id: number;
	name: string;
	description: string;
	createdAt: string;
}

export interface CreatePostPayload {
	name: string;
	description: string;
}
