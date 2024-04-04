import { Button, Card, Container, Grid } from "@mui/material";
import { LABELS } from "../../constants";
import MuiTitle from "../../components/Basics/MuiTitle";
import MuiTooltip from "../../components/MuiTooltip/MuiTooltip";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import NoRows from "../../components/Grid/NoRows";
import SkeletonGrid from "../../components/Grid/SkeletonGrid";
import { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { FormProviderCreateBrand } from "../../utils/validationsSchemas/brand.validation";
import AddEditBrandModal from "../../components/Brands/AddEditBrand";
import useGetUsers from "../../hooks/users/useGetUsers";
import { usersAdapater } from "../../adapters";

export default function Users() {
  const [addEditModal, setAddEditModal] = useState<boolean>(false);

  const [pagination, setPagination] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 20,
  });

  const { data: brands, isLoading, refetch } = useGetUsers();
  const rowsUsers = brands ? usersAdapater(brands) : [];
  const dataColumns: GridColDef[] = [
    {
      field: "userName",
      headerName: LABELS.USER,
      flex: 1,
    },
    {
      field: "name",
      headerName: LABELS.NAME,
      minWidth: 50,
      flex: 1,
    },
    {
      field: "lastName",
      headerName: LABELS.LAST_NAME,
      minWidth: 50,
      flex: 1,
    },
    {
      field: "secondLastName",
      headerName: LABELS.SECOND_LAST_NAME,
      minWidth: 50,
      flex: 1,
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
          <MuiTitle title={LABELS.USERS} />
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
          <MuiTooltip messageTooltip={`${LABELS.ADD} ${LABELS.BRAND}`}>
            <Button
              variant="contained"
              startIcon={<AddCircleIcon />}
              onClick={() => setAddEditModal(true)}
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
            rows={rowsUsers ? rowsUsers : []}
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
              //   toolbar: CustomSearchToolbar,
              noRowsOverlay: () => <NoRows itemName={LABELS.APPLIANCES} />,
              noResultsOverlay: () => <NoRows itemName={LABELS.APPLIANCES} />,
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
            paginationMode="client"
            pageSizeOptions={[5, 10, 15, 20, 50, 100]}
            paginationModel={pagination}
            onPaginationModelChange={(pages: GridPaginationModel) =>
              setPagination(pages)
            }
            onFilterModelChange={() => {
              setPagination((paginationState) => ({
                ...paginationState,
                page: 0,
              }));
            }}
          />
        </Grid>
      </Card>

      <FormProviderCreateBrand>
        <AddEditBrandModal
          openModal={addEditModal}
          setOpenModal={setAddEditModal}
          refetch={refetch}
        />
      </FormProviderCreateBrand>
    </Container>
  );
}
