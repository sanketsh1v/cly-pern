import React, { useState } from 'react';
import { Search, Edit, Trash2 } from 'lucide-react';
import './ManageUsers.scss';

const ManageUsers = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Admin' },
    // Add more mock data as needed
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (id) => {
    // Implement edit functionality
    console.log('Edit user', id);
  };

  const handleDelete = (id) => {
    // Implement delete functionality
    console.log('Delete user', id);
  };

  return (
    <div className="manage-users">
      <h1>Manage Users</h1>
      
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <button className="search-button">
          <Search className="icon" />
          Search
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleEdit(user.id)} className="edit-button">
                  <Edit className="icon" />
                  Edit
                </button>
                <button onClick={() => handleDelete(user.id)} className="delete-button">
                  <Trash2 className="icon" />
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;