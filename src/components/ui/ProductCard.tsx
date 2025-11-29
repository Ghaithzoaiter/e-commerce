import { Link, useNavigate } from "react-router-dom";
import { useCart, type CartItem } from "@/stores/cart";
import { useTranslation } from "react-i18next";
import Button from "@/components/ui/button";
import { toast } from "sonner";

export interface ProductType {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string;
  category: string;
  tags?: string[];
  rating: number;
  thumbnail?: string;
}

export default function ProductCard({ product }: { product: ProductType }) {
  const add = useCart(s => s.add);
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div
      className="
        
        border border-border 
        rounded-xl p-4 shadow-card 
        bg-card text-card-foreground
        transition hover:shadow-xl
      "
    >
      {/* صورة المنتج */}
      <Link to={`/products/${product.id}`}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="
            h-48 w-full object-cover rounded-lg mb-4 
            transition hover:opacity-90 hover:-translate-y-2 hover:scale-[1.03]
          "
        />
      </Link>

      <h2 className="font-semibold text-lg line-clamp-2">
        {product.title}
      </h2>

      <p className="text-primary font-bold text-xl mt-2">
        ${product.price}
      </p>

      {product.tags && (
        <div className="
          w-fit mt-2 px-3 py-1 bg-[#46797A] text-sm rounded-xl 
          bg-muted text-muted-foreground border border-border
        ">
          {product.tags.join(", ")}
        </div>
      )}

      <div className="flex flex-wrap gap-3 mt-8">
        <Button className="w-full">
        <Link
          to={`/products/${product.id}`}
          className=""
          >
          {t("quick_view")}
        </Link>
          </Button>
        
        <Button 
        // className="toast-button"
        className="w-full border px-4 py-2 rounded-lg hover:bg-primary/10"
        onClick={() => { 
          add({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.images,
            review: product.rating,
            thumbnail: product.thumbnail || product.images[0],
          } as Omit<CartItem, "qty">);
          toast.success(t("product_added") || "Product added successfully", {
            action: {
              label: t("Go-to-Cart"),
              onClick: () => {
                navigate("/cart"); 
              },
            },
          });
        }}
    // variant="outline"
    >
          {t("add_to_cart") || "Add to Cart"}
        </Button>
      </div>
    </div>
  );
}
