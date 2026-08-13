import { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { createBranch } from "../api/branchApi";

export function Create() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (
        !name.trim() ||
        !address.trim() ||
        !city.trim() ||
        !state.trim() ||
        !country.trim()
      ) {
        toast.error("Please fill all the fields");
        return;
      }
      const payload = {
        name,
        address,
        city,
        state,
        country,
      };
      const response = await createBranch(payload);
      if (response.success) {
        toast.success(response.message);
        setName("");
        setAddress("");
        setCity("");
        setState("");
        setCountry("");
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
              Create New Branch
            </h1>
          </div>
          <NavLink
            to={`/branches/list`}
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
                htmlFor="address"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Address
              </label>
              <div className="relative">
                <textarea
                  id="address"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder=""
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 pr-10 text-sm text-slate-800 placeholder-slate-400 outline-none transition-colors focus:border-slate-500 focus:bg-white focus:ring-2 focus:ring-slate-200"
                ></textarea>
              </div>
            </div>
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                City
              </label>
              <div className="relative">
                <input
                  id="city"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  type="text"
                  placeholder=""
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 pr-10 text-sm text-slate-800 placeholder-slate-400 outline-none transition-colors focus:border-slate-500 focus:bg-white focus:ring-2 focus:ring-slate-200"
                />
                {errors?.name && (
                  <p className="text-red-800 font-semibold">{errors.city}</p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="state"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                State
              </label>
              <div className="relative">
                <input
                  id="state"
                  name="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  type="text"
                  placeholder=""
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 pr-10 text-sm text-slate-800 placeholder-slate-400 outline-none transition-colors focus:border-slate-500 focus:bg-white focus:ring-2 focus:ring-slate-200"
                />
                {errors?.name && (
                  <p className="text-red-800 font-semibold">{errors.state}</p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Country
              </label>
              <div className="relative">
                <input
                  id="country"
                  name="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  type="text"
                  placeholder=""
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 pr-10 text-sm text-slate-800 placeholder-slate-400 outline-none transition-colors focus:border-slate-500 focus:bg-white focus:ring-2 focus:ring-slate-200"
                />
                {errors?.name && (
                  <p className="text-red-800 font-semibold">{errors.country}</p>
                )}
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
