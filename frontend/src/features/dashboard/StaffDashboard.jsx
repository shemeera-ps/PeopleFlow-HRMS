import { useState, useEffect } from "react";
import { useAuth } from "../auth/contexts/AuthContext";
import { getUser } from "../employees/api/employeeApi";
import {
  Card,
  CardContent,
  Avatar,
  Chip,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";
const EMPLOYEE_SESSION = {
  id: "EMP-2026-089",
  name: "Ananya Rao",
  email: "ananya.rao@nexushr.com",
  avatar: "https://unsplash.com",
  meta: {
    department: "Engineering",
    designation: "Frontend Engineer",
    reportingManager: "Arjun Mehta (Lead Architect)",
    joiningDate: "March 12, 2024",
    location: "Kochi, India",
  },
  stats: {
    leavesLeft: 14,
    attendanceRate: "98.4%",
    trainingHours: 32,
  },
  tasks: [
    {
      id: 1,
      title: "Optimize HRMS Dashboard Rendering",
      status: "In Progress",
      priority: "High",
    },
    {
      id: 2,
      title: "Fix Flexbox Table Overflow Bug",
      status: "Completed",
      priority: "Medium",
    },
    {
      id: 3,
      title: "Review Code PR #402 (Leave Approval Module)",
      status: "Pending",
      priority: "Low",
    },
  ],
  announcements: [
    { id: 1, title: "Annual Performance Cycle Kickoff", date: "Today" },
    {
      id: 2,
      title: "Scheduled Server Maintenance (Down for 2 hours)",
      date: "August 15",
    },
  ],
};

export default function StaffDashboard() {
  const [profile, setProfile] = useState(EMPLOYEE_SESSION);
  const [tasks, setTasks] = useState(EMPLOYEE_SESSION.tasks);

  const { user } = useAuth();
  async function getUserProfile() {
    try {
      const response = await getUser(user?.id);
      if (response.success) {
        setProfile(response.data);
      }
    } catch (error) {
      console.log("Error fetching user profile:", error);
    }
  }

  useEffect(() => {
    getUserProfile(user?.id);
  }, [user]);

  // Toggle Task Completion State locally
  const toggleTaskStatus = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === "Completed" ? "Pending" : "Completed",
            }
          : task,
      ),
    );
  };

  // Helper function to color code task priority chips using MUI color palettes
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "error";
      case "Medium":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-8">
      {/* Profile Card Header Banner using MUI Card and Tailwind Flex */}
      <Card
        variant="outlined"
        className="rounded-2xl border-slate-200/80 shadow-sm mb-6 bg-white"
      >
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
            <Avatar
              src={profile.profile_picture || "https://unsplash.com"}
              alt={profile.name}
              sx={{ width: 80, height: 80 }}
              className="ring-4 ring-slate-100 shadow-sm"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-slate-900 mb-1">
                {profile.name}
              </h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-4">
                <span className="text-sm text-slate-500 font-medium">
                  {profile?.designation?.name || "N/A"}
                </span>
                <span className="text-slate-300">•</span>
                <Chip
                  label={profile.department?.name || "N/A"}
                  color="primary"
                  size="small"
                  variant="soft"
                  className="bg-blue-50 text-blue-700 font-semibold text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-500 border-t border-slate-100 pt-4">
                <div>
                  <strong className="text-slate-700">ID:</strong>{" "}
                  {profile.employee_code}
                </div>
                <div>
                  <strong className="text-slate-700">Manager:</strong>{" "}
                  {profile.manager?.name || "N/A"}
                </div>
                <div>
                  <strong className="text-slate-700">Branch:</strong>{" "}
                  {profile?.branch?.name || "N/A"}
                </div>
                <div>
                  <strong className="text-slate-700">Shift:</strong>{" "}
                  {profile?.shift?.name || "N/A"}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metric Aggregates Strip */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card
          variant="outlined"
          className="rounded-xl border-slate-200/80 shadow-sm bg-white"
        >
          <CardContent className="p-5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Available Leave Balance
            </span>
            <div className="text-2xl font-bold text-blue-600">
              {profile?.stats?.leavesLeft || "N/A"} Days
            </div>
          </CardContent>
        </Card>

        <Card
          variant="outlined"
          className="rounded-xl border-slate-200/80 shadow-sm bg-white"
        >
          <CardContent className="p-5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Attendance This Month
            </span>
            <div className="text-2xl font-bold text-emerald-600">
              {profile?.stats?.attendanceRate || "N/A"}
            </div>
          </CardContent>
        </Card>

        <Card
          variant="outlined"
          className="rounded-xl border-slate-200/80 shadow-sm bg-white"
        >
          <CardContent className="p-5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              L&D Upskilling Track
            </span>
            <div className="text-2xl font-bold text-purple-600">
              {profile?.stats?.trainingHours || "N/A"} Hours
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Operational Split Pane Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column Pane: Individual Assigned Work Items using MUI List */}
        <Card
          variant="outlined"
          className="rounded-2xl border-slate-200/80 shadow-sm lg:col-span-2 bg-white"
        >
          <CardContent className="p-6">
            <h3 className="text-base font-bold text-slate-900 mb-4">
              My Strategic Action Items
            </h3>
            <List className="p-0 space-y-3">
              {tasks?.length !== 0 &&
                tasks?.map((task) => (
                  <ListItem
                    key={task.id}
                    className="bg-slate-50/70 border border-slate-100 rounded-xl px-4 py-2 flex justify-between items-center"
                    disablePadding
                  >
                    <div className="flex items-center">
                      <ListItemIcon className="min-w-0 mr-2">
                        <Checkbox
                          edge="start"
                          checked={task.status === "Completed"}
                          tabIndex={-1}
                          disableRipple
                          onChange={() => toggleTaskStatus(task.id)}
                          color="primary"
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={task.title}
                        primaryTypographyProps={{
                          className: `text-sm font-medium ${task.status === "Completed" ? "line-through text-slate-400" : "text-slate-800"}`,
                        }}
                      />
                    </div>
                    <Chip
                      label={task.priority}
                      size="small"
                      color={getPriorityColor(task.priority)}
                      variant={task.priority === "Low" ? "outlined" : "filled"}
                      className="text-[10px] font-bold uppercase tracking-wider scale-90"
                    />
                  </ListItem>
                ))}
            </List>
          </CardContent>
        </Card>

        {/* Right Column Pane: Global Announcements Notice Board */}
        <Card
          variant="outlined"
          className="rounded-2xl border-slate-200/80 shadow-sm bg-white"
        >
          <CardContent className="p-6">
            <h3 className="text-base font-bold text-slate-900 mb-4">
              Company Announcements
            </h3>
            <div className="space-y-4">
              {/* Fallback to an empty array to safely map without crashes */}
              {(profile?.announcements || []).map(
                (announcement, index, array) => (
                  <div key={announcement.id || index}>
                    <div className="border-l-4 border-blue-500 pl-4 py-0.5">
                      <span className="text-[11px] font-bold text-blue-600 block mb-1">
                        {announcement.date}
                      </span>
                      <h4 className="text-sm font-semibold text-slate-800 mb-1">
                        {announcement.title}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Please check your functional company email inbox for
                        full timelines.
                      </p>
                    </div>

                    {/* Safer lookahead using the native third 'array' parameter */}
                    {index < array.length - 1 && <Divider className="mt-4" />}
                  </div>
                ),
              )}

              {/* Empty state fallback handling */}
              {(!profile?.announcements ||
                profile.announcements.length === 0) && (
                <p className="text-xs text-slate-400 text-center py-4">
                  No recent announcements.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
