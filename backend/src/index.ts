import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { initDatabase } from "./config/database";
import postRoutes from "./routes/postRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/api/posts", postRoutes);

const start = async (): Promise<void> => {
	await initDatabase();
	app.listen(PORT, () => {
		console.log(`Server running on http://localhost:${PORT}`);
	});
};

start().catch(console.error);
