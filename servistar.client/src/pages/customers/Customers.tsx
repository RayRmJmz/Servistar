import { Button, Card, Container, Grid, IconButton } from "@mui/material";
import { LABELS, customerResponseDefaultValues } from "../../constants";
import MuiTooltip from "../../components/MuiTooltip/MuiTooltip";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useCallback, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridPaginationModel,
  GridSortDirection,
  GridSortModel,
} from "@mui/x-data-grid";
import useCustomerPagination from "../../hooks/customers/useCustomersPagination";
import { customersPaginationAdapter } from "../../adapters";
import NoRows from "../../components/Grid/NoRows";
import SkeletonGrid from "../../components/Grid/SkeletonGrid";
import CustomSearchToolbar from "../../components/Grid/CustomSearchToolbar";
import AddEditCustomerModal from "../../components/Customers/AddEditCustomerModal";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import DeActivateCustomerModal from "../../components/Customers/DeActivateCuscomerModal";
import { ICustomerResponse } from "../../models";
import PersonIcon from "@mui/icons-material/Person";
import { FormProviderCreateCustomer } from "../test/testConfig";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CustomerDetailModal from "../../components/Customers/CustomerDetailModal";
import MuiTitle from "../../components/Basics/MuiTitle";
export default function Customers() {
  const [addEditModal, setAddEditModal] = useState<boolean>(false);
  const [deactivateModal, setDeactivateModal] = useState<boolean>(false);
  const [openDetailModal, setOpenDetailModal] = useState<boolean>(false);
  const [customerData, setCustomerData] = useState<ICustomerResponse>(
    customerResponseDefaultValues
  );
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
    refetch,
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
      field: "id",
      headerName: "Id",
      minWidth: 50,
      flex: 1,
    },
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
      field: "status",
      headerName: "Estatus",
      minWidth: 100,
      hideSortIcons: true,
      sortable: false,
      flex: 1,
    },
    {
      field: "action",
      headerName: "",

      renderCell: (params) => (
        <>
          <MuiTooltip messageTooltip={LABELS.SEE_DETAIL}>
            <IconButton
              aria-label="deactivate"
              onClick={() => {
                setCustomerData(params.row);
                setOpenDetailModal(true);
              }}
            >
              <RemoveRedEyeIcon />
            </IconButton>
          </MuiTooltip>
          <MuiTooltip
            messageTooltip={
              params.row.isActive ? LABELS.DEACTIVATE : LABELS.ACTIVATE
            }
          >
            <IconButton
              aria-label="deactivate"
              onClick={() => {
                setCustomerData(params.row);
                setDeactivateModal(true);
              }}
            >
              {params.row.isActive ? <PersonOffIcon /> : <PersonIcon />}
            </IconButton>
          </MuiTooltip>
        </>
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
          <MuiTitle title={LABELS.CUSTOMERS} />
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
      <FormProviderCreateCustomer>
        <AddEditCustomerModal
          openModal={addEditModal}
          setOpenModal={setAddEditModal}
          onSuccess={refetch}
        />
      </FormProviderCreateCustomer>
      <DeActivateCustomerModal
        openModal={deactivateModal}
        setOpenModal={setDeactivateModal}
        refetch={refetch}
        customer={customerData}
      />

      <CustomerDetailModal
        openModal={openDetailModal}
        setOpenModal={setOpenDetailModal}
        customer={customerData}
      />
    </Container>
  );
}
