import { useState } from "react";
import DataTable from "../../../components/tables/DataTable";
import { NavLink } from "react-router-dom";
import ConfirmationModal from "../../../components/common/ConfirmationModal";
import { useEffect } from "react";
import { allShifts, deleteShift } from "../api/shiftApi";
import { toast } from "react-toastify";
import { DeleteForever, Edit } from "@mui/icons-material";

export function List() {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [totalItems, setTotalItems] = useState(0);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedShiftId, setSelectedShiftId] = useState(null);

  async function fetchShifts() {
    setIsLoading(true);
    try {
      const response = await allShifts({
        page,
        perPage,
        search,
        sortBy,
        sortOrder,
      });
      if (response.success) {
        console.log(response);
        setRows(response.data.data);
        setTotalItems(response.data.total);
      }
    } catch {
      setRows([]);
      setTotalItems(0);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchShifts();
  }, []);
  function handlePageSizeChange(value) {
    setPerPage(value);
  }
  function handleSortChange(key) {
    if (sortBy === key) {
      setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
    setPage(1);
  }

  function handleSearchChange(value) {
    setSearch(value);
    setPage(1);
  }
  function handleDeleteClick(branchId) {
    setShowDeleteModal(true);
    setSelectedShiftId(branchId);
  }
  async function handleDeleteConfirm() {
    const response = await deleteShift(selectedShiftId);
    if (response.success) {
      setRows((prevRows) =>
        prevRows.filter((row) => row.id !== selectedShiftId),
      );
      toast.success(response.message);
      setShowDeleteModal(false);
      setSelectedShiftId(null);
    }
  }
  function handleDeleteCancel() {
    setSelectedShiftId(null);
    setShowDeleteModal(false);
  }
  const columns = [
    { key: "name", label: "Name", sortable: true },
    {
      key: "start_time",
      label: "Start Time",
      sortable: true,
    },
    {
      key: "end_time",
      label: "End Time",
      sortable: true,
    },
    {
      key: "break_duration",
      label: "Break Duration (Minutes)",
      sortable: true,
    },
    {
      key: "grace_period",
      label: "Grace Period (Minutes)",
      sortable: true,
    },
    {
      key: "description",
      label: "Description",
      sortable: true,
    },
    {
      key: "action",
      label: "Action",
      sortable: false,
      render: (row) => (
        <div className="flex justify-center gap-x-2">
          <button
            className="p-2 bg-red-800 text-red-100 rounded font-semibold"
            title="Delete"
            onClick={() => handleDeleteClick(row.id)}
          >
            <DeleteForever />
          </button>
          <NavLink
            to={`/branches/update/${row.id}`}
            className="p-2 bg-blue-800 text-blue-100 rounded font-semibold"
            title="Edit"
          >
            <Edit />
          </NavLink>
        </div>
      ),
    },
  ];
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              All Shifts
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              listing all employee work shifts under People Flow
            </p>
          </div>
          <NavLink
            to="/shifts/create"
            className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 transition-colors"
          >
            Create New
          </NavLink>
        </div>
        <DataTable
          columns={columns}
          data={rows}
          loading={isLoading}
          page={page}
          pageSize={perPage}
          totalItems={totalItems}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
          onPageSizeChange={handlePageSizeChange}
          onPageChange={setPage}
          onSearchChange={handleSearchChange}
          searchPlaceholder="Search Shifts..."
          emptyMessage="No shifts are  found."
        />
      </div>
      {showDeleteModal && (
        <ConfirmationModal
          isOpen={showDeleteModal}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </div>
  );
}
