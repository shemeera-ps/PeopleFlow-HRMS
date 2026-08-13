import { useEffect, useEffectEvent, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  getManagers,
  getUser,
  updateUser,
} from "../../employees/api/employeeApi";
import { toast } from "react-toastify";
import { allDepartments } from "../../departments/api/departmentApi";
import { designationUnderDepartment } from "../../designations/api/designationApi";
import { listAllBranches } from "../../branches/api/branchApi";
import { allShifts } from "../../shifts/api/shiftApi";

export function Edit() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [employeeCode, setEmployeeCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const [designations, setDesignations] = useState([]);
  const [selectedDesignation, setSelectedDesignation] = useState(null);

  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);

  const [shifts, setShifts] = useState([]);
  const [selectedShift, setSelectedShift] = useState(null);

  const [managers, setManagers] = useState([]);
  const [selectedManager, setSelectedManager] = useState(null);

  const navigate = useNavigate();

  const { id } = useParams("id");
  async function initialiseUser(userId) {
    try {
      setIsLoading(true);
      const response = await getUser(userId);
      const data = response.data;
      if (data) {
        setName(data.name);
        setEmail(data.email);
        setEmployeeCode(data.employee_code);
        setSelectedDepartment(data.department_id);
        setSelectedDesignation(data.designation_id);
        setSelectedBranch(data.branch_id);
        setSelectedShift(data.shift_id);
        setSelectedManager(data.manager_id);
      }
    } catch {
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    initialiseUser(id);
  }, [id]);
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      setErrors({});
      if (!email.trim() || !name.trim() || !employeeCode.trim()) {
        toast.error("Please fill all the fields");
        return;
      }

      const payload = {
        name,
        email,
        employee_code: employeeCode,
        department_id: selectedDepartment,
        designation_id: selectedDesignation,
        branch_id: selectedBranch,
        shift_id: selectedShift,
        manager_id: selectedManager,
      };
      const response = await updateUser(payload, id);
      if (response.success) {
        toast.success(response.message);
      } else {
        setErrors(response.errors || {});
        // if (!response.errors || Object.keys(response.errors).length === 0) {
        //   toast.error(response.message);
        // }
        toast.error("Failed to update user,Please try again");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }
  async function loadDepartments() {
    const response = await allDepartments();
    if (response.success) {
      setDepartments(response.data.data);
    }
  }
  useEffect(() => {
    loadDepartments();
  }, []);
  async function loadDesignations() {
    if (!selectedDepartment) return;
    const response = await designationUnderDepartment(selectedDepartment);
    if (response.success) {
      setDesignations(response.data);
    } else setDesignations([]);
  }
  useEffect(() => {
    loadDesignations();
  }, [selectedDepartment]);

  async function loadBranches() {
    const response = await listAllBranches();
    if (response.success) {
      setBranches(response.data);
    }
  }
  useEffect(() => {
    loadBranches();
  }, []);
  async function loadShifts() {
    const response = await allShifts();
    if (response.success) {
      setShifts(response.data.data);
    }
  }
  useEffect(() => {
    loadShifts();
  }, []);
  async function loadManagers() {
    const response = await getManagers({ target_user_id: id });
    if (response.success) {
      setManagers(response.data);
    }
  }
  useEffect(() => {
    loadManagers();
  }, []);
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Edit Employee Details
            </h1>
            {isLoading && (
              <p className="text-sm text-slate-500 mt-1">
                Loading Employee Details ...
              </p>
            )}
          </div>
          <NavLink
            to="/employees/list"
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
                  className={`w-full rounded-lg border  bg-slate-50 px-3.5 py-2.5 pr-10 text-sm text-slate-800 placeholder-slate-400 outline-none transition-colors focus:border-slate-500 focus:bg-white focus:ring-2 focus:ring-slate-200
                    ${errors.employee_code ? "border-red-300" : "border-slate-300"}`}
                />
                {errors.employee_code?.map((error, index) => (
                  <p key={index} className="mt-1 text-sm text-red-600">
                    {error}
                  </p>
                ))}
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
                  className={`w-full rounded-lg border  bg-slate-50 px-3.5 py-2.5 pr-10 text-sm text-slate-800 placeholder-slate-400 outline-none transition-colors focus:border-slate-500 focus:bg-white focus:ring-2 focus:ring-slate-200
                    ${errors.email ? "border-red-300" : "border-slate-300"}`}
                />
                {errors.email?.map((error, index) => (
                  <p key={index} className="mt-1 text-sm text-red-600">
                    {error}
                  </p>
                ))}
              </div>
            </div>
            <div>
              <label
                htmlFor="department"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Department
              </label>
              <div>
                <select
                  id="department"
                  className="w-full rounded-lg border bg-slate-50 px-3.5 py-2.5 pr-10 text-sm text-slate-800 placeholder-slate-400 outline-none transition-colors focus:border-slate-500 focus:bg-white focus:ring-2 focus:ring-slate-200
                  bg-slate-300"
                  name="department"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  <option value=""></option>
                  {departments?.length > 0 &&
                    departments.map((dept) => {
                      return (
                        <option value={dept.id} key={dept.id}>
                          {dept.name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="designation"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Designation
              </label>
              <div>
                <select
                  id="designation"
                  className="w-full rounded-lg border bg-slate-50 px-3.5 py-2.5 pr-10 text-sm text-slate-800 placeholder-slate-400 outline-none transition-colors focus:border-slate-500 focus:bg-white focus:ring-2 focus:ring-slate-200
                  bg-slate-300"
                  name="designation"
                  value={selectedDesignation}
                  onChange={(e) => setSelectedDesignation(e.target.value)}
                >
                  <option value=""></option>
                  {designations?.length > 0 &&
                    designations.map((des) => {
                      return (
                        <option value={des.id} key={des.id}>
                          {des.name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="branch"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Branch
              </label>
              <div>
                <select
                  id="branch"
                  className="w-full rounded-lg border bg-slate-50 px-3.5 py-2.5 pr-10 text-sm text-slate-800 placeholder-slate-400 outline-none transition-colors focus:border-slate-500 focus:bg-white focus:ring-2 focus:ring-slate-200
                  bg-slate-300"
                  name="branch"
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                >
                  <option value=""></option>
                  {branches?.length > 0 &&
                    branches.map((br) => {
                      return (
                        <option value={br.id} key={br.id}>
                          {br.name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="branch"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Shift
              </label>
              <div>
                <select
                  id="shift"
                  className="w-full rounded-lg border bg-slate-50 px-3.5 py-2.5 pr-10 text-sm text-slate-800 placeholder-slate-400 outline-none transition-colors focus:border-slate-500 focus:bg-white focus:ring-2 focus:ring-slate-200
                  bg-slate-300"
                  name="shift"
                  value={selectedShift}
                  onChange={(e) => setSelectedShift(e.target.value)}
                >
                  <option value=""></option>
                  {shifts?.length > 0 &&
                    shifts.map((sh) => {
                      return (
                        <option value={sh.id} key={sh.id}>
                          {sh.name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="branch"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Managers
              </label>
              <div>
                <select
                  id="manager"
                  className="w-full rounded-lg border bg-slate-50 px-3.5 py-2.5 pr-10 text-sm text-slate-800 placeholder-slate-400 outline-none transition-colors focus:border-slate-500 focus:bg-white focus:ring-2 focus:ring-slate-200
                  bg-slate-300"
                  name="manager"
                  value={selectedManager}
                  onChange={(e) => setSelectedManager(e.target.value)}
                >
                  <option value=""></option>
                  {managers?.length > 0 &&
                    managers.map((mn) => {
                      return (
                        <option value={mn.id} key={mn.id}>
                          {mn.name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div className="pt-3 flex items-center gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 rounded-lg bg-slate-800 text-white text-sm font-medium py-2.5 hover:bg-slate-700 active:scale-[0.99] transition-all"
              >
                {isSubmitting ? "Editting..." : "Edit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
