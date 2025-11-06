import { useParams, useNavigate } from "@tanstack/react-router";
import { useCharacter } from "../hooks/useCharacters";

export function CharacterDetails() {
  const { characterId } = useParams({ from: "/character/$characterId" });
  const navigate = useNavigate();
  const {
    data: character,
    isLoading,
    error,
  } = useCharacter(Number(characterId));

  if (isLoading) return <div>Loading character...</div>;
  if (error) return <div>Error loading character</div>;
  if (!character) return <div>Character not found</div>;

  return (
    <div style={{ padding: "20px" }}>
      <button
        onClick={() => navigate({ to: "/" })}
        style={{ marginBottom: "1rem" }}
      >
        Back to List
      </button>

      <div style={{ display: "flex", gap: "2rem" }}>
        <img
          src={character.image}
          alt={character.name}
          style={{ width: 300, borderRadius: "8px" }}
        />

        <div>
          <h1>{character.name}</h1>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              gap: "0.5rem 1rem",
            }}
          >
            <strong>Status:</strong>
            <span>{character.status}</span>

            <strong>Species:</strong>
            <span>{character.species}</span>

            <strong>Gender:</strong>
            <span>{character.gender}</span>

            {character.type && (
              <>
                <strong>Type:</strong>
                <span>{character.type}</span>
              </>
            )}

            <strong>Origin:</strong>
            <span>{character.origin.name}</span>

            <strong>Location:</strong>
            <span>{character.location.name}</span>

            <strong>Episodes:</strong>
            <span>{character.episode.length}</span>

            <strong>Created:</strong>
            <span>{new Date(character.created).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
