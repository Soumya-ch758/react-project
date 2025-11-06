import type { Character, ApiResponse } from "../types";

const API_BASE = "https://rickandmortyapi.com/api";

export const charactersApi = {
  getCharacters: async (page: number = 1): Promise<ApiResponse<Character>> => {
    const response = await fetch(`${API_BASE}/character?page=${page}`);
    if (!response.ok) {
      throw new Error("Failed to fetch characters");
    }
    return response.json();
  },

  getCharacter: async (id: number): Promise<Character> => {
    const response = await fetch(`${API_BASE}/character/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch character");
    }
    return response.json();
  },
};
