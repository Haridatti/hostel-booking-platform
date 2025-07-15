import Link from 'next/link';
import { Compass } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t bg-card">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Compass className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg font-headline">Hostel Booking Platform</span>
          </div>
          <nav className="flex gap-4 sm:gap-6 text-sm">
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Contact
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
          </nav>
        </div>
        <div className="mt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Hostel Booking Platform. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
