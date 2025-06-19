import type { Notebook } from "@shared/schema";

export const sampleNotebooks: Notebook[] = [
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

Collection of coding patterns, performance optimization techniques, and modern development workflows.

## Performance Optimization
- Code splitting and lazy loading
- Image optimization strategies
- Caching mechanisms

## Security Considerations
- Input validation
- Authentication patterns
- Data encryption`,
    excerpt: "Collection of coding patterns, performance optimization techniques, and modern development workflows...",
    tags: ["Web Dev", "Performance", "Security"],
    isBookmarked: false,
    wordCount: 456,
    lastModified: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    userId: 1,
  },
  {
    id: 4,
    title: "Design System Documentation",
    content: `# Design System Documentation

Comprehensive guide to our design language and component library.

## Color Palette
- Primary: #0077ff
- Secondary: #6c757d
- Success: #28a745

## Typography
- Headers: Inter Bold
- Body: Inter Regular
- Code: Fira Code`,
    excerpt: "Comprehensive guide to our design language and component library...",
    tags: ["Design", "UI/UX", "Documentation"],
    isBookmarked: true,
    wordCount: 234,
    lastModified: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    userId: 1,
  },
  {
    id: 5,
    title: "Meeting Notes - Q1 Planning",
    content: `# Q1 Planning Meeting Notes

Key decisions and action items from quarterly planning session.

## Objectives for Q1
- Launch new feature set
- Improve user onboarding
- Expand market reach

## Action Items
- [ ] Research competitor features
- [ ] Design user flow mockups
- [ ] Prepare technical specifications`,
    excerpt: "Key decisions and action items from quarterly planning session...",
    tags: ["Meeting", "Planning", "Q1"],
    isBookmarked: false,
    wordCount: 178,
    lastModified: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
    userId: 1,
  },
  {
    id: 6,
    title: "Book Summary: Atomic Habits",
    content: `# Book Summary: Atomic Habits by James Clear

Key insights and actionable takeaways from this influential book on habit formation.

## Core Concepts
- 1% better every day compounds over time
- Focus on systems, not goals
- Environment design is crucial

## The Four Laws of Behavior Change
1. Make it obvious
2. Make it attractive
3. Make it easy
4. Make it satisfying`,
    excerpt: "Key insights and actionable takeaways from this influential book on habit formation...",
    tags: ["Books", "Self-Improvement", "Habits"],
    isBookmarked: true,
    wordCount: 567,
    lastModified: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    userId: 1,
  },
];
