import { useQuery } from "@tanstack/react-query";
import { charactersApi } from "../api/characters";

export const useCharacters = (page: number) => {
  return useQuery({
    queryKey: ["characters", page],
    queryFn: () => charactersApi.getCharacters(page),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCharacter = (id: number) => {
  return useQuery({
    queryKey: ["character", id],
    queryFn: () => charactersApi.getCharacter(id),
    enabled: !!id,
  });
};
