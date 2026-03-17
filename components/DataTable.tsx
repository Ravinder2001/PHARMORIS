"use client";

import { useState, useMemo, memo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
  SortingState,
  PaginationState,
} from "@tanstack/react-table";
import { ArrowUpDown, ArrowUp, ArrowDown, PackageSearch, Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { drugTableData } from "@/lib/data";
import { DrugRow, StockStatus } from "@/lib/types";

// ─── Status Badge ────────────────────────────────────────────────────────────

const statusStyles: Record<StockStatus, string> = {
  "In Stock": "bg-[#34C780]/10 text-[#34C780] ring-[#34C780]/20",
  "Low Stock": "bg-[#F59E0B]/10 text-[#F59E0B] ring-[#F59E0B]/20",
  "Out of Stock": "bg-[#EF4444]/10 text-[#EF4444] ring-[#EF4444]/20",
};

const StatusBadge = memo(function StatusBadge({ status }: { status: StockStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${statusStyles[status]}`}
    >
      <span
        className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
          status === "In Stock"
            ? "bg-[#34C780]"
            : status === "Low Stock"
            ? "bg-[#F59E0B]"
            : "bg-[#EF4444]"
        }`}
        aria-hidden="true"
      />
      {status}
    </span>
  );
});

// ─── Sort Icon ────────────────────────────────────────────────────────────────

const SortIcon = ({ isSorted }: { isSorted: false | "asc" | "desc" }) => {
  if (isSorted === "asc")
    return <ArrowUp className="ml-1.5 h-3.5 w-3.5 text-[#4F6EF7]" aria-hidden="true" />;
  if (isSorted === "desc")
    return <ArrowDown className="ml-1.5 h-3.5 w-3.5 text-[#4F6EF7]" aria-hidden="true" />;
  return (
    <ArrowUpDown className="ml-1.5 h-3.5 w-3.5 text-[#8B8FA8] opacity-50" aria-hidden="true" />
  );
};

// ─── Skeleton ─────────────────────────────────────────────────────────────────

const SkeletonRow = memo(function SkeletonRow() {
  return (
    <tr className="border-b border-gray-200 dark:border-[#1E1F28]">
      {[60, 44, 36, 28, 40].map((w, i) => (
        <td key={i} className="px-5 py-4">
          <div
            className="h-4 animate-pulse rounded bg-gray-200 dark:bg-[#1E1F28]"
            style={{ width: `${w}%` }}
          />
        </td>
      ))}
    </tr>
  );
});

// ─── Column helper (infer types per-column) ───────────────────────────────────

const columnHelper = createColumnHelper<DrugRow>();

// ─── DataTable ────────────────────────────────────────────────────────────────

interface DataTableProps {
  isLoading: boolean;
}

