import { Salad } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="px-4 border-t bg-muted/50">
      <div className="flex flex-col gap-8 py-12 md:py-16 lg:flex-row lg:gap-16">
        <div className="flex flex-col gap-4 lg:w-1/3">
          <div className="flex items-center gap-2 font-bold">
            <Salad className="h-6 w-6 text-primary" />
            <span>Diety AI</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Diety AI to innowacyjna aplikacja wykorzystująca sztuczną
            inteligencję do tworzenia spersonalizowanych planów żywieniowych
            dostosowanych do indywidualnych potrzeb użytkowników.
          </p>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-3">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium">Produkt</h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Funkcje
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                FAQ
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium">Firma</h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                O nas
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Blog
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Kariera
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium">Pomoc</h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Kontakt
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Wsparcie
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Polityka prywatności
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 border-t py-6 sm:flex-row sm:items-center">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Diety AI. Wszelkie prawa
          zastrzeżone.
        </p>
        <div className="flex gap-4 sm:ml-auto">
          <Link
            href="#"
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Polityka prywatności
          </Link>
          <Link
            href="#"
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Warunki korzystania
          </Link>
          <Link
            href="#"
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Polityka cookies
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
