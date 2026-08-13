import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import DataTable from "../../../components/tables/DataTable";
import { DeleteForever, ModeEdit, RemoveRedEye } from "@mui/icons-material";
import { toast } from "react-toastify";
import { list } from "../api/employeeApi";
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
  const [selectedUserId, setSelectedUserId] = useState(null);

  const columns = [
    { key: "name", label: "Name", sortable: true },
    { key: "employee_code", label: "Employee ID" },
    {
      key: "action",
      label: "Action",
      sortable: false,
      render: (row) => (
        <div className="flex justify-center gap-x-2">
          <button
            className="p-2 bg-red-800 text-red-100 rounded font-semibold"
            title="Delete"
            onClick={() => {
              setSelectedUserId(row.id);
              setShowDeleteModal(true);
            }}
          >
            <DeleteForever />
          </button>
          <button className="p-2 bg-blue-800 text-blue-100 rounded font-semibold">
            <NavLink to={`/employees/view/${row.id}`}>
              <RemoveRedEye />
            </NavLink>
          </button>
          <button className="p-2 bg-green-800 text-green-100 rounded font-semibold">
            <NavLink to={`/employees/edit/${row.id}`}>
              <ModeEdit />
            </NavLink>
          </button>
        </div>
      ),
    },
  ];
  async function fetchEmployees() {
    try {
      setIsLoading(true);
      const response = await list({
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
  async function handleDeleteUser() {
    const response = await removeUser(selectedUserId);
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
    setShowDeleteModal(false);
    setSelectedUserId(null);
    fetchEmployees();
  }
  function handleCancelDelete() {
    setShowDeleteModal(false);
    setSelectedUserId(null);
  }
  useEffect(() => {
    fetchEmployees();
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
              Employees List
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              listing all employees under People Flow
            </p>
          </div>
          <NavLink
            to="/employees/new"
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
          searchPlaceholder="Search employees..."
          emptyMessage="No employees are  found."
        />
      </div>
      {showDeleteModal && (
        <ConfirmationModal
          isOpen={showDeleteModal}
          title="Remove Selected User"
          confirmLabel="Remove User"
          onConfirm={handleDeleteUser}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}
