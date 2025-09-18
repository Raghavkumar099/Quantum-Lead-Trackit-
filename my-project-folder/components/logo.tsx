export function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <div className={`${className} relative`}>
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Track lines */}
        <path d="M4 16 L28 16 M4 18 L28 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        {/* Train/Location marker */}
        <circle cx="16" cy="17" r="4" fill="currentColor" className="animate-pulse" />
        {/* Signal dots */}
        <circle cx="8" cy="12" r="1.5" fill="currentColor" opacity="0.6" />
        <circle cx="24" cy="12" r="1.5" fill="currentColor" opacity="0.6" />
        <circle cx="8" cy="22" r="1.5" fill="currentColor" opacity="0.6" />
        <circle cx="24" cy="22" r="1.5" fill="currentColor" opacity="0.6" />
      </svg>
    </div>
  )
}
