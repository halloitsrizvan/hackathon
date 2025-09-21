import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { useUser } from '../../store/UserContext';

const data = {
  
  investmentData: {
    totalInvested: '$75,000',
    activeInvestments: 5,
    returns: '$8,250',
    investmentHistory: [
      { name: 'Jan', value: 2000 },
      { name: 'Feb', value: 2500 },
      { name: 'Mar', value: 3000 },
      { name: 'Apr', value: 3500 },
      { name: 'May', value: 4000 },
      { name: 'Jun', value: 4500 },
    ],
  },
  borrowedData: {
    totalBorrowed: '$32,000',
    loansActive: 2,
    repaidAmount: '$15,000',
  },
  savingsData: {
    totalSavings: '$42,000',
    bank: 'Community Credit Union',
    lastDeposit: 'October 28, 2023',
    savingsBreakdown: [
      { name: 'Checking', value: 12000 },
      { name: 'Savings', value: 30000 },
    ],
  },
};

const pieChartData = [
  { name: 'Repaid', value: 15000 },
  { name: 'Outstanding', value: 17000 },
];

const COLORS = ['#22c55e', '#ef4444'];


const Profile = () => {
  const {  investmentData, borrowedData, savingsData } = data;
 const {userData}=useUser()
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* User Info Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-start col-span-1 lg:col-span-2">
          <h2 className="text-xl font-bold text-gray-800 mb-4">User Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 w-full">
            <div>
              <p className="text-gray-500 text-sm">Username</p>
              <p className="text-lg font-semibold text-gray-800">{userData.username}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Email</p>
              <p className="text-lg font-semibold text-gray-800">{userData.email}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Location</p>
              <p className="text-lg font-semibold text-gray-800">{userData.mahal}, {userData.country}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Occupation</p>
              <p className="text-lg font-semibold text-gray-800">{userData.occupation}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Age</p>
              <p className="text-lg font-semibold text-gray-800">{userData.age}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Account ID</p>
              <p className="text-lg font-semibold text-gray-800">{userData.id}</p>
            </div>
          </div>
        </div>

        {/* Investment & Savings Card */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Financial Overview</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 text-sm">Total Invested</p>
              <p className="text-lg font-semibold text-green-500">{investmentData.totalInvested}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Savings</p>
              <p className="text-lg font-semibold text-blue-500">{savingsData.totalSavings}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Borrowed</p>
              <p className="text-lg font-semibold text-red-500">{borrowedData.totalBorrowed}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Repaid Amount</p>
              <p className="text-lg font-semibold text-gray-800">{borrowedData.repaidAmount}</p>
            </div>
          </div>
        </div>
        
        {/* Investment History Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6 col-span-1 md:col-span-2">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Investment Performance (Last 6 Months)</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={investmentData.investmentHistory} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#2563eb" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Borrowed/Repaid Pie Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6 col-span-1 lg:col-span-1 flex flex-col items-center">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Loan Status</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default Profile;
