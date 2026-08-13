import { useState, useEffect, useCallback } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { CircularProgress } from "@mui/material";

// Simple debounce hook — avoids firing a search request on every keystroke
function useDebouncedValue(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

/**
 * Reusable server-side DataTable.
 *
 * @param {Array} columns - [{ key, label, sortable, render?(row) }]
 * @param {Array} data - current page of rows
 * @param {boolean} loading
 * @param {number} page - current page (1-indexed)
 * @param {number} pageSize
 * @param {number} totalItems
 * @param {string} sortBy
 * @param {'asc'|'desc'} sortOrder
 * @param {(key: string) => void} onSortChange
 * @param {(page: number) => void} onPageChange
 * @param {(search: string) => void} onSearchChange
 * @param {string} searchPlaceholder
 * @param {string} emptyMessage
 * @param {(row) => string|number} rowKey - unique key extractor, defaults to row.id
 */
export default function DataTable({
  columns,
  data = [],
  loading = false,
  loadingTitle = "Loading...",
  page = 1,
  pageSize = 10,
  totalItems = 0,
  sortBy,
  sortOrder = "asc",
  onSortChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 25, 50, 100],
  onPageChange,
  onSearchChange,
  searchPlaceholder = "Search...",
  emptyMessage = "No records found.",
  rowKey = (row) => row.id,
}) {
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebouncedValue(searchInput);
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  // Fire search only after debounce settles, and skip the initial mount
  const isFirstRender = useCallback(() => {
    const ref = { current: true };
    return ref;
  }, [])();

  useEffect(() => {
    if (onSearchChange) onSearchChange(debouncedSearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  function handleSort(col) {
    if (!col.sortable || !onSortChange) return;
    onSortChange(col.key);
  }

  function renderSortIcon(col) {
    if (!col.sortable) return null;
    if (sortBy !== col.key) {
      return (
        <UnfoldMoreIcon sx={{ fontSize: 16 }} className="text-slate-300" />
      );
    }
    return sortOrder === "asc" ? (
      <ArrowUpwardIcon sx={{ fontSize: 16 }} className="text-slate-700" />
    ) : (
      <ArrowDownwardIcon sx={{ fontSize: 16 }} className="text-slate-700" />
    );
  }

  const startItem = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, totalItems);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Search bar */}
      {onSearchChange && (
        <div className="px-6 py-4 border-b border-slate-200">
          <div className="relative max-w-xs">
            <SearchIcon
              sx={{ fontSize: 18 }}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-300 transition-colors"
            />
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 border-b border-slate-100">
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col)}
                  className={`px-6 py-3 font-medium select-none ${
                    col.sortable ? "cursor-pointer hover:text-slate-700" : ""
                  }`}
                >
                  <span className="inline-flex items-center gap-1.5">
                    {col.label}
                    {renderSortIcon(col)}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              // Loading skeleton rows
              <tr className="border-b border-slate-50">
                <td colSpan={columns.length} className="h-48">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <CircularProgress size={28} />
                    <span className="text-sm text-slate-500">
                      {loadingTitle}
                    </span>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center text-slate-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr
                  key={rowKey(row)}
                  className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-4 text-slate-600">
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Footer: page-size selector + pagination */}
      {!loading && totalItems > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-slate-200">
          <div className="flex items-center gap-3">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-medium text-slate-700">{startItem}</span>–
              <span className="font-medium text-slate-700">{endItem}</span> of{" "}
              <span className="font-medium text-slate-700">{totalItems}</span>
            </p>

            {onPageSizeChange && (
              <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
                <label htmlFor="page-size" className="text-sm text-slate-500">
                  Rows per page
                </label>
                <select
                  id="page-size"
                  value={pageSize}
                  onChange={(e) => onPageSizeChange(Number(e.target.value))}
                  className="text-sm rounded-lg border border-slate-200 bg-slate-50 pl-2 pr-7 py-1.5 focus:outline-none focus:ring-2 focus:ring-slate-300 cursor-pointer"
                >
                  {pageSizeOptions.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {onPageChange && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onPageChange(page - 1)}
                disabled={page <= 1}
                className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeftIcon sx={{ fontSize: 18 }} />
              </button>
              <span className="text-sm text-slate-600 px-2">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => onPageChange(page + 1)}
                disabled={page >= totalPages}
                className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRightIcon sx={{ fontSize: 18 }} />
              </button>
            </div>
          )}
        </div>
      )}
      {/* Pagination */}
      {/* {onPageChange && !loading && totalItems > 0 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-medium text-slate-700">{startItem}</span>–
            <span className="font-medium text-slate-700">{endItem}</span> of{" "}
            <span className="font-medium text-slate-700">{totalItems}</span>
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page <= 1}
              className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeftIcon sx={{ fontSize: 18 }} />
            </button>
            <span className="text-sm text-slate-600 px-2">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page >= totalPages}
              className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRightIcon sx={{ fontSize: 18 }} />
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
}
