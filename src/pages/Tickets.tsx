import React, { useState } from 'react';
import { useThemeStore, useTicketsStore, useClientsStore } from '../lib/store';
import { Search, Plus, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

export default function Tickets() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const { tickets, addTicket, updateTicket, filterStatus, setFilterStatus } = useTicketsStore();
  const { clients } = useClientsStore();
  const [isAddingTicket, setIsAddingTicket] = useState(false);
  const [formData, setFormData] = useState({
    clientId: '',
    deviceType: '',
    issue: '',
    priority: 'medium' as const,
    cost: 0,
    technicianId: '',
    status: 'pending' as const,
  });

  const filteredTickets = tickets.filter(
    (ticket) => filterStatus === 'all' || ticket.status === filterStatus
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTicket(formData);
    setIsAddingTicket(false);
    setFormData({
      clientId: '',
      deviceType: '',
      issue: '',
      priority: 'medium',
      cost: 0,
      technicianId: '',
      status: 'pending',
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'in-progress':
        return <AlertTriangle className="h-5 w-5 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Repair Tickets
        </h1>
        <button
          onClick={() => setIsAddingTicket(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          New Ticket
        </button>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setFilterStatus('all')}
          className={`px-4 py-2 rounded-md ${
            filterStatus === 'all'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilterStatus('pending')}
          className={`px-4 py-2 rounded-md ${
            filterStatus === 'pending'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilterStatus('in-progress')}
          className={`px-4 py-2 rounded-md ${
            filterStatus === 'in-progress'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          In Progress
        </button>
        <button
          onClick={() => setFilterStatus('completed')}
          className={`px-4 py-2 rounded-md ${
            filterStatus === 'completed'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Completed
        </button>
      </div>

      {isAddingTicket && (
        <div className={`rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow p-6`}>
          <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Create New Ticket
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Client
              </label>
              <select
                value={formData.clientId}
                onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              >
                <option value="">Select a client</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Device Type
              </label>
              <input
                type="text"
                value={formData.deviceType}
                onChange={(e) => setFormData({ ...formData, deviceType: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Issue Description
              </label>
              <textarea
                value={formData.issue}
                onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as 'low' | 'medium' | 'high' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Estimated Cost
              </label>
              <input
                type="number"
                value={formData.cost}
                onChange={(e) => setFormData({ ...formData, cost: Number(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setIsAddingTicket(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Create Ticket
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid gap-6">
        {filteredTickets.map((ticket) => {
          const client = clients.find((c) => c.id === ticket.clientId);
          return (
            <div
              key={ticket.id}
              className={`rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow p-6`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(ticket.status)}
                    <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {client?.name} - {ticket.deviceType}
                    </h3>
                  </div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {ticket.issue}
                  </p>
                  <div className="mt-2 flex gap-4">
                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Priority: {ticket.priority}
                    </span>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Cost: ${ticket.cost}
                    </span>
                  </div>
                </div>
                <select
                  value={ticket.status}
                  onChange={(e) =>
                    updateTicket(ticket.id, {
                      status: e.target.value as 'pending' | 'in-progress' | 'completed',
                    })
                  }
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}