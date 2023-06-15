import React, { useState } from 'react';
import { BsFillSendFill, BsFillPlusCircleFill } from 'react-icons/bs';
import { MdPersonSearch } from 'react-icons/md';

interface User {
  id: number;
  name: string;
  email: string;
  balance: number;
  credit: number;
  memberSince: string;
}

export function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [balance, setBalance] = useState(0);
  const [credit, setCredit] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddUser = () => {
    setIsModalOpen(true);
  };

  const handleSaveUser = () => {
    const newUser: User = {
      id: users.length + 1,
      name,
      email,
      balance,
      credit,
      memberSince: new Date().toISOString(),
    };
    setUsers([...users, newUser]);
    setName('');
    setEmail('');
    setBalance(0);
    setCredit(0);
    setIsModalOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter users based on search term
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setUsers(filteredUsers);
  };

  return (
    <div>
      <h1 className="text-center">User Management</h1>
      <button
        type="button"
        onClick={handleAddUser}
        className="px-4 py-2 bg-green-500 text-white border-none rounded-md cursor-pointer absolute top-8 right-0 mt-20 mr-60"
      >
        <BsFillSendFill /> Add User
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-max p-4 rounded-md">
            <h2 className="text-lg font-bold mb-4">Add User</h2>
            <form>
              <label className="block mb-2">
                Name:
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border border-gray-300 rounded-md px-2 py-1"
                />
              </label>
              <label className="block mb-2">
                Email:
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-gray-300 rounded-md px-2 py-1"
                />
              </label>
              <label className="block mb-2">
                Balance:
                <input
                  type="number"
                  value={balance}
                  onChange={(e) => setBalance(Number(e.target.value))}
                  className="border border-gray-300 rounded-md px-2 py-1"
                />
              </label>
              <label className="block mb-2">
                Credit:
                <input
                  type="number"
                  value={credit}
                  onChange={(e) => setCredit(Number(e.target.value))}
                  className="border border-gray-300 rounded-md px-2 py-1"
                />
              </label>
              <button
                type="button"
                onClick={handleSaveUser}
                className="px-4 py-2 bg-green-500 text-white border-none rounded-md cursor-pointer"
              >
                <BsFillPlusCircleFill /> Add
              </button>
            </form>
          </div>
        </div>
      )}

      <form onSubmit={handleSearch}>

        <input
          type="text"
          value={searchTerm}
          placeholder='Search Name ... '
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md px-2 py-1 mr-1"
        />

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white border-none rounded-md cursor-pointer"
        >
          <MdPersonSearch /> Search
        </button>
      </form>
      <table className="w-full border-collapse mt-2">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Balance</th>
            <th className="p-2">Credit</th>
            <th className="p-2">Member Since</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">{user.balance}</td>
              <td className="p-2 border">{user.credit}</td>
              <td className="p-2 border">{user.memberSince}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
