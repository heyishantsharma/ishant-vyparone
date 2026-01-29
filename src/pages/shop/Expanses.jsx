import { useState } from "react";
import { Plus, Search, Edit, Trash2, TrendingUp, DollarSign, PieChart } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line
} from "recharts";

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState([
    { id: 1, name: "Supplier Payment", category: "Inventory", amount: 15000, date: "2025-10-10", status: "Paid" },
    { id: 2, name: "Electricity Bill", category: "Utilities", amount: 4200, date: "2025-10-12", status: "Pending" },
    { id: 3, name: "Delivery Charges", category: "Logistics", amount: 3200, date: "2025-10-13", status: "Paid" },
    { id: 4, name: "Shop Maintenance", category: "Maintenance", amount: 8000, date: "2025-10-14", status: "Pending" },
  ]);

  const categoryData = [
    { category: "Inventory", amount: 40000 },
    { category: "Utilities", amount: 10000 },
    { category: "Maintenance", amount: 12000 },
    { category: "Logistics", amount: 8000 },
  ];

  const monthlyData = [
    { month: "Jan", expense: 22000 },
    { month: "Feb", expense: 18000 },
    { month: "Mar", expense: 25000 },
    { month: "Apr", expense: 21000 },
    { month: "May", expense: 27000 },
    { month: "Jun", expense: 30000 },
  ];

  const getStatusColor = (status) => {
    return status === "Paid"
      ? "bg-green-100 text-green-700"
      : "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="min-h-screen bg-green-50 py-10 px-4 sm:px-6 lg:px-8 mt-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Expenses Management</h1>
        <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 mt-4 sm:mt-0 transition">
          <Plus size={18} /> Add Expense
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white shadow-md rounded-2xl p-5 flex items-center justify-between">
          <div>
            <h3 className="text-gray-500 text-sm">Total Expenses</h3>
            <p className="text-2xl font-bold text-gray-800 mt-2">₹85,200</p>
          </div>
          <DollarSign size={40} className="text-green-600 opacity-80" />
        </div>

        <div className="bg-white shadow-md rounded-2xl p-5 flex items-center justify-between">
          <div>
            <h3 className="text-gray-500 text-sm">Paid Expenses</h3>
            <p className="text-2xl font-bold text-gray-800 mt-2">₹47,200</p>
          </div>
          <TrendingUp size={40} className="text-blue-600 opacity-80" />
        </div>

        <div className="bg-white shadow-md rounded-2xl p-5 flex items-center justify-between">
          <div>
            <h3 className="text-gray-500 text-sm">Pending Expenses</h3>
            <p className="text-2xl font-bold text-gray-800 mt-2">₹38,000</p>
          </div>
          <PieChart size={40} className="text-yellow-600 opacity-80" />
        </div>

        <div className="bg-white shadow-md rounded-2xl p-5 flex items-center justify-between">
          <div>
            <h3 className="text-gray-500 text-sm">This Month</h3>
            <p className="text-2xl font-bold text-gray-800 mt-2">₹12,400</p>
          </div>
          <DollarSign size={40} className="text-green-600 opacity-80" />
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        {/* Category Chart */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-4 text-gray-700">Expense by Category</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#16a34a" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Trend Chart */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-4 text-gray-700">Monthly Expense Trend</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="expense" stroke="#16a34a" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Expense Table */}
      <div className="bg-white shadow-md rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h2 className="text-lg font-bold text-gray-700 mb-3 sm:mb-0">All Expenses</h2>
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-sm w-40"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">Expense Name</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Amount (₹)</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((exp) => (
                <tr key={exp.id} className="border-b hover:bg-green-50 transition">
                  <td className="py-3 px-4">{exp.id}</td>
                  <td className="py-3 px-4">{exp.name}</td>
                  <td className="py-3 px-4">{exp.category}</td>
                  <td className="py-3 px-4 font-semibold text-gray-800">₹{exp.amount}</td>
                  <td className="py-3 px-4">{exp.date}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(exp.status)}`}>
                      {exp.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center flex justify-center gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition">
                      <Edit size={16} />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
