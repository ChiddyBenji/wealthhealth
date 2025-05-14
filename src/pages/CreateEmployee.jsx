import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addEmployee } from "../features/employees/employeeSlice";
import CustomDatePicker from "../components/DatePicker/CustomDatePicker";
import CustomModal from "../components/Modal/CustomModal";
import states from "../annex/usState";
import { Link } from "react-router-dom";

import CustomDropdown from "../components/Dropdown/CustomDropdown";

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
      <form onSubmit={handleSubmit}>
        <label>First Name</label>
        <input
          type="text"
          value={form.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
          required
        />

        <label>Last Name</label>
        <input
          type="text"
          value={form.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
          required
        />

        <label>Date of Birth</label>
        <CustomDatePicker
          selectedDate={form.birthDate}
          onChange={(date) => handleChange("birthDate", date)}
        />

        <label>Start Date</label>
        <CustomDatePicker
          selectedDate={form.startDate}
          onChange={(date) => handleChange("startDate", date)}
        />

        <fieldset>
          <legend>Address</legend>

          <label>Street</label>
          <input
            type="text"
            value={form.street}
            onChange={(e) => handleChange("street", e.target.value)}
          />

          <label>City</label>
          <input
            type="text"
            value={form.city}
            onChange={(e) => handleChange("city", e.target.value)}
          />

          <CustomDropdown
            label="State"
            value={form.state}
            onChange={(val) => handleChange("state", val)}
            options={states.map((state) => ({
              label: state.name,
              value: state.abbreviation,
            }))}
          />

          <label>Zip Code</label>
          <input
            type="number"
            value={form.zipCode}
            onChange={(e) => handleChange("zipCode", e.target.value)}
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
        />

        <button type="submit">Save</button>
      </form>

      <CustomModal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        Employee Created!
      </CustomModal>
    </div>
  );
}

export default CreateEmployee;
