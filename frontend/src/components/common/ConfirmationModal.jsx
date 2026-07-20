import { CircularProgress } from "@mui/material";
import { useState } from "react";

export default function ConfirmationModal({
  isOpen,
  title = "Confirm Action",
  message = "Are you sure you want to proceed? This action cannot be undone.",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  type = "info", // "info" | "danger" | "success"
}) {
  const [isConfirmed, setIsConfirmed] = useState(false);
  if (!isOpen) return null;

  // Dynamic theme styling based on the modal type
  const theme = {
    danger: {
      iconBg: "bg-red-100 text-red-600",
      icon: "⚠️",
      confirmBtn: "bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white",
    },
    success: {
      iconBg: "bg-emerald-100 text-emerald-600",
      icon: "✅",
      confirmBtn:
        "bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500 text-white",
    },
    info: {
      iconBg: "bg-cyan-100 text-cyan-600",
      icon: "ℹ️",
      confirmBtn:
        "bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-500 text-white",
    },
  }[type];

  async function handleConfirmAction() {
    try {
      setIsConfirmed(true);
      await onConfirm();
    } catch {
    } finally {
      setIsConfirmed(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-fadeIn"
        onClick={onCancel}
      />

      {/* Modal Container Body */}
      <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden p-6 transform transition-all animate-scaleUp z-10 border border-slate-100">
        {/* Content Header & Icon Layout Layout Flexbox */}
        <div className="flex items-start gap-4">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center text-xl flex-shrink-0 ${theme.iconBg}`}
          >
            {theme.icon}
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-900 leading-6">
              {title}
            </h3>
            <p className="mt-2 text-sm text-slate-500 leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        {/* Action Buttons Layout Layout Flexbox */}
        <div className="mt-6 flex flex-col sm:flex-row sm:justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors cursor-pointer"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={handleConfirmAction}
            disabled={isConfirmed}
            className={`w-full sm:w-auto px-5 py-2 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors cursor-pointer ${theme.confirmBtn}`}
          >
            {isConfirmed ? (
              <CircularProgress size={32} color="inherit" />
            ) : (
              confirmLabel
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
