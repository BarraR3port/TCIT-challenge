import type { Request, Response } from "express";
import pool from "../config/database";
import { type CreatePostBody, type PostRow, toPost } from "../models/post";

export const getPosts = async (_req: Request, res: Response): Promise<void> => {
	const result = await pool.query<PostRow>(
		"SELECT * FROM posts ORDER BY created_at DESC",
	);
	res.json(result.rows.map(toPost));
};

export const createPost = async (
	req: Request<{}, {}, CreatePostBody>,
	res: Response,
): Promise<void> => {
	const { name, description } = req.body;
	if (!name || !description) {
		res.status(400).json({ error: "Name and description are required" });
		return;
	}
	const result = await pool.query<PostRow>(
		"INSERT INTO posts (name, description) VALUES ($1, $2) RETURNING *",
		[name, description],
	);
	res.status(201).json(toPost(result.rows[0]));
};

export const deletePost = async (
	req: Request<{ id: string }>,
	res: Response,
): Promise<void> => {
	const { id } = req.params;
	const result = await pool.query<PostRow>(
		"DELETE FROM posts WHERE id = $1 RETURNING *",
		[id],
	);
	if (result.rows.length === 0) {
		res.status(404).json({ error: "Post not found" });
		return;
	}
	res.json(toPost(result.rows[0]));
};
