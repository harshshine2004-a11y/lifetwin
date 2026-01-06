import { Router } from "express";
import AppDataSource from "../data-source";
import { Message } from "../entity/Message";
import { generateResponse } from "../services/azureOpenAI";

const router = Router();
const repo = () => AppDataSource.getRepository(Message);

// POST /api/messages
router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "prompt is required (string)" });
    }

    const message = repo().create({
      prompt,
      response: ""
    });
    await repo().save(message);

    const aiText = await generateResponse(prompt);

    message.response = aiText;
    await repo().save(message);

    return res.json({ id: message.id, prompt: message.prompt, response: message.response, createdAt: message.createdAt });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err?.message || "server error" });
  }
});

// GET /api/messages
router.get("/", async (_req, res) => {
  try {
    const items = await repo().find({ order: { createdAt: "DESC" }, take: 100 });
    return res.json(items);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err?.message || "server error" });
  }
});

export default router;
