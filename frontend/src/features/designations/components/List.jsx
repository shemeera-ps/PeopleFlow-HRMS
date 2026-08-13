import { useEffect, useState } from "react";
import DataTable from "../../../components/tables/DataTable";
import { NavLink, useParams } from "react-router-dom";
import {
  deleteDesignation,
  designationUnderDepartment,
} from "../api/designationApi";
import { DeleteForever } from "@mui/icons-material";
import ConfirmationModal from "../../../components/common/ConfirmationModal";
import { toast } from "react-toastify";
import { getDepartment } from "../../departments/api/departmentApi";

export const List = () => {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [totalItems, setTotalItems] = useState(0);
  const [department, setDepartment] = useState({});

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDesignation, setSelectedDesignation] = useState(null);

  const { id } = useParams();
  async function fetchDesignations(departmentId) {
    const response = await designationUnderDepartment(departmentId);
    setRows(response.data);
  }
  async function fetchDepartment(departmentId) {
    const response = await getDepartment(departmentId);
    if (response.success) {
      setDepartment(response.data);
    }
  }
  useEffect(() => {
    fetchDepartment(id);
  }, [id]);

  useEffect(() => {
    fetchDesignations(id);
  }, [id]);
  const columns = [
    { key: "name", label: "Title", sortable: true },
    { key: "description", label: "Description" },
    {
      key: "action",
      label: "Action",
      sortable: false,
      render: (row) => (
        <div className="flex justify-center gap-x-2">
          <button
            className="p-2 bg-red-800 text-red-100"
            onClick={() => handleDesignation(row.id)}
          >
            <DeleteForever />
          </button>
        </div>
      ),
    },
  ];
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
  function handleDesignation(value) {
    setSelectedDesignation(value);
    setShowDeleteModal(true);
  }
  async function handleDeleteDesignation() {
    const response = await deleteDesignation(selectedDesignation);
    if (response.success) {
      toast.success(response.message);
      fetchDesignations(id);
    } else {
      toast.error(response.message);
    }
    setSelectedDesignation(null);
    setShowDeleteModal(false);
  }
  function handleCancelDelete() {
    setSelectedDesignation(null);
    setShowDeleteModal(false);
  }
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Designations
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              listing all designations under{" "}
              <span className="text-red-800 font-semibold">
                {department?.name ?? "People Flow"}
              </span>
            </p>
          </div>
          <NavLink
            to="/departments/list"
            className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-red-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 transition-colors"
          >
            Go Back
          </NavLink>
          <NavLink
            to={`/departments/designations/new/${id}`}
            className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 transition-colors"
          >
            Create New
          </NavLink>
        </div>
        <DataTable
          columns={columns}
          data={rows}
          loading={isLoading}
          loadingTitle="Loading Designations..."
          page={page}
          pageSize={perPage}
          totalItems={totalItems}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
          onPageSizeChange={handlePageSizeChange}
          onPageChange={setPage}
          onSearchChange={handleSearchChange}
          searchPlaceholder="Search designations..."
          emptyMessage="No records are  found."
        />
      </div>
      {showDeleteModal && (
        <ConfirmationModal
          isOpen={showDeleteModal}
          onConfirm={handleDeleteDesignation}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};
