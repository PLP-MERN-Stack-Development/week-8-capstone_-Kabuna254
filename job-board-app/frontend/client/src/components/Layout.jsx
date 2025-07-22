import { Card, CardContent } from "@/components/ui/card";
import Navbar from "./Navbar";


function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6">
        <Card className="w-full max-w-screen-lg mx-auto my-8 p-8">
          <CardContent className="py-6 px-4">
            {children}
          </CardContent>
        </Card>
      </main>
      <footer className="bg-muted text-muted-foreground p-4 text-center">
        © {new Date().getFullYear()} Job Board. All rights reserved.
      </footer>
    </div>
  );
}

export default Layout;

