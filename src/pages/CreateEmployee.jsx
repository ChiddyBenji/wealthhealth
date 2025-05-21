import React, { useState, Suspense } from "react";
import { useDispatch } from "react-redux";
import { addEmployee } from "../features/employees/employeeSlice";
import states from "../annex/usState";
import { Link } from "react-router-dom";
import "../App.scss";
import "custom-dropdown-react-bl/dist/CustomDropdown.css";

const CustomDropdown = React.lazy(() => import("custom-dropdown-react-bl"));
const CustomDatePicker = React.lazy(() =>
  import("../components/DatePicker/CustomDatePicker")
);
const CustomModal = React.lazy(() => import("../components/Modal/CustomModal"));

const departments = [
  "Sales",
  "Marketing",
  "Engineering",
  "Human Resources",
  "Legal",
];

function CreateEmployee() {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    birthDate: null,
    startDate: null,
    street: "",
    city: "",
    state: "",
    zipCode: "",
    department: "",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const preparedEmployee = {
      ...form,
      birthDate: form.birthDate ? form.birthDate.toISOString() : null,
      startDate: form.startDate ? form.startDate.toISOString() : null,
    };

    dispatch(addEmployee(preparedEmployee));
    setModalOpen(true);
  };

  return (
    <div className="create-employee">
      <h1>HRnet</h1>
      <Link to="/employees">View Current Employees</Link>

      <h2>Create Employee</h2>

      <Suspense fallback={<div>Loading form...</div>}>
        <form onSubmit={handleSubmit}>
          <label>First Name</label>
          <input
            type="text"
            value={form.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            required
            placeholder="Enter first name"
          />

          <label>Last Name</label>
          <input
            type="text"
            value={form.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            required
            placeholder="Enter last name"
          />

          <label htmlFor="birth-date">Date of Birth</label>
          <CustomDatePicker
            id="birth-date"
            selectedDate={form.birthDate}
            onChange={(date) => handleChange("birthDate", date)}
            aria-label="Date of birth"
          />

          <label htmlFor="start-date">Start Date</label>
          <CustomDatePicker
            id="start-date"
            selectedDate={form.startDate}
            onChange={(date) => handleChange("startDate", date)}
            aria-label="Start date"
          />

          <fieldset>
            <legend>Address</legend>

            <label>Street</label>
            <input
              type="text"
              value={form.street}
              onChange={(e) => handleChange("street", e.target.value)}
              placeholder="Street address"
            />

            <label>City</label>
            <input
              type="text"
              value={form.city}
              onChange={(e) => handleChange("city", e.target.value)}
              placeholder="City"
            />

            <CustomDropdown
              label="State"
              value={form.state}
              onChange={(val) => handleChange("state", val)}
              options={states.map((state) => ({
                label: state.name,
                value: state.abbreviation,
              }))}
              placeholder="Select a state"
            />

            <label>Zip Code</label>
            <input
              type="number"
              value={form.zipCode}
              onChange={(e) => handleChange("zipCode", e.target.value)}
              placeholder="ZIP code"
            />
          </fieldset>

          <CustomDropdown
            label="Department"
            value={form.department}
            onChange={(val) => handleChange("department", val)}
            options={departments.map((dep) => ({
              label: dep,
              value: dep,
            }))}
            placeholder="Select a department"
          />

          <button type="submit">Save</button>
        </form>

        <CustomModal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          Employee Created!
        </CustomModal>
      </Suspense>
    </div>
  );
}

export default CreateEmployee;
