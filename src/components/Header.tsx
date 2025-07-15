'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { Compass, Heart, LogIn, UserPlus, Menu, Search, Briefcase, Wand2 } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/search', label: 'Search', icon: Search },
  { href: '/recommendations', label: 'AI Recs', icon: Compass },
  { href: '/image-generator', label: 'AI Image', icon: Wand2 },
  { href: '/bookings', label: 'My Bookings', icon: Briefcase },
  { href: '/wishlist', label: 'Wishlist', icon: Heart },
];

const DesktopNavLink = ({ href, label, icon: Icon }: { href:string; label:string; icon: React.ElementType }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 text-sm font-medium transition-colors hover:text-destructive-foreground",
        isActive ? "text-destructive-foreground font-bold" : "text-destructive-foreground/80"
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
};


const MobileNavLink = ({ href, label, icon: Icon }: { href: string; label: string; icon: React.ElementType }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link href={href} className={cn(
      "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
      isActive ? "text-primary" : "text-muted-foreground"
    )}>
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
};


export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-destructive text-destructive-foreground shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg font-headline text-destructive-foreground">
          <Compass className="h-6 w-6" />
          <span>Hostel Booking Platform</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <DesktopNavLink key={link.href} {...link} />
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" asChild className="hover:bg-white/20">
            <Link href="/login">
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Link>
          </Button>
          <Button className="bg-destructive-foreground text-destructive hover:bg-destructive-foreground/90" asChild>
            <Link href="/register">
              <UserPlus className="mr-2 h-4 w-4" />
              Register
            </Link>
          </Button>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="border-destructive-foreground/50 text-destructive-foreground hover:bg-destructive-foreground/10">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 p-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-lg font-headline text-primary">
                  <Compass className="h-6 w-6" />
                  <span>Hostel Booking Platform</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <MobileNavLink key={link.href} {...link} />
                  ))}
                </nav>
                <div className="flex flex-col gap-2 mt-4">
                  <Button variant="ghost" asChild>
                    <Link href="/login">
                      <LogIn className="mr-2 h-4 w-4" />
                      Login
                    </Link>
                  </Button>
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                    <Link href="/register">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Register
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
