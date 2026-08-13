import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import SuccessDialog from "../../../components/common/SuccessDialog";
import { validatePassword } from "../../../utils/ValidatePassword";

export default function ChangePassword() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { changePassword } = useAuth();
  const navigate = useNavigate();
  function handleCancel() {
    setCurrentPassword("");
    setConfirmPassword("");
    setNewPassword("");
  }
  async function handleSubmit(e) {
    try {
      e.preventDefault();
      setIsSubmitting(true);
      if (!currentPassword.trim()) {
        toast.error("Current Password is required");
        return;
      }
      if (!newPassword.trim()) {
        toast.error("New Password is required");
        return;
      }
      if (!confirmPassword.trim()) {
        toast.error("Confirm Password is required");
        return;
      }
      if (newPassword.trim() !== confirmPassword.trim()) {
        toast.error("Confirm password must be equal to the new password");
        return;
      }
      if (!validatePassword(confirmPassword)) {
        toast.error(
          "Password must contain atleast one upper case ,one lower case and one special charecter",
        );
        return;
      }
      if (confirmPassword.length < 8) {
        toast.error("Password must be atlease 8 charecters long");
        return;
      }
      const payload = {
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: confirmPassword,
      };
      const response = await changePassword(payload);
      if (response.success) {
        setShowSuccess(true);
      } else {
        toast.error(response.message);
      }
    } catch {
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <>
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Header */}
            <div className="bg-slate-800 px-8 py-7">
              <div className="w-11 h-11 rounded-xl bg-slate-700 flex items-center justify-center mb-4">
                <svg
                  className="w-5 h-5 text-slate-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.75}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h1 className="text-lg font-semibold text-white">
                Change password
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Choose a strong password you haven't used before.
              </p>
            </div>

            {/* Form */}
            <form className="px-8 py-7 space-y-5" onSubmit={handleSubmit}>
              {/* Current Password */}
              <div>
                <label
                  htmlFor="currentPassword"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  Current password
                </label>
                <div className="relative">
                  <input
                    id="currentPassword"
                    name="currentPassword"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    type={showCurrent ? "text" : "password"}
                    placeholder="Enter current password"
                    className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 pr-10 text-sm text-slate-800 placeholder-slate-400 outline-none transition-colors focus:border-slate-500 focus:bg-white focus:ring-2 focus:ring-slate-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent((v) => !v)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 transition-colors"
                    tabIndex={-1}
                  >
                    <EyeIcon open={showCurrent} />
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="pt-1 pb-1">
                <div className="h-px bg-slate-100" />
              </div>

              {/* New Password */}
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  New password
                </label>
                <div className="relative">
                  <input
                    id="newPassword"
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    type={showNew ? "text" : "password"}
                    placeholder="Enter new password"
                    className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 pr-10 text-sm text-slate-800 placeholder-slate-400 outline-none transition-colors focus:border-slate-500 focus:bg-white focus:ring-2 focus:ring-slate-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew((v) => !v)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 transition-colors"
                    tabIndex={-1}
                  >
                    <EyeIcon open={showNew} />
                  </button>
                </div>

                {/* Strength meter (visual only) */}
                <div className="flex items-center gap-1.5 mt-2.5">
                  <div className="h-1 flex-1 rounded-full bg-slate-150 bg-slate-200" />
                  <div className="h-1 flex-1 rounded-full bg-slate-200" />
                  <div className="h-1 flex-1 rounded-full bg-slate-200" />
                  <div className="h-1 flex-1 rounded-full bg-slate-200" />
                </div>
                <p className="text-xs text-slate-400 mt-1.5">
                  Use 8+ characters with a mix of letters, numbers and symbols.
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  Confirm new password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type={showConfirm ? "text" : "password"}
                    placeholder="Re-enter new password"
                    className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 pr-10 text-sm text-slate-800 placeholder-slate-400 outline-none transition-colors focus:border-slate-500 focus:bg-white focus:ring-2 focus:ring-slate-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 transition-colors"
                    tabIndex={-1}
                  >
                    <EyeIcon open={showConfirm} />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 rounded-lg bg-slate-800 text-white text-sm font-medium py-2.5 hover:bg-slate-700 active:scale-[0.99] transition-all"
                >
                  Update password
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="rounded-lg border border-slate-300 text-slate-600 text-sm font-medium py-2.5 px-5 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>

          {/* Footer note */}
          <p className="text-center text-xs text-slate-400 mt-5">
            You'll be signed out of other devices after changing your password.
          </p>
        </div>
      </div>
      {showSuccess && (
        <SuccessDialog
          open={showSuccess}
          title="Password updated successfully."
          message="For security reasons you'll need to sign in again."
          actionLabel="Log in again"
          onAction={() => navigate("/")}
        />
      )}
    </>
  );
}

function EyeIcon({ open }) {
  if (open) {
    return (
      <svg
        className="w-4.5 h-4.5"
        width="18"
        height="18"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.75}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.774 3.162 10.066 7.498a10.522 10.522 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
        />
      </svg>
    );
  }
  return (
    <svg
      className="w-4.5 h-4.5"
      width="18"
      height="18"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.75}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}
