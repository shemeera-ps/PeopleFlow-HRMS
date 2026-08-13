import { useState } from "react";
import { validatePassword } from "../../../utils/ValidatePassword";
import { toast } from "react-toastify";
import { createUser } from "../api/employeeApi";
import { useNavigate } from "react-router-dom";

export function Create() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [employeeCode, setEmployeeCode] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  async function handleSubmit(e) {
    try {
      e.preventDefault();
      setIsSubmitting(true);
      if (
        !name.trim() ||
        !email.trim() ||
        !employeeCode.trim() ||
        !password.trim()
      ) {
        toast.error("Please fill all the fields");
        return;
      }
      if (!validatePassword(password)) {
        toast.error("Password does not follow required pattern");
        return;
      }
      const payload = {
        email,
        name,
        employee_code: employeeCode,
        password,
      };
      const response = await createUser(payload);
      if (response.success) {
        toast.success(response.message);
        setTimeout(() => {
          navigate("/employees/list");
        }, 2000);
      } else {
        toast.error(response.message);
      }
    } catch {
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Create New Employee
            </h1>
          </div>
          <button className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 transition-colors">
            Go Back
          </button>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <form className="px-8 py-7 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Employee Name
              </label>
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder=""
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 pr-10 text-sm text-slate-800 placeholder-slate-400 outline-none transition-colors focus:border-slate-500 focus:bg-white focus:ring-2 focus:ring-slate-200"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="employee_code"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Employee ID
              </label>
              <div className="relative">
                <input
                  id="employee_code"
                  name="employee_code"
                  value={employeeCode}
                  onChange={(e) => setEmployeeCode(e.target.value)}
                  type="text"
                  placeholder=""
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 pr-10 text-sm text-slate-800 placeholder-slate-400 outline-none transition-colors focus:border-slate-500 focus:bg-white focus:ring-2 focus:ring-slate-200"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Email
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder=""
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 pr-10 text-sm text-slate-800 placeholder-slate-400 outline-none transition-colors focus:border-slate-500 focus:bg-white focus:ring-2 focus:ring-slate-200"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="text"
                  placeholder=""
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 pr-10 text-sm text-slate-800 placeholder-slate-400 outline-none transition-colors focus:border-slate-500 focus:bg-white focus:ring-2 focus:ring-slate-200"
                />
              </div>
            </div>
            <div className="pt-3 flex items-center gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 rounded-lg bg-slate-800 text-white text-sm font-medium py-2.5 hover:bg-slate-700 active:scale-[0.99] transition-all"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
