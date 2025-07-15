
export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-8">
        <div className="flex items-center justify-center space-x-2">
          <div className="h-5 w-5 rounded-full bg-destructive animate-bubble-bounce [animation-delay:-0.3s]"></div>
          <div className="h-5 w-5 rounded-full bg-destructive animate-bubble-bounce [animation-delay:-0.15s]"></div>
          <div className="h-5 w-5 rounded-full bg-destructive animate-bubble-bounce"></div>
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-destructive">Hostel Booking Platform</h1>
          <p className="text-muted-foreground">Loading your hostel platform...</p>
        </div>
      </div>
    </div>
  );
}
