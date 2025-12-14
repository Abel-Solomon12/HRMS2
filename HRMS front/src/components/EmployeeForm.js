import React, { useState, useEffect } from "react";
import { getJSON, postJSON } from "../api";

export default function EmployeeForm() {
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    department_id: "",
    designation: "",
    salary: "",
  });

  useEffect(() => {
    (async () => {
      const d = await getJSON("/departments/");
      setDepartments(d);
    })();
  }, []);

  function change(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit(e) {
    e.preventDefault();
    const payload = { ...form };
    if (payload.salary === "") delete payload.salary;
    await postJSON("/employees/", payload);
    alert("Employee created");
    setForm({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      department_id: "",
      designation: "",
      salary: "",
    });
  }

  return (
    <form onSubmit={submit} className="card">
      <div>
        <input
          name="first_name"
          placeholder="First name"
          value={form.first_name}
          onChange={change}
          required
        />
        <input
          name="last_name"
          placeholder="Last name"
          value={form.last_name}
          onChange={change}
          required
        />
      </div>
      <div>
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={change}
          required
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={change}
        />
      </div>
      <div>
        <select
          name="department_id"
          value={form.department_id}
          onChange={change}
        >
          <option value="">--Select department--</option>
          {departments.map((d) => (
            <option key={d.department_id} value={d.department_id}>
              {d.name}
            </option>
          ))}
        </select>
        <input
          name="designation"
          placeholder="Designation"
          value={form.designation}
          onChange={change}
        />
        <input
          name="salary"
          placeholder="Salary"
          type="number"
          value={form.salary}
          onChange={change}
        />
      </div>
      <div>
        <button type="submit">Add Employee</button>
      </div>
    </form>
  );
}
