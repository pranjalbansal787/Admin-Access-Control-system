import React from 'react';
import { Dropdown } from 'react-bootstrap';
import './UserDropdown.css';

const UserDropdown = ({ users, selectedUser, onSelectUser }) => {
    return (
        // Using react-bootstrap Dropdown for a user selection dropdown menu
        <Dropdown>
            {/* Dropdown Toggle shows the currently selected user's name */}
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                {selectedUser.name}
            </Dropdown.Toggle>

            {/* Dropdown Menu containing a list of users */}
            <Dropdown.Menu>
                {/* Mapping over the users array to create a dropdown item for each user */}
                {users.map((user) => (
                    <Dropdown.Item
                        key={user.id}
                        onClick={() => onSelectUser(user)} // Set the clicked user as the selected user
                    >
                        {user.name} {/* Displaying the name of the user */}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default UserDropdown;
