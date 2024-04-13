import React from "react";
import { Table } from "react-bootstrap";

const UserTable = ({ users, onCheckboxChange }) => {
  return (
    // Using react-bootstrap Table for styling
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>User</th>
          {/* Dynamically create headers for each card */}
          {Array.from({ length: 4 }, (_, i) => (
            <th key={i}>Card {i + 1}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* Mapping over each user to create a row */}
        {users.map((user) => (
          <tr key={user.id}>
            {/* Displaying the user's name */}
            <td>{user.name}</td>
            {/* Mapping over the user's access array to create checkboxes */}
            {user.access.map((checked, index) => (
              <td key={index}>
                {/* Checkbox to represent the access. It triggers onCheckboxChange on change */}
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onCheckboxChange(user.id, index)}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UserTable;
