import React, { useState } from 'react';
import { useThemeStore, useTicketsStore } from '../lib/store';

interface TicketFormProps {
  clientId?: string;
  onSubmit: () => void;
  onCancel: () => void;
  editingTicket?: string | null;
  initialData?: {
    deviceType: string;
    brand: string;
    task: string;
    issue: string;
    cost: number;
    passcode: string;
    status: 'pending' | 'in-progress' | 'completed';
  };
}

export default function TicketForm({ clientId, onSubmit, onCancel, editingTicket, initialData }: TicketFormProps) {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const { settings, addTicket, updateTicket, addDeviceType, addBrand, addTask } = useTicketsStore();

  const [newDeviceType, setNewDeviceType] = useState('');
  const [newBrand, setNewBrand] = useState('');
  const [newTask, setNewTask] = useState('');
  const [formData, setFormData] = useState({
    deviceType: initialData?.deviceType || '',
    brand: initialData?.brand || '',
    task: initialData?.task || '',
    issue: initialData?.issue || '',
    cost: initialData?.cost || 0,
    passcode: initialData?.passcode || '',
    status: initialData?.status || 'pending' as const,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTicket) {
      updateTicket(editingTicket, { ...formData, clientId });
    } else {
      addTicket({ ...formData, clientId: clientId!, technicianId: '' });
    }
    onSubmit();
  };

  const handleAddDeviceType = () => {
    if (newDeviceType.trim()) {
      addDeviceType(newDeviceType.trim());
      setFormData({ ...formData, deviceType: newDeviceType.trim() });
      setNewDeviceType('');
    }
  };

  const handleAddBrand = () => {
    if (newBrand.trim()) {
      addBrand(newBrand.trim());
      setFormData({ ...formData, brand: newBrand.trim() });
      setNewBrand('');
    }
  };

  const handleAddTask = () => {
    if (newTask.trim()) {
      addTask(newTask.trim());
      setFormData({ ...formData, task: newTask.trim() });
      setNewTask('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Device Type
        </label>
        <div className="flex gap-2">
          <select
            value={formData.deviceType}
            onChange={(e) => setFormData({ ...formData, deviceType: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            <option value="">Select device type</option>
            {settings.deviceTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <div className="flex gap-2 items-start mt-1">
            <input
              type="text"
              value={newDeviceType}
              onChange={(e) => setNewDeviceType(e.target.value)}
              placeholder="New type"
              className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={handleAddDeviceType}
              className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      <div>
        <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Brand
        </label>
        <div className="flex gap-2">
          <select
            value={formData.brand}
            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            <option value="">Select brand</option>
            {settings.brands.map((brand) => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
          <div className="flex gap-2 items-start mt-1">
            <input
              type="text"
              value={newBrand}
              onChange={(e) => setNewBrand(e.target.value)}
              placeholder="New brand"
              className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={handleAddBrand}
              className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      <div>
        <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Task
        </label>
        <div className="flex gap-2">
          <select
            value={formData.task}
            onChange={(e) => setFormData({ ...formData, task: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            <option value="">Select task</option>
            {settings.tasks.map((task) => (
              <option key={task} value={task}>{task}</option>
            ))}
          </select>
          <div className="flex gap-2 items-start mt-1">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="New task"
              className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={handleAddTask}
              className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      <div>
        <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Passcode (Optional)
        </label>
        <input
          type="text"
          value={formData.passcode}
          onChange={(e) => setFormData({ ...formData, passcode: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Issue Description (Optional)
        </label>
        <textarea
          value={formData.issue}
          onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
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
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          {editingTicket ? 'Update Ticket' : 'Create Ticket'}
        </button>
      </div>
    </form>
  );
}