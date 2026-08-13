import { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { createDepartment } from "../api/departmentApi";

export function Create() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      setErrors({});
      if (!name.trim() || !description.trim() || !code.trim()) {
        toast.error("Please fill all the fields");
        return;
      }
      const payload = {
        name,
        description,
        code,
      };
      const response = await createDepartment(payload);
      if (response.success) {
        toast.success(response.message);
        setName("");
        setDescription("");
        setCode("");
        setErrors({});
      } else {
        setErrors(response.errors || {});
        toast.error("Failed to create department,Please try again");
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
              Create New Department
            </h1>
          </div>
          <NavLink
            to={"/departments/list"}
            className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 transition-colors"
          >
            Go Back
          </NavLink>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <form className="px-8 py-7 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Title
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
                htmlFor="description"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Description
              </label>
              <div className="relative">
                <textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder=""
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 pr-10 text-sm text-slate-800 placeholder-slate-400 outline-none transition-colors focus:border-slate-500 focus:bg-white focus:ring-2 focus:ring-slate-200"
                ></textarea>
              </div>
            </div>
            <div>
              <label
                htmlFor="code"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Department Code
              </label>
              <div className="relative">
                <input
                  id="code"
                  name="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
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
