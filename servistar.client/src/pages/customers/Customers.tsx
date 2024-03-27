import {
  Button,
  Card,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { LABELS } from "../../constants";
import MuiTooltip from "../../components/MuiTooltip/MuiTooltip";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useCallback, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridPaginationModel,
  GridSortDirection,
  GridSortModel,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import useCustomerPagination from "../../hooks/customers/useCustomersPagination";
import { customersPaginationAdapter } from "../../adapters";
import NoRows from "../../components/Grid/NoRows";
import SkeletonGrid from "../../components/Grid/SkeletonGrid";
import CustomSearchToolbar from "../../components/Grid/CustomSearchToolbar";

export default function Customers() {
  //const [openModal, setOpenModal] = useState<boolean>(false);
  const [pagination, setPagination] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 30,
  });
  const [filters, setFilters] = useState<GridFilterModel>({
    items: [],
    quickFilterExcludeHiddenColumns: false,
    quickFilterValues: [],
  });

  const [sortValues, setSortValues] = useState<{
    field: string;
    sort: GridSortDirection;
  }>({
    field: "",
    sort: "asc",
  });

  const sortDataGrid = (sortParams: GridSortModel) => {
    if (sortParams.length) {
      const { field, sort } = sortParams[0];
      setSortValues({ field: field === "fieldDate" ? "code" : field, sort });
    }
  };

  const filterDataGrid = useCallback((filter: GridFilterModel) => {
    setFilters(filter);

    setPagination((pages) => ({ ...pages, page: 0 }));
  }, []);

  const {
    data: customers,
    isLoading,
    // refetch,
  } = useCustomerPagination(
    pagination.page,
    pagination.pageSize,
    filters.quickFilterValues ? filters.quickFilterValues[0] : "",
    sortValues.field,
    sortValues.sort
  );

  const response = customers
    ? customersPaginationAdapter(customers)
    : { customers: [], total: 0 };

  const dataColumns: GridColDef[] = [
    {
      field: "name",
      headerName: "Nombre",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "lastName",
      headerName: "Apellido",
      minWidth: 250,

      flex: 2,
    },
    {
      field: "secondLastName",
      headerName: "Segundo Apellido",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "user",
      headerName: "Actualizado por",
      minWidth: 100,
      hideSortIcons: true,
      sortable: false,
      flex: 1,
    },
    {
      field: "action",
      headerName: "",

      renderCell: (params) => (
        <MuiTooltip messageTooltip={`Eliminar`}>
          <IconButton
            aria-label="delete"
            onClick={() => {
              console.log(params);
              //setFileId(params.row);
              //setOpenDeleteModal(true);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </MuiTooltip>
      ),

      hideSortIcons: true,
      sortable: false,
    },
  ];
  return (
    <Container>
      <Grid
        container
        spacing={2}
        sx={{ marginTop: "5px", alignItems: "center" }}
      >
        <Grid item container xs={8} sm={6} md={4} lg={3} xl={3}>
          <Typography component="h1" variant="h4">
            {LABELS.CUSTOMERS}
          </Typography>
        </Grid>
        <Grid
          item
          spacing={2}
          container
          xs={4}
          sm={6}
          md={8}
          lg={9}
          xl={9}
          sx={{
            justifyContent: "flex-end",
          }}
        >
          <MuiTooltip messageTooltip={`${LABELS.ADD} ${LABELS.CUSTOMER}`}>
            <Button
              variant="contained"
              startIcon={<PersonAddIcon />}
              // onClick={() => setOpenModal(true)}
            >
              {LABELS.ADD}
            </Button>
          </MuiTooltip>
        </Grid>
      </Grid>
      <Card>
        <Grid>
          <DataGrid
            columns={dataColumns}
            rows={response?.customers ?? []}
            sx={{
              height: 500,
            }}
            loading={isLoading}
            disableColumnSelector
            disableColumnMenu
            initialState={{
              filter: {
                filterModel: {
                  items: [],
                  quickFilterExcludeHiddenColumns: true,
                },
              },
              pagination: {
                paginationModel: {
                  pageSize: 1,
                },
              },
            }}
            slots={{
              toolbar: CustomSearchToolbar,
              noRowsOverlay: () => <NoRows itemName={LABELS.CUSTOMERS} />,
              noResultsOverlay: () => <NoRows itemName={LABELS.CUSTOMERS} />,
              loadingOverlay: () => <SkeletonGrid />,
            }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
              },
              pagination: {
                labelRowsPerPage: "Filas por página:",
              },
            }}
            paginationMode="server"
            pageSizeOptions={[30, 40, 50, 60, 100]}
            paginationModel={pagination}
            onPaginationModelChange={(pages: GridPaginationModel) =>
              setPagination(pages)
            }
            onFilterModelChange={filterDataGrid}
            onSortModelChange={sortDataGrid}
            rowCount={response?.total ?? 0}
            keepNonExistentRowsSelected
          />
        </Grid>
      </Card>
    </Container>
  );
}
