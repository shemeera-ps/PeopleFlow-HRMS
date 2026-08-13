import { DeleteForever, Edit, Update } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { deleteBranch, listBranches } from "../api/branchApi";
import DataTable from "../../../components/tables/DataTable";
import { NavLink } from "react-router-dom";
import ConfirmationModal from "../../../components/common/ConfirmationModal";

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
  const [selectedBranchId, setSelectedBranchId] = useState(null);

  function handleDeleteClick(branchId) {
    setShowDeleteModal(true);
    setSelectedBranchId(branchId);
  }
  async function handleDeleteConfirm() {
    const response = await deleteBranch(selectedBranchId);
    if (response.success) {
      setRows((prevRows) =>
        prevRows.filter((row) => row.id !== selectedBranchId),
      );
      toast.success(response.message);
      setShowDeleteModal(false);
      setSelectedBranchId(null);
    }
  }
  function handleDeleteCancel() {
    setSelectedBranchId(null);
    setShowDeleteModal(false);
  }
  const columns = [
    { key: "name", label: "Name", sortable: true },
    { key: "address", label: "Address" },
    { key: "city", label: "City" },
    {
      key: "state",
      label: "State",
    },
    { key: "country", label: "Country" },
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
  async function fetchBranches() {
    try {
      setIsLoading(true);
      const response = await listBranches({
        sort_order: sortOrder,
        sort_by: sortBy,
        name: search,
        per_page: perPage,
      });
      if (response.success) {
        setRows(response.data.data);
        setTotalItems(response.data.total);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchBranches();
  }, [page, search, perPage, sortBy, sortOrder]);
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
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              All Branches
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              listing all branches under People Flow
            </p>
          </div>
          <NavLink
            to="/branches/create"
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
          searchPlaceholder="Search Branches..."
          emptyMessage="No branches are  found."
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
