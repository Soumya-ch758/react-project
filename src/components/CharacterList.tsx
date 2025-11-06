import { useNavigate } from "@tanstack/react-router";
import { useCharacters } from "../hooks/useCharacters";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { Character } from "../types";

const columnHelper = createColumnHelper<Character>();

const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("species", {
    header: "Species",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("gender", {
    header: "Gender",
    cell: (info) => info.getValue(),
  }),
];

export function CharacterList() {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const currentPage = Number(searchParams.get("page")) || 1;

  const { data, isLoading, error, refetch } = useCharacters(currentPage);

  const table = useReactTable({
    data: data?.results || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: data?.info.pages || 0,
  });

  const handleRowClick = (characterId: number) => {
    navigate({
      to: "/character/$characterId",
      params: { characterId: characterId.toString() },
    });
  };

  const handlePageChange = (newPage: number) => {
    const newSearchParams = new URLSearchParams();
    newSearchParams.set("page", newPage.toString());
    window.history.pushState({}, "", `?${newSearchParams.toString()}`);
    // Trigger a re-render or refetch
    refetch();
  };

  if (isLoading) return <div>Loading characters...</div>;
  if (error) return <div>Error loading characters</div>;
  if (!data) return <div>No data available</div>;

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <h1>Rick & Morty Characters</h1>
        <button onClick={() => refetch()}>Refresh</button>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              onClick={() => handleRowClick(row.original.id)}
              style={{ cursor: "pointer", border: "1px solid #ddd" }}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  style={{ border: "1px solid #ddd", padding: "8px" }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {data.info && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "1rem",
          }}
        >
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!data.info.prev}
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {data.info.pages}
          </span>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!data.info.next}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