const DataTable = memo(function DataTable({ isLoading }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const formatDate = useCallback((iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }, []);

  // Let TypeScript infer the union type — do NOT annotate as ColumnDef<DrugRow, unknown>[]
  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Drug Name",
        cell: (info) => (
          <span className="font-medium text-gray-900 dark:text-[#F0F1F5]">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("manufacturer", {
        header: "Manufacturer",
        cell: (info) => (
          <span className="text-gray-500 dark:text-[#8B8FA8]">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("stockStatus", {
        header: "Stock Status",
        cell: (info) => <StatusBadge status={info.getValue()} />,
      }),
      columnHelper.accessor("priceChange", {
        header: "Price Change",
        cell: (info) => {
          const val = info.getValue();
          const isPos = val > 0;
          const isZero = val === 0;
          return (
            <span
              className={`font-medium tabular-nums ${
                isZero
                  ? "text-gray-500 dark:text-[#8B8FA8]"
                  : isPos
                  ? "text-[#34C780]"
                  : "text-[#EF4444]"
              }`}
            >
              {isZero ? "—" : `${isPos ? "+" : ""}${val.toFixed(1)}%`}
            </span>
          );
        },
      }),
      columnHelper.accessor("lastUpdated", {
        header: "Last Updated",
        cell: (info) => (
          <span className="text-sm text-gray-500 dark:text-[#8B8FA8]">
            {formatDate(info.getValue())}
          </span>
        ),
      }),
    ],
    [formatDate]
  );

  const table = useReactTable({
    data: drugTableData,
    columns,
    state: { sorting, globalFilter, pagination },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-[#1E1F28] dark:bg-[#111218] dark:shadow-none"
    >
      {/* Table Header & Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-[#1E1F28] gap-4">
        <div>
          <h2 className="text-sm font-semibold text-gray-900 dark:text-[#F0F1F5]">Drug Inventory</h2>
          <p className="mt-0.5 text-xs text-gray-500 dark:text-[#8B8FA8]">
            {drugTableData.length} drugs tracked · Click headers to sort
          </p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Search Input */}
          <div className="relative flex-1 sm:w-64">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-gray-400 dark:text-[#8B8FA8]" aria-hidden="true" />
            </div>
            <input
              type="text"
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="block w-full h-8 rounded-lg border border-gray-200 bg-gray-50 py-0 pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-500 focus:border-[#4F6EF7] focus:outline-none focus:ring-1 focus:ring-[#4F6EF7] dark:border-[#1E1F28] dark:bg-[#0A0B0F] dark:text-[#F0F1F5] dark:placeholder:text-[#8B8FA8] transition-colors"
              placeholder="Search drugs or brands..."
            />
          </div>

          <span className="hidden sm:inline-flex shrink-0 items-center justify-center h-8 rounded-full bg-gray-100 px-3 text-xs font-medium text-gray-500 dark:bg-[#1E1F28] dark:text-[#8B8FA8]">
            Live
          </span>
        </div>
      </div>

      {/* Scrollable Table */}
      <div className="overflow-x-auto">
        <table
          className="w-full min-w-[640px] table-auto"
          role="table"
          aria-label="Drug inventory table"
        >
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-gray-200 dark:border-[#1E1F28]">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    scope="col"
                    className={`px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-[#8B8FA8]
                      ${
                        header.column.getCanSort()
                          ? "cursor-pointer select-none hover:text-gray-900 dark:hover:text-[#C8CDE0] transition-colors duration-150"
                          : ""
                      }
                    `}
                    onClick={header.column.getToggleSortingHandler()}
                    aria-sort={
                      header.column.getIsSorted() === "asc"
                        ? "ascending"
                        : header.column.getIsSorted() === "desc"
                        ? "descending"
                        : "none"
                    }
                  >
                    <span className="flex items-center">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      <SortIcon isSorted={header.column.getIsSorted()} />
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            <AnimatePresence mode="wait">
              {isLoading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonRow key={`skeleton-${i}`} />
                ))
              ) : table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-16 text-center">
                    <PackageSearch
                      className="mx-auto mb-3 h-8 w-8 text-[#8B8FA8]/40"
                      aria-hidden="true"
                    />
                    <p className="text-sm text-[#8B8FA8]">No drugs found</p>
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="group cursor-pointer border-b border-gray-200 last:border-b-0 transition-colors duration-150 hover:bg-gray-50 dark:border-[#1E1F28] dark:hover:bg-[#1A1B24]"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-5 py-4 text-sm">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between border-t border-gray-200 px-6 py-3 dark:border-[#1E1F28]">
        {/* Page Size Selector */}
        <div className="flex items-center gap-2">
          <p className="text-xs text-gray-500 dark:text-[#8B8FA8]">Rows per page</p>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="rounded border border-gray-200 bg-gray-50 px-2 py-1 text-xs text-gray-900 focus:border-[#4F6EF7] focus:outline-none dark:border-[#1E1F28] dark:bg-[#0A0B0F] dark:text-[#F0F1F5]"
            aria-label="Select rows per page"
          >
            {[5, 10, 20, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>

        {/* Page Info & Controls */}
        <div className="flex items-center gap-4 animate-in fade-in">
          <div className="flex w-[100px] items-center justify-center text-xs font-medium text-gray-500 dark:text-[#8B8FA8]">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount() || 1}
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-gray-50 text-gray-500 transition-colors hover:bg-white disabled:pointer-events-none disabled:opacity-50 dark:border-[#1E1F28] dark:bg-[#0A0B0F] dark:text-[#8B8FA8] dark:hover:bg-[#13141D] cursor-pointer"
              aria-label="Go to first page"
            >
              <ChevronsLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-gray-50 text-gray-500 transition-colors hover:bg-white disabled:pointer-events-none disabled:opacity-50 dark:border-[#1E1F28] dark:bg-[#0A0B0F] dark:text-[#8B8FA8] dark:hover:bg-[#13141D] cursor-pointer"
              aria-label="Go to previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-gray-50 text-gray-500 transition-colors hover:bg-white disabled:pointer-events-none disabled:opacity-50 dark:border-[#1E1F28] dark:bg-[#0A0B0F] dark:text-[#8B8FA8] dark:hover:bg-[#13141D] cursor-pointer"
              aria-label="Go to next page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-gray-50 text-gray-500 transition-colors hover:bg-white disabled:pointer-events-none disabled:opacity-50 dark:border-[#1E1F28] dark:bg-[#0A0B0F] dark:text-[#8B8FA8] dark:hover:bg-[#13141D] cursor-pointer"
              aria-label="Go to last page"
            >
              <ChevronsRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export default DataTable;
