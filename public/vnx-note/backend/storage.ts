import { users, notebooks, aiConversations, type User, type InsertUser, type Notebook, type InsertNotebook, type UpdateNotebook, type AIConversation, type InsertConversation } from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Notebook methods
  getNotebooks(userId?: number): Promise<Notebook[]>;
  getNotebook(id: number): Promise<Notebook | undefined>;
  createNotebook(notebook: InsertNotebook): Promise<Notebook>;
  updateNotebook(id: number, updates: UpdateNotebook): Promise<Notebook | undefined>;
  deleteNotebook(id: number): Promise<boolean>;
  searchNotebooks(query: string, userId?: number): Promise<Notebook[]>;
  getNotebooksByTag(tag: string, userId?: number): Promise<Notebook[]>;

  // AI conversation methods
  getConversation(notebookId: number): Promise<AIConversation | undefined>;
  saveConversation(conversation: InsertConversation): Promise<AIConversation>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private notebooks: Map<number, Notebook>;
  private conversations: Map<number, AIConversation>;
  private currentUserId: number;
  private currentNotebookId: number;
  private currentConversationId: number;

  constructor() {
    this.users = new Map();
    this.notebooks = new Map();
    this.conversations = new Map();
    this.currentUserId = 1;
    this.currentNotebookId = 1;
    this.currentConversationId = 1;

    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Create sample user
    const sampleUser: User = {
      id: 1,
      username: "alex.chen",
      password: "password123",
    };
    this.users.set(1, sampleUser);

    // Create sample notebooks
    const sampleNotebooks: Notebook[] = [
      {
        id: 1,
        title: "Machine Learning Research Notes",
        content: `# Machine Learning Research Notes

This notebook contains my ongoing research into machine learning algorithms and their practical applications. The focus is on understanding both theoretical foundations and real-world implementations.

## Key Areas of Investigation

- **Transformer Architectures:** Deep dive into attention mechanisms and their applications beyond NLP
- **Reinforcement Learning:** Exploring policy gradient methods and their effectiveness in complex environments
- **Computer Vision:** Latest developments in object detection and image segmentation
- **Optimization Techniques:** Comparative analysis of different optimization algorithms

## Recent Findings

The integration of attention mechanisms in computer vision tasks has shown remarkable improvements in model performance. Specifically, Vision Transformers (ViTs) have demonstrated competitive results with traditional CNNs while offering better interpretability.

> **Key Insight:** The self-attention mechanism allows models to focus on relevant parts of the input, leading to more robust feature extraction and better generalization.

### Experimental Results

Our experiments with different architectures yielded the following results:

1. ViT-B/16 achieved 84.2% accuracy on ImageNet validation set
2. Traditional ResNet-50 baseline achieved 76.8% accuracy
3. Hybrid CNN-Transformer approach showed 86.1% accuracy

These results suggest that combining the strengths of both architectures can lead to superior performance.`,
        excerpt: "Exploring various ML algorithms and their applications in real-world scenarios. Recent focus on transformer architectures...",
        tags: ["Research", "AI", "Deep Learning"],
        isBookmarked: true,
        wordCount: 1247,
        lastModified: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        userId: 1,
      },
      {
        id: 2,
        title: "Product Strategy Insights",
        content: `# Product Strategy Insights

Key insights from user research and market analysis. Building a comprehensive framework for product decisions.

## Market Analysis

Current market trends indicate a shift towards AI-powered solutions...`,
        excerpt: "Key insights from user research and market analysis. Building a comprehensive framework for product decisions...",
        tags: ["Strategy", "Product"],
        isBookmarked: false,
        wordCount: 892,
        lastModified: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        userId: 1,
      },
      {
        id: 3,
        title: "Web Development Best Practices",
        content: `# Web Development Best Practices

Collection of coding patterns, performance tips, and modern development workflows for scalable web applications.`,
        excerpt: "Collection of coding patterns, performance tips, and modern development workflows for scalable web applications...",
        tags: ["Development", "Web", "Best Practices"],
        isBookmarked: true,
        wordCount: 2156,
        lastModified: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        userId: 1,
      },
      {
        id: 4,
        title: "Market Research Analysis",
        content: `# Market Research Analysis

Comprehensive analysis of current market trends, competitor landscape, and emerging opportunities.`,
        excerpt: "Comprehensive analysis of current market trends, competitor landscape, and emerging opportunities...",
        tags: ["Research", "Market"],
        isBookmarked: false,
        wordCount: 1834,
        lastModified: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
        userId: 1,
      },
    ];

    sampleNotebooks.forEach(notebook => {
      this.notebooks.set(notebook.id, notebook);
    });

    this.currentNotebookId = 5;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getNotebooks(userId?: number): Promise<Notebook[]> {
    const notebooks = Array.from(this.notebooks.values());
    if (userId) {
      return notebooks.filter(notebook => notebook.userId === userId);
    }
    return notebooks;
  }

  async getNotebook(id: number): Promise<Notebook | undefined> {
    return this.notebooks.get(id);
  }

  async createNotebook(insertNotebook: InsertNotebook): Promise<Notebook> {
    const id = this.currentNotebookId++;
    const notebook: Notebook = {
      ...insertNotebook,
      id,
      lastModified: new Date(),
    };
    this.notebooks.set(id, notebook);
    return notebook;
  }

  async updateNotebook(id: number, updates: UpdateNotebook): Promise<Notebook | undefined> {
    const existing = this.notebooks.get(id);
    if (!existing) return undefined;

    const updated: Notebook = {
      ...existing,
      ...updates,
      lastModified: new Date(),
    };
    this.notebooks.set(id, updated);
    return updated;
  }

  async deleteNotebook(id: number): Promise<boolean> {
    return this.notebooks.delete(id);
  }

  async searchNotebooks(query: string, userId?: number): Promise<Notebook[]> {
    const notebooks = await this.getNotebooks(userId);
    const lowerQuery = query.toLowerCase();
    return notebooks.filter(notebook =>
      notebook.title.toLowerCase().includes(lowerQuery) ||
      notebook.content.toLowerCase().includes(lowerQuery) ||
      notebook.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }

  async getNotebooksByTag(tag: string, userId?: number): Promise<Notebook[]> {
    const notebooks = await this.getNotebooks(userId);
    return notebooks.filter(notebook =>
      notebook.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    );
  }

  async getConversation(notebookId: number): Promise<AIConversation | undefined> {
    return Array.from(this.conversations.values()).find(
      conv => conv.notebookId === notebookId
    );
  }

  async saveConversation(insertConversation: InsertConversation): Promise<AIConversation> {
    const id = this.currentConversationId++;
    const conversation: AIConversation = {
      ...insertConversation,
      id,
      createdAt: new Date(),
    };
    this.conversations.set(id, conversation);
    return conversation;
  }
}

export const storage = new MemStorage();
