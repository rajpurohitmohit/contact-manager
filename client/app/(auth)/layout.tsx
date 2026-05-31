export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-full flex items-center justify-center bg-gradient-to-br from-[#F0F4FF] via-[#F9FAFB] to-[#F5F3FF] p-4">
      <div className="w-full max-w-[400px]">
        {/* Logo */}
        <div className="flex items-center gap-2.5 justify-center mb-8">
          <div className="w-9 h-9 rounded-[10px] bg-[#4F46E5] flex items-center justify-center shadow-[0_4px_12px_rgba(79,70,229,0.3)]">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M9 2C6.24 2 4 4.24 4 7c0 1.77.94 3.32 2.34 4.21L5 15h8l-1.34-3.79C13.06 10.32 14 8.77 14 7c0-2.76-2.24-5-5-5z"
                fill="white"
                opacity="0.9"
              />
              <circle cx="9" cy="7" r="2" fill="white" />
            </svg>
          </div>
          <span className="text-[#111827] font-semibold text-lg tracking-tight">MyContacts</span>
        </div>
        {children}
      </div>
    </div>
  );
}
