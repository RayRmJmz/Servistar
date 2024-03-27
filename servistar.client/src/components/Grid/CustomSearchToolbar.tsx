import { GridToolbarContainer, GridToolbarQuickFilter } from "@mui/x-data-grid";

export type CustomSearchToolbarProps = {};

export default function CustomSearchToolbar({}: CustomSearchToolbarProps) {
  return (
    <GridToolbarContainer>
      <GridToolbarQuickFilter placeholder="Buscar" color="secondary" />
    </GridToolbarContainer>
  );
}
