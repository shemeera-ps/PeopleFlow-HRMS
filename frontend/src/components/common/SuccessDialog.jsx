import { useEffect, useRef } from "react";

/**
 * Reusable success dialog.
 *
 * Usage:
 * <SuccessDialog
 *   open={showSuccess}
 *   title="Password updated successfully."
 *   message="For security reasons you'll need to sign in again."
 *   actionLabel="Log in again"
 *   onAction={() => navigate("/login")}
 * />
 *
 * All text is passed as props so it works for any success state,
 * not just password changes.
 */
export default function SuccessDialog({
  open,
  title = "Success",
  message,
  actionLabel = "Continue",
  onAction,
  onClose,
}) {
  const dialogRef = useRef(null);

  // Focus the action button when the dialog opens, and allow Escape to close
  useEffect(() => {
    if (!open) return;
    dialogRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === "Escape" && onClose) onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-[2px] px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-dialog-title"
    >
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden animate-[successIn_0.2s_ease-out]">
        <div className="px-8 pt-9 pb-8 text-center">
          {/* Icon */}
          <div className="mx-auto w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mb-5">
            <svg
              className="w-7 h-7 text-emerald-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>

          {/* Text */}
          <h2
            id="success-dialog-title"
            className="text-base font-semibold text-slate-800"
          >
            {title}
          </h2>
          {message && (
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              {message}
            </p>
          )}

          {/* Action */}
          <button
            ref={dialogRef}
            type="button"
            onClick={onAction}
            className="w-full mt-7 rounded-lg bg-slate-800 text-white text-sm font-medium py-2.5 hover:bg-slate-700 active:scale-[0.99] transition-all focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2"
          >
            {actionLabel}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes successIn {
          from { opacity: 0; transform: translateY(6px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
