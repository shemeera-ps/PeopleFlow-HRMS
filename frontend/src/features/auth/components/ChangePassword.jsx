export default function ChangePassword() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop Backdrop Overlay */}
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-fadeIn" />

      {/* Modal Container Body */}
      <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden p-6 transform transition-all animate-scaleUp z-10 border border-slate-100"></div>
    </div>
  );
}
