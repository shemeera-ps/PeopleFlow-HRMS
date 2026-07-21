import { useState } from "react";
import { useAuth } from "../auth/contexts/AuthContext";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const stats = [
  {
    label: "Total Revenue",
    value: "$48,290",
    change: "+12.4%",
    trend: "up",
    icon: AttachMoneyOutlinedIcon,
  },
  {
    label: "Active Users",
    value: "2,340",
    change: "+8.1%",
    trend: "up",
    icon: PeopleAltOutlinedIcon,
  },
  {
    label: "New Orders",
    value: "184",
    change: "-3.2%",
    trend: "down",
    icon: ShoppingCartOutlinedIcon,
  },
  {
    label: "Conversion Rate",
    value: "3.6%",
    change: "+0.4%",
    trend: "up",
    icon: InsightsOutlinedIcon,
  },
];

const recentActivity = [
  {
    id: 1,
    name: "Sarah Kim",
    action: "Placed an order",
    amount: "$249.00",
    time: "2m ago",
    status: "Completed",
  },
  {
    id: 2,
    name: "James Carter",
    action: "Requested refund",
    amount: "$89.00",
    time: "18m ago",
    status: "Pending",
  },
  {
    id: 3,
    name: "Priya Nair",
    action: "Placed an order",
    amount: "$412.50",
    time: "1h ago",
    status: "Completed",
  },
  {
    id: 4,
    name: "Liam Chen",
    action: "Updated subscription",
    amount: "$29.00",
    time: "3h ago",
    status: "Completed",
  },
  {
    id: 5,
    name: "Ana Ruiz",
    action: "Placed an order",
    amount: "$156.00",
    time: "5h ago",
    status: "Failed",
  },
];

const statusStyles = {
  Completed: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  Pending: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  Failed: "bg-rose-50 text-rose-700 ring-1 ring-rose-200",
};

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Welcome back, {user?.name ?? "there"}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Here's what's happening with your store today.
            </p>
          </div>
          <button className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 transition-colors">
            Export report
          </button>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(({ label, value, change, trend, icon: Icon }) => (
            <div
              key={label}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                  <Icon sx={{ fontSize: 20 }} className="text-slate-700" />
                </div>
                <span
                  className={`inline-flex items-center gap-1 text-xs font-medium ${
                    trend === "up" ? "text-emerald-600" : "text-rose-600"
                  }`}
                >
                  {trend === "up" ? (
                    <TrendingUpIcon sx={{ fontSize: 14 }} />
                  ) : (
                    <TrendingDownIcon sx={{ fontSize: 14 }} />
                  )}
                  {change}
                </span>
              </div>
              <p className="mt-4 text-2xl font-semibold text-slate-900">
                {value}
              </p>
              <p className="text-sm text-slate-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Chart + Summary row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  Revenue overview
                </h2>
                <p className="text-sm text-slate-500">Last 30 days</p>
              </div>
              <button className="text-slate-400 hover:text-slate-600">
                <MoreVertIcon sx={{ fontSize: 20 }} />
              </button>
            </div>
            {/* Chart placeholder — swap for Recharts/Chart.js */}
            <div className="h-64 rounded-xl bg-slate-50 border border-dashed border-slate-200 flex items-center justify-center text-sm text-slate-400">
              Chart component goes here
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900 mb-1">
              Quick actions
            </h2>
            <p className="text-sm text-slate-500 mb-5">
              Common tasks, one click away
            </p>
            <div className="space-y-2">
              {[
                "Add new product",
                "Invite team member",
                "View reports",
                "Manage billing",
              ].map((action) => (
                <button
                  key={action}
                  className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recent activity table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200">
            <h2 className="text-base font-semibold text-slate-900">
              Recent activity
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 border-b border-slate-100">
                  <th className="px-6 py-3 font-medium">Customer</th>
                  <th className="px-6 py-3 font-medium">Action</th>
                  <th className="px-6 py-3 font-medium">Amount</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Time</th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50"
                  >
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {row.name}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{row.action}</td>
                    <td className="px-6 py-4 text-slate-600">{row.amount}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[row.status]}`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
