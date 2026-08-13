import DashboardLayout from "./DashboardLayout";
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
export default function StaffDashboard() {
  return (
    <DashboardLayout>
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
    </DashboardLayout>
  );
}
