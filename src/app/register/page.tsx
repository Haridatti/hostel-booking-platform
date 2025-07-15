import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Chrome, Facebook } from 'lucide-react';

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] py-12 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold font-headline">Create an Account</CardTitle>
          <CardDescription>Join HostelHop and start your next adventure.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" type="text" placeholder="Your Name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
            Create Account
          </Button>

           <div className="relative my-4">
            <Separator />
            <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-card px-2 text-sm text-muted-foreground">
              OR
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline">
              <Chrome className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button variant="outline">
              <Facebook className="mr-2 h-4 w-4" />
              Facebook
            </Button>
          </div>
        </CardContent>
        <CardFooter className="justify-center text-sm">
          <p>Already have an account?&nbsp;</p>
          <Link href="/login" className="text-primary hover:underline font-medium">
            Log In
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
