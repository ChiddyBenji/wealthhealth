import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import DataTable from "../components/Table/DataTable";
import { Link } from "react-router-dom";

function EmployeeList() {
  const employees = useSelector((state) => state.employees.list);

  // États pour recherche, pagination, et nombre de lignes
  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Colonnes de la table
  const columns = useMemo(
    () => [
      { header: "First Name", accessorKey: "firstName" },
      { header: "Last Name", accessorKey: "lastName" },
      { header: "Start Date", accessorKey: "startDate" },
      { header: "Department", accessorKey: "department" },
      { header: "Date of Birth", accessorKey: "birthDate" },
      { header: "Street", accessorKey: "street" },
      { header: "City", accessorKey: "city" },
      { header: "State", accessorKey: "state" },
      { header: "Zip Code", accessorKey: "zipCode" },
    ],
    []
  );

  // Filtrage par recherche (name, department, etc.)
  const filteredEmployees = useMemo(() => {
    if (!search) return employees;
    return employees.filter((emp) =>
      Object.values(emp).some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, employees]);

  // Pagination
  const totalPages = Math.ceil(filteredEmployees.length / entriesPerPage);
  const paginatedEmployees = useMemo(() => {
    const start = (currentPage - 1) * entriesPerPage;
    const end = start + entriesPerPage;
    return filteredEmployees.slice(start, end);
  }, [filteredEmployees, currentPage, entriesPerPage]);

  return (
    <div>
      <h1>Current Employees</h1>

      {/* Controls */}
      <div
        className="table-controls"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        {/* Show Entries */}
        <div>
          <label>
            Show{" "}
            <select
              value={entriesPerPage}
              onChange={(e) => {
                setEntriesPerPage(Number(e.target.value));
                setCurrentPage(1); // reset to first page
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
        </div>

        {/* Search */}
        <div>
          <label>
            Search:{" "}
            <input
              type="search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1); // reset page on search
              }}
              placeholder="Search employees..."
            />
          </label>
        </div>
      </div>

      {/* Data Table */}
      <DataTable columns={columns} data={paginatedEmployees} />

      {/* Showing entries + Pagination */}
      <div
        style={{
          marginTop: "1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
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

      <Link to="/" style={{ display: "block", marginTop: "2rem" }}>
        Home
      </Link>
    </div>
  );
}

export default EmployeeList;
