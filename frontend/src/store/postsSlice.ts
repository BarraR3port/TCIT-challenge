import {
	createAsyncThunk,
	createSlice,
	type PayloadAction,
} from "@reduxjs/toolkit";
import type { CreatePostPayload, Post } from "../types/types";

const API_URL = "http://localhost:3001/api/posts";

interface PostsState {
	items: Post[];
	filter: string;
	loading: boolean;
	error: string | null;
}

const initialState: PostsState = {
	items: [],
	filter: "",
	loading: false,
	error: null,
};

export const fetchPosts = createAsyncThunk<Post[]>(
	"posts/fetchPosts",
	async () => {
		const response = await fetch(API_URL);
		if (!response.ok) throw new Error("Error fetching posts");
		const data = await response.json();
		return data;
	},
);

export const createPost = createAsyncThunk<Post, CreatePostPayload>(
	"posts/createPost",
	async (payload) => {
		const response = await fetch(API_URL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		});
		if (!response.ok) throw new Error("Error creating post");
		const data = await response.json();
		return data;
	},
);

export const deletePost = createAsyncThunk<Post, number>(
	"posts/deletePost",
	async (id) => {
		const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
		if (!response.ok) throw new Error("Error deleting post");
		const data = await response.json();
		return data;
	},
);

export const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		setFilter(state, action: PayloadAction<string>) {
			state.filter = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			// Fetch
			.addCase(fetchPosts.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.loading = false;
				state.items = action.payload;
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? "Unknown error";
			})
			.addCase(deletePost.fulfilled, (state, action) => {
				state.items = state.items.filter(
					(post) => post.id !== action.payload.id,
				);
			});
	},
});

export const { setFilter } = postsSlice.actions;
export default postsSlice.reducer;
