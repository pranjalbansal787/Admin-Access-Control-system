import React, { useState, useEffect } from 'react';
import UserTable from './UserTable';
import CardDisplay from './CardDisplay';
import SaveButton from './SaveButton';
import UserDropdown from './UserDropdown';
import './AccessControlPage.css';

const AccessControlPage = () => {
    // Load users from localStorage or use default if no data exists
    const initialUsers = JSON.parse(localStorage.getItem('users')) || [
        { id: 1, name: 'User 1', access: [true, false, false, true] },
        { id: 2, name: 'User 2', access: [false, true, true, false] },
        { id: 3, name: 'User 3', access: [false, true, false, true] },
        { id: 4, name: 'User 4', access: [true, false, true, false] }
    ];

    const [users, setUsers] = useState(initialUsers);
    const [stagedUsers, setStagedUsers] = useState(initialUsers);
    const [selectedUser, setSelectedUser] = useState(initialUsers[0]);
    const [pendingChangeMessage, setPendingChangeMessage] = useState('');
    const [hasChanges, setHasChanges] = useState(false);

    // Function to update state and local storage
    const updateStateAndStorage = (updatedUsers) => {
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        setUsers(updatedUsers);
    };

    // Effect to update state when local storage changes
    useEffect(() => {
        const handleStorageChange = () => {
            const updatedUsers = JSON.parse(localStorage.getItem('users')) || [];
            setUsers(updatedUsers);
            // setStagedUsers(updatedUsers);
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [setUsers]);

    // Handling checkbox change for user access
    const handleCheckboxChange = (userId, cardIndex) => {
        const updatedStagedUsers = stagedUsers.map(user => {
            if (user.id === userId) {
                const updatedAccess = [...user.access];
                updatedAccess[cardIndex] = !updatedAccess[cardIndex];
                return { ...user, access: updatedAccess };
            }
            return user;
        });

        // Update staged users and set hasChanges to true
        setStagedUsers(updatedStagedUsers);
        setHasChanges(true);

        // Determine if the user will gain or lose access
        const accessChange = updatedStagedUsers.find(user => user.id === userId).access[cardIndex] ? 'gain' : 'lose';
        setPendingChangeMessage(`Upon saving, ${updatedStagedUsers.find(user => user.id === userId).name} will ${accessChange} access to Card ${cardIndex + 1}. Click on Save in order to proceed`);
    };

    // Handling save changes action
    const handleSaveChanges = () => {
        if (!hasChanges) {
            alert('Nothing to save. Select an action in order to continue.');
            return;
        }
        // Save staged changes to users and localStorage
        updateStateAndStorage(stagedUsers);
        setPendingChangeMessage('');
        setHasChanges(false);
        alert('User access settings have been saved successfully');
    };

    // Create a message about user access
    const createAccessMessage = (user) => {
        const accessList = user.access.map((hasAccess, index) => hasAccess ? `Card ${index + 1}` : null).filter(Boolean);
        return accessList.length === 0 ? `${user.name} currently has no access.` : `${user.name} currently has access to ${accessList.join(', ')}`;
    };

    // Effect to update selectedUser when users or selectedUser.id change
    useEffect(() => {
        setSelectedUser(users.find(user => user.id === selectedUser.id));
    }, [users, selectedUser.id]);

    // Check if the pending change message indicates a loss of access
    const isLoseMessage = pendingChangeMessage.includes("lose");

    // Render the component
    return (
        <div className="access-control-container">
            {/* User dropdown and save button */}
            <div className="CTA-options">
                <UserDropdown
                    users={users}
                    selectedUser={selectedUser}
                    onSelectUser={(user) => setSelectedUser(user)}
                />
                <SaveButton onSave={handleSaveChanges} />
            </div>
            {/* Display pending change message with optional styling for loss */}
            {pendingChangeMessage && <div className={`message ${isLoseMessage ? 'message-loose' : ''}`}>{pendingChangeMessage}</div>}
            {/* User table with checkboxes */}
            <div className="all-users">All Users</div>
            <UserTable
                users={stagedUsers}
                onCheckboxChange={handleCheckboxChange}
            />
            {/* Display current user's access information */}
            <div className="access-message">
                {createAccessMessage(selectedUser)}
            </div>
            {/* Display the cards based on the current user's access */}
            <CardDisplay access={selectedUser.access} />
        </div>
    );
};

export default AccessControlPage;
