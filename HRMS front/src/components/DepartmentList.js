import React, { useEffect, useState } from "react";
import { getJSON, postJSON } from "../api";

export default function DepartmentList() {
  const [list, setList] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  async function load() {
    try {
      const data = await getJSON("departments/");
      setList(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load departments:", error);
      setList([]);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function add(e) {
    e.preventDefault();

    const data = {
      department_id: name.toLowerCase().replace(/\s+/g, "-"),
      name,
      description: desc,
    };

    try {
      await postJSON("departments/", data);
      setName("");
      setDesc("");
      load();
    } catch (error) {
      console.error("Failed to add department:", error);
    }
  }

  return (
    <div>
      <form onSubmit={add} className="card">
        <input
          placeholder="Department name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button type="submit">Add Department</button>
      </form>

      <ul>
        {list.length === 0 ? (
          <li>No departments found.</li>
        ) : (
          list.map((d) => (
            <li key={d.department_id}>
              <strong>{d.name}</strong> — {d.description || "-"}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
