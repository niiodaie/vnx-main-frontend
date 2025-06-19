import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Notebook, InsertNotebook, UpdateNotebook } from "@shared/schema";

export function useNotebooks(userId?: number) {
  return useQuery({
    queryKey: ["/api/notebooks", userId],
    queryFn: async () => {
      const response = await fetch(`/api/notebooks${userId ? `?userId=${userId}` : ""}`);
      if (!response.ok) throw new Error("Failed to fetch notebooks");
      return response.json() as Promise<Notebook[]>;
    },
  });
}

export function useNotebook(id: number) {
  return useQuery({
    queryKey: ["/api/notebooks", id],
    queryFn: async () => {
      const response = await fetch(`/api/notebooks/${id}`);
      if (!response.ok) throw new Error("Failed to fetch notebook");
      return response.json() as Promise<Notebook>;
    },
    enabled: !!id,
  });
}

export function useCreateNotebook() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (notebook: InsertNotebook) => {
      const response = await apiRequest("POST", "/api/notebooks", notebook);
      return response.json() as Promise<Notebook>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/notebooks"] });
    },
  });
}

export function useUpdateNotebook() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, updates }: { id: number; updates: UpdateNotebook }) => {
      const response = await apiRequest("PATCH", `/api/notebooks/${id}`, updates);
      return response.json() as Promise<Notebook>;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["/api/notebooks"] });
      queryClient.invalidateQueries({ queryKey: ["/api/notebooks", variables.id] });
    },
  });
}

export function useDeleteNotebook() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/notebooks/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/notebooks"] });
    },
  });
}

export function useSearchNotebooks(query: string, userId?: number) {
  return useQuery({
    queryKey: ["/api/notebooks/search", query, userId],
    queryFn: async () => {
      const response = await fetch(`/api/notebooks/search/${encodeURIComponent(query)}${userId ? `?userId=${userId}` : ""}`);
      if (!response.ok) throw new Error("Failed to search notebooks");
      return response.json() as Promise<Notebook[]>;
    },
    enabled: !!query && query.length > 0,
  });
}

export function useNotebooksByTag(tag: string, userId?: number) {
  return useQuery({
    queryKey: ["/api/notebooks/tag", tag, userId],
    queryFn: async () => {
      const response = await fetch(`/api/notebooks/tag/${encodeURIComponent(tag)}${userId ? `?userId=${userId}` : ""}`);
      if (!response.ok) throw new Error("Failed to fetch notebooks by tag");
      return response.json() as Promise<Notebook[]>;
    },
    enabled: !!tag,
  });
}
