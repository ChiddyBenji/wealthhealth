import React, { useState, useMemo, Suspense } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../App.scss";

// Lazy import
const DataTable = React.lazy(() => import("../components/Table/DataTable"));

function EmployeeList() {
  const employees = useSelector((state) => state.employees.list);
  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    return new Intl.DateTimeFormat("fr-FR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date(isoDate));
  };

  const columns = useMemo(
    () => [
      { header: "First Name", accessorKey: "firstName" },
      { header: "Last Name", accessorKey: "lastName" },
      {
        header: "Start Date",
        accessorKey: "startDate",
        cell: (cell) => formatDate(cell.getValue()),
      },
      { header: "Department", accessorKey: "department" },
      {
        header: "Date of Birth",
        accessorKey: "birthDate",
        cell: (cell) => formatDate(cell.getValue()),
      },
      { header: "Street", accessorKey: "street" },
      { header: "City", accessorKey: "city" },
      { header: "State", accessorKey: "state" },
      { header: "Zip Code", accessorKey: "zipCode" },
    ],
    []
  );

  const filteredEmployees = useMemo(() => {
    if (!search) return employees;
    return employees.filter((emp) =>
      Object.values(emp).some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, employees]);

  const totalPages = Math.ceil(filteredEmployees.length / entriesPerPage);
  const paginatedEmployees = useMemo(() => {
    const start = (currentPage - 1) * entriesPerPage;
    const end = start + entriesPerPage;
    return filteredEmployees.slice(start, end);
  }, [filteredEmployees, currentPage, entriesPerPage]);

  return (
    <div className="employee-list">
      <h1>Current Employees</h1>

      <div className="table-controls">
        <label>
          Show{" "}
          <select
            value={entriesPerPage}
            onChange={(e) => {
              setEntriesPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            {[10, 25, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>{" "}
          entries
        </label>

        <label>
          Search:{" "}
          <input
            type="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search employees..."
          />
        </label>
      </div>

      <Suspense fallback={<div>Loading table...</div>}>
        <div className="table-wrapper">
          <DataTable columns={columns} data={paginatedEmployees} />
        </div>
      </Suspense>

      <div className="pagination-info">
        <div>
          {filteredEmployees.length > 0 ? (
            <p>
              Showing{" "}
              {Math.min(
                (currentPage - 1) * entriesPerPage + 1,
                filteredEmployees.length
              )}{" "}
              to{" "}
              {Math.min(currentPage * entriesPerPage, filteredEmployees.length)}{" "}
              of {filteredEmployees.length} entries
            </p>
          ) : (
            <p>Showing 0 to 0 of 0 entries</p>
          )}
        </div>

        <div>
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span style={{ margin: "0 1rem" }}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      <Link to="/" className="back-home">
        Home
      </Link>
    </div>
  );
}

export default EmployeeList;
