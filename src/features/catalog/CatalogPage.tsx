import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/products";
import ProductCard from "@/components/ui/ProductCard";
import ProductCardSkeleton from "@/components/ui/ProductCardSkeleton";
import Button from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export default function CatalogPage() {
  const { t } = useTranslation();

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  // Filters State
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const [priceMin, setMin] = useState(0);
  const [priceMax, setMax] = useState(100);

  const [visibleCount, setVisibleCount] = useState(12);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // ---------------- Filtering ----------------
  let filtered = [...products];

  filtered = filtered.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  if (category !== "all") {
    filtered = filtered.filter((p) => p.category === category);
  }

  filtered = filtered.filter(
    (p) => p.price >= priceMin && p.price <= priceMax
  );

  // ---------------- Sorting ----------------
  switch (sort) {
    case "price-asc":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "title":
      filtered.sort((a, b) => a.title.localeCompare(b.title));
      break;
  }

  const visibleProducts = filtered.slice(0, visibleCount);

  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 mt-8 animate-pageEnter">

      {/* ---------------- Sidebar Filters ---------------- */}
      <aside className="bg-card text-foreground border border-border rounded-xl p-6 h-fit space-y-6 md:col-span-3 animate-fadeEnter">

        <h2 className="text-xl font-bold text-primary">{t("filters")}</h2>

        {/* Search */}
        <div className="space-y-1">
          <label className="font-semibold text-muted-foreground">{t("search")}</label>
          <input
            type="text"
            placeholder={t("search_products")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-background text-foreground border border-border rounded-lg px-4 py-2 w-full"
          />
        </div>

        {/* Category */}
        <div className="space-y-1">
          <label className="font-semibold">{t("categories")}</label>
          <select
            className="bg-secondary text-foreground border border-border rounded-lg px-4 py-2 w-full animate-fadeEnter"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">{t("all")}</option>
            <option value="beauty">{t("beauty")}</option>
            <option value="fragrances">{t("fragrances")}</option>
            <option value="groceries">{t("groceries")}</option>
          </select>
        </div>

        {/* Price Range */}
        <div className="bg-background p-4 rounded-xl shadow-sm space-y-3">
          <h3 className="text-lg font-semibold">{t("price")}</h3>
          <div className="flex justify-between text-sm opacity-80">
            <span>${priceMin}</span>
          </div>
          <div className="relative pt-2">
            <input
              type="range"
              min="0"
              max="100"
              value={priceMin}
              onChange={(e) => {
                const val = Number(e.target.value);
                setMin(val <= priceMax ? val : priceMax);
              }}
              className="w-full
    appearance-none
    h-2 
    border
    rounded-full
    accent-primary 
    bg-amber-400
    [&::-webkit-slider-thumb]:appearance-none
    [&::-webkit-slider-thumb]:h-4
    [&::-webkit-slider-thumb]:w-7
    [&::-webkit-slider-thumb]:bg-amber-400-
    [&::-webkit-slider-thumb]:rounded-full
    [&::-webkit-slider-thumb]:bg-teal-500   
    [&::-webkit-slider-thumb]:cursor-pointer
    "
      style={{
    background: `linear-gradient(to right, #46797A ${priceMin}%, #22c55e20 ${priceMin}%)`
  }}
            />

          </div>
        </div>

        {/* Reset */}
        <Button
          onClick={() => {
            setSearch("");
            setCategory("all");
            setSort("default");
            setMin(0);
            setMax(100);
          }}
          className="w-full"
        >
          {t("reset")}
        </Button>
      </aside>

      {/* ---------------- Products Section ---------------- */}
      <main className="md:col-span-9">

        {/* Sorting */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
          <p className="opacity-70">{t("sort_by")}:</p>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-background  border border-border *:**:text-foreground font-semibold p-2 rounded bg-[#46797A]"
          >
            <option value="default" >{t("relevance")}</option>
            <option value="price-asc">{t("cheap")} → {t("expensive")}</option>
            <option value="price-desc">{t("expensive")} → {t("cheap")}</option>
            <option value="title">{t("a_to_z")}</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Load More */}
        <div className="flex justify-center mt-6">
          {visibleCount < filtered.length && (
            <Button
              onClick={() => setVisibleCount((prev) => prev + 4)}
              className="px-6 py-2 border border-border bg-card text-foreground rounded-lg"
            >
              {t("load_more")}
            </Button>
          )}
        </div>

      </main>
    </div>
  );
}
