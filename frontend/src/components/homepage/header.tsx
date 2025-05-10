import Link from "next/link";
import { Logo } from "../logo";
import { Button } from "../ui/button";
import { ThemeSwitcher } from "@/lib/themes";

const Header = () => {
  return (
    <header className="sticky px-4 top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2 font-bold">
          <Logo className="w-40 h-auto" />
        </div>
        <nav className="hidden md:flex gap-6">
          <Link
            href="#funkcje"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Funkcje
          </Link>
          <Link
            href="#jak-to-dziala"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Jak to działa
          </Link>
          <Link
            href="#opinie"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Opinie
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/login">Logowanie</Link>
          </Button>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;
