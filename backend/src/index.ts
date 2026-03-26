import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { initDatabase } from "./config/database";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const start = async (): Promise<void> => {
	await initDatabase();
	app.listen(PORT, () => {
		console.log(`Server running on http://localhost:${PORT}`);
	});
};

start().catch(console.error);
