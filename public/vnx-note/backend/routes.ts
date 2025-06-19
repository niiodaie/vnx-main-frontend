import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertNotebookSchema, updateNotebookSchema, insertConversationSchema } from "@shared/schema";
import { summarizeNote, recallSimilarNotes, suggestNextSteps } from "./ai-service";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get all notebooks
  app.get("/api/notebooks", async (req, res) => {
    try {
      const userId = req.query.userId ? parseInt(req.query.userId as string) : undefined;
      const notebooks = await storage.getNotebooks(userId);
      res.json(notebooks);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch notebooks" });
    }
  });

  // Get a specific notebook
  app.get("/api/notebooks/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const notebook = await storage.getNotebook(id);
      if (!notebook) {
        return res.status(404).json({ message: "Notebook not found" });
      }
      res.json(notebook);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch notebook" });
    }
  });

  // Create a new notebook
  app.post("/api/notebooks", async (req, res) => {
    try {
      const validatedData = insertNotebookSchema.parse(req.body);
      const notebook = await storage.createNotebook(validatedData);
      res.status(201).json(notebook);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid notebook data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create notebook" });
    }
  });

  // Update a notebook
  app.patch("/api/notebooks/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = updateNotebookSchema.parse(req.body);
      const notebook = await storage.updateNotebook(id, validatedData);
      if (!notebook) {
        return res.status(404).json({ message: "Notebook not found" });
      }
      res.json(notebook);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid update data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update notebook" });
    }
  });

  // Delete a notebook
  app.delete("/api/notebooks/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteNotebook(id);
      if (!deleted) {
        return res.status(404).json({ message: "Notebook not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete notebook" });
    }
  });

  // Search notebooks
  app.get("/api/notebooks/search/:query", async (req, res) => {
    try {
      const query = req.params.query;
      const userId = req.query.userId ? parseInt(req.query.userId as string) : undefined;
      const notebooks = await storage.searchNotebooks(query, userId);
      res.json(notebooks);
    } catch (error) {
      res.status(500).json({ message: "Failed to search notebooks" });
    }
  });

  // Get notebooks by tag
  app.get("/api/notebooks/tag/:tag", async (req, res) => {
    try {
      const tag = req.params.tag;
      const userId = req.query.userId ? parseInt(req.query.userId as string) : undefined;
      const notebooks = await storage.getNotebooksByTag(tag, userId);
      res.json(notebooks);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch notebooks by tag" });
    }
  });

  // Get AI conversation for a notebook
  app.get("/api/notebooks/:id/conversation", async (req, res) => {
    try {
      const notebookId = parseInt(req.params.id);
      const conversation = await storage.getConversation(notebookId);
      res.json(conversation || { messages: "[]" });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch conversation" });
    }
  });

  // Save AI conversation
  app.post("/api/notebooks/:id/conversation", async (req, res) => {
    try {
      const notebookId = parseInt(req.params.id);
      const validatedData = insertConversationSchema.parse({
        ...req.body,
        notebookId,
      });
      const conversation = await storage.saveConversation(validatedData);
      res.status(201).json(conversation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid conversation data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to save conversation" });
    }
  });

  // AI Features
  // Summarize notebook content
  app.post("/api/ai/summarize", async (req, res) => {
    try {
      const { content } = req.body;
      if (!content || typeof content !== 'string') {
        return res.status(400).json({ message: "Content is required" });
      }
      
      const summary = await summarizeNote(content);
      res.json({ summary });
    } catch (error) {
      console.error("Summarize error:", error);
      res.status(500).json({ message: "Failed to generate summary" });
    }
  });

  // Recall similar notes
  app.post("/api/ai/recall", async (req, res) => {
    try {
      const { query, userId = 1 } = req.body;
      if (!query || typeof query !== 'string') {
        return res.status(400).json({ message: "Query is required" });
      }
      
      const relatedNotes = await recallSimilarNotes(query, userId);
      res.json({ relatedNotes });
    } catch (error) {
      console.error("Recall error:", error);
      res.status(500).json({ message: "Failed to find related notes" });
    }
  });

  // Suggest next steps
  app.post("/api/ai/suggest", async (req, res) => {
    try {
      const { content } = req.body;
      if (!content || typeof content !== 'string') {
        return res.status(400).json({ message: "Content is required" });
      }
      
      const suggestions = await suggestNextSteps(content);
      res.json({ suggestions });
    } catch (error) {
      console.error("Suggest error:", error);
      res.status(500).json({ message: "Failed to generate suggestions" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
