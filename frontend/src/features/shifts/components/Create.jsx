import { useState } from "react";
import { toast } from "react-toastify";
import { createShift } from "../api/shiftApi";
import { NavLink } from "react-router-dom";

export function Create() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [breakDuration, setBreakDuration] = useState("");
  const [gracePeriod, setGracePeriod] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (
        !trim(name) ||
        !trim(code) ||
        !trim(startTime) ||
        !trim(endTime) ||
        !trim(breakDuration) ||
        !trim(gracePeriod) ||
        !trim(description)
      ) {
        toast.error("Please fill all the fields");
        return;
      }
      const payload = {
        name,
        code,
        start_time: startTime,
        end_time: endTime,
        break_duration: breakDuration,
        grace_period: gracePeriod,
        description,
      };
      const response = await createShift(payload);
      if (response.success) {
        toast.success(response.message);
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
              Create New Shift
            </h1>
          </div>
          <NavLink
            to={`/shifts/list`}
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
                Name
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
                {errors?.name && (
                  <p className="text-red-800 font-semibold">{errors.name}</p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="code"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Code
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
                {errors?.code && (
                  <p className="text-red-800 font-semibold">{errors.code}</p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="startTime"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Start Time
              </label>
              <div className="relative">
                <input
                  id="startTime"
                  name="startTime"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  type="time"
                  placeholder=""
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 pr-10 text-sm text-slate-800 placeholder-slate-400 outline-none transition-colors focus:border-slate-500 focus:bg-white focus:ring-2 focus:ring-slate-200"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="endTime"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                End Time
              </label>
              <div className="relative">
                <input
                  id="endTime"
                  name="endTime"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  type="time"
                  placeholder=""
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 pr-10 text-sm text-slate-800 placeholder-slate-400 outline-none transition-colors focus:border-slate-500 focus:bg-white focus:ring-2 focus:ring-slate-200"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="breakDuration"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Break Duration (in minutes)
              </label>
              <div className="relative">
                <input
                  name="breakDuration"
                  id="breakDuration"
                  value={breakDuration}
                  onChange={(e) => setBreakDuration(e.target.value)}
                  placeholder=""
                  type="number"
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 pr-10 text-sm text-slate-800 placeholder-slate-400 outline-none transition-colors focus:border-slate-500 focus:bg-white focus:ring-2 focus:ring-slate-200"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="gracePeriod"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Grace Period (In minutes)
              </label>
              <div className="relative">
                <input
                  name="grace_period"
                  id="gracePeriod"
                  value={gracePeriod}
                  onChange={(e) => setGracePeriod(e.target.value)}
                  type="number"
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
                  name="description"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 pr-10 text-sm text-slate-800 placeholder-slate-400 outline-none transition-colors focus:border-slate-500 focus:bg-white focus:ring-2 focus:ring-slate-200"
                ></textarea>
              </div>
            </div>
            <div className="pt-3 flex items-center gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 rounded-lg bg-slate-800 text-white text-sm font-medium py-2.5 hover:bg-slate-700 active:scale-[0.99] transition-all"
              >
                {isSubmitting ? "Creating..." : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
