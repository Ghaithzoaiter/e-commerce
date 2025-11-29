import {  useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/services/products";
import { useCart } from "@/stores/cart";
import { useTranslation } from "react-i18next";
import Button from "@/components/ui/button";
import Stars from "@/components/ui/Stars";
import { toast } from "sonner";
import ProductCardSkeleton from "@/components/ui/ProductCardSkeleton";


interface Review {
  id?: number;
  comment: string;
  rating: number;
}

export default function ProductPage() {
  const { id } = useParams();
  const add = useCart((s) => s.add);
  const { t } = useTranslation();
  const productId = Number(id);
  
  const { data, error, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId),
    enabled: !!productId,
  });
  const navigate = useNavigate();

  if (isLoading)
    return (
  <div className="text-center py-10 text-foreground">
        <div className="flex-1 items-center justify-center max-w-dvw lg:w-1/2 py-1 cen">

        <ProductCardSkeleton/>  
        </div>
      </div>
    );

  if (error)
    return (
      <div className="text-center py-10 text-red-500">
        {t("error") || "Error loading product."}
      </div>
    );

  if (!data)
    return (
      <div className="text-center py-10 text-foreground">
        {t("Product-not-found")}
      </div>
    );

    
  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 p-6">

      {/* ------------------ Image ------------------ */}
      <div className="flex justify-center">
        <img
          src={data.thumbnail || data.images?.[0]}
          alt={data.title}
          className="object-contain rounded-xl shadow-md bg-card p-4 
                     hover:opacity-90 transition hover:-translate-y-2"
        />
      </div>

      {/* ------------------ Info ------------------ */}
      <div className="flex flex-col gap-4 cursor-default text-foreground">

        <h1 className="text-3xl font-bold text-primary">{data.title}</h1>

        <p className="opacity-80">{data.description}</p>

        <p className="text-2xl font-semibold text-primary">
          ${data.price}
        </p>

        <Button 
        className="toast-button"
        onClick={() => { 
          add(data);
          toast.success(t("product_added") || "Product added successfully", {
            action: {
              label: t("Go to Cart"),
              onClick: () => {
                navigate("/cart"); 
              },
            },
          });
        }}
    variant="outline">
          {t("add_to_cart") || "Add to Cart"}
        </Button>

        {/* ------------------ Rating ------------------ */}
        <div className="flex flex-col gap-2 mt-4">
          <h2 className="text-xl font-bold text-muted-foreground ">{t("rating") || "Rating"}:</h2>
          <Stars rating={data.rating} size={30}/>
        </div>

        {/* ------------------ Reviews ------------------ */}
        {data.reviews?.length > 0 && (
          <div className="flex flex-col gap-3 mt-4">
            <h2 className="text-xl font-bold">{t("reviews") || "Reviews"}:</h2>

            {data.reviews.map((review: Review, index: number) => (
              <div
                key={review.id || index}
                className="border border-border rounded-lg p-4 
                           bg-card shadow-md transition-all hover:-translate-y-1 hover:scale-105"
              >
                <p className="text-foreground opacity-90">{review.comment}</p>
                <Stars rating={review.rating} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
