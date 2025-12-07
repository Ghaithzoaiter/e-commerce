import { Outlet, Link, NavLink } from "react-router-dom";
import { useCart } from "@/stores/cart";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { Menu, Sun, Moon, Globe } from "lucide-react";
import { Toaster } from "sonner";


export default function Layout() {
  const count = useCart((s) => s.items.reduce((a, x) => a + x.qty, 0));
  const { t, i18n } = useTranslation();
  const getInitialTheme = () => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const changeLang = (lng: "ar" | "en") => {
    

    i18n.changeLanguage(lng);
    document.dir = lng === "ar" ? "rtl" : "ltr";
    localStorage.setItem("lang", lng);
    setLangOpen(false);
  };
  useEffect(() => {
    console.log("Language menu open:", langOpen);
  }, [langOpen, i18n.language]);
  

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition">
      
      {/* HEADER */}
      <header className="sticky top-0 bg-card/70 backdrop-blur-lg border-b border-border shadow-sm z-50">
        <div className="container mx-auto p-4 flex justify-between items-center">

          <Link to="/" className="text-3xl font-extrabold text-primary">
            {t("shop_name")}
          </Link>

          <nav className="hidden md:flex items-center gap-6">

            <NavLink
              to="/"
              className={({ isActive }) =>
                `transition ${
                  isActive  
                    ? "text-primary font-semibold"
                    : "text-foreground/70 hover:text-primary"
                }`
              }
            >
              {t("products")}
            </NavLink>

            <NavLink
              to="/cart"
              className="relative text-foreground/70 hover:text-primary transition"
            >
              {t("cart")}
              <span className="absolute -top-2 -right-4 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {count}
              </span>
            </NavLink>

            {/* Language */}
            <div className="relative">
            <button
  onClick={() => changeLang(i18n.language === "ar" ? "en" : "ar")}
  className="px-3 py-2 rounded-lg bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground transition flex items-center gap-2"
>
  <Globe size={18} />
  {i18n.language === "ar" ? "EN" : "AR"}
</button>
            </div>

            {/* Theme */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground transition"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>

          </nav>

          {/* Mobile button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg bg-muted text-muted-foreground"
          >
            <Menu size={22} />
          </button>

        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-card text-center text-card-foreground border-t border-border p-4 space-y-4">

            <NavLink to="/" className="block hover:text-primary">
              {t("products")}
            </NavLink>

            <NavLink to="/cart" className="block relative hover:text-primary">
              {t("cart")}
              <span className="absolute bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full">
                {count}
              </span>
            </NavLink>

            <div>
              <p className="font-semibold">{t("language")}</p>
              <button
                onClick={() => changeLang("ar")}
                className="block w-full px-3 py-2 bg-muted rounded mb-2"
              >
                العربية
              </button>

              <button
                onClick={() => changeLang("en")}
                className="block w-full px-3 py-2 bg-muted rounded"
              >
                English
              </button>
            </div>

            <button
              onClick={toggleTheme}
              className="w-full px-3 py-2 bg-muted rounded flex items-center gap-1 justify-center hover:bg-accent hover:text-accent-foreground"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>

          </div>
        )}
      </header>

      {/* MAIN CONTENT */}
      <main className="container mx-auto p-6 flex-1 ">

      <Toaster
      position="top-center"
      theme={theme}
      richColors
      closeButton
      />
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="bg-card text-card-foreground border-t border-border py-8">
        <div className="container mx-auto text-center space-y-3">
          <h3 className="text-lg font-semibold text-primary">Premium Shop</h3>
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} — All Rights Reserved
          </p>
        </div>
      </footer>

    </div>
  );
}
