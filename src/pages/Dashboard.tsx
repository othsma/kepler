import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Wrench, DollarSign, Clock, CheckCircle } from 'lucide-react';
import { useThemeStore } from '../lib/store';

const data = [
  { name: 'Mon', sales: 4000, repairs: 2400 },
  { name: 'Tue', sales: 3000, repairs: 1398 },
  { name: 'Wed', sales: 2000, repairs: 9800 },
  { name: 'Thu', sales: 2780, repairs: 3908 },
  { name: 'Fri', sales: 1890, repairs: 4800 },
  { name: 'Sat', sales: 2390, repairs: 3800 },
  { name: 'Sun', sales: 3490, repairs: 4300 },
];

const stats = [
  { name: 'Daily Sales', value: '$2,435', icon: DollarSign, color: 'bg-green-500' },
  { name: 'Pending Repairs', value: '12', icon: Clock, color: 'bg-yellow-500' },
  { name: 'Completed Repairs', value: '48', icon: CheckCircle, color: 'bg-blue-500' },
];

export default function Dashboard() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className={`rounded-lg ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } shadow p-6`}
          >
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-full`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className={`text-sm font-medium ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {stat.name}
                </p>
                <p className={`text-2xl font-semibold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={`rounded-lg ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } shadow p-6`}>
        <h2 className={`text-lg font-semibold mb-6 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Weekly Performance
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#4F46E5" />
              <Bar dataKey="repairs" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className={`rounded-lg ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } shadow p-6`}>
          <h2 className={`text-lg font-semibold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Recent Repair Tickets
          </h2>
          {/* Add recent tickets list here */}
        </div>

        <div className={`rounded-lg ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } shadow p-6`}>
          <h2 className={`text-lg font-semibold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Recent Clients
          </h2>
          {/* Add recent clients list here */}
        </div>
      </div>
    </div>
  );
}