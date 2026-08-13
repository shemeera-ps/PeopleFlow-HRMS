import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { allDepartments } from "../api/departmentApi";
import DataTable from "../../../components/tables/DataTable";
import { PeopleAlt } from "@mui/icons-material";
import BadgeIcon from "@mui/icons-material/Badge";

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
  const columns = [
    { key: "name", label: "Title", sortable: true },
    { key: "description", label: "Description" },
    {
      key: "analysis",
      label: "Analysis",
      render: (row) => (
        <div className="flex justify-center gap-x-2">
          <div className="">
            <p>
              <strong>Employees : </strong>
              <span>{row.users_count}</span>
            </p>
          </div>
          <div className="">
            <p>
              <strong>Designations : </strong>
              <span>{row.designations_count}</span>
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "action",
      label: "Action",
      sortable: false,
      render: (row) => (
        <div className="flex justify-center gap-x-2">
          <button
            title="designations"
            className="p-2 bg-blue-800 text-blue-100 rounded font-semibold"
          >
            <NavLink to={`/departments/designations/${row.id}`}>
              <BadgeIcon />
            </NavLink>
          </button>
        </div>
      ),
    },
  ];
  async function fetchDepartments() {
    try {
      setIsLoading(true);
      const response = await allDepartments({
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
    fetchDepartments();
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
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Departments
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              listing all departments under People Flow
            </p>
          </div>
          <NavLink
            to="/departments/new"
            className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 transition-colors"
          >
            Create New
          </NavLink>
        </div>

        <DataTable
          columns={columns}
          data={rows}
          loading={isLoading}
          loadingTitle="Loading Departments..."
          page={page}
          pageSize={perPage}
          totalItems={totalItems}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
          onPageSizeChange={handlePageSizeChange}
          onPageChange={setPage}
          onSearchChange={handleSearchChange}
          searchPlaceholder="Search departments..."
          emptyMessage="No records are  found."
        />
      </div>
    </div>
  );
}
