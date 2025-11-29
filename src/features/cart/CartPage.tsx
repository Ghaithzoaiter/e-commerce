import { useCart } from "@/stores/cart";
import { Link } from "react-router-dom";
import Button from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";


export default function CartPage() {
  const { items, update, remove, clear } = useCart();
  const { t } = useTranslation();
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold mb-4">{t("cart_empty")}</h1>
        <Link to="/" className="text-primary underline">{t("return_to_shop")}</Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <h1 className="text-3xl font-bold">{t("cart")}</h1>

      {/* قائمة المنتجات */}
      <div className="space-y-4">
        
        {items.map(item => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row items-center md:items-center justify-between border p-4 rounded-lg gap-4"
          >
            <Link to={`/products/${item.id}`} className="flex items-center gap-4 flex-1 w-full">
              
              {/* صورة */}
              <img
                src={item.thumbnail}
                alt={item.title}
                className="h-20 w-20 rounded object-cover"
              />

              {/* معلومات المنتج */}
              <div className="flex-1 px-4">
                <h2 className="font-bold">{item.title}</h2>
                <p className="text-primary font-semibold">${item.price}</p>
              </div>

            </Link>

            {/* تعديل الكمية */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => update(item.id, item.qty - 1)}
                className="px-3 py-1 border rounded"
                disabled={item.qty <= 1}
              >
                -
              </button>

              <span className="px-3 py-1">{item.qty}</span>

              <button
                onClick={() => update(item.id, item.qty + 1)}
                className="px-3 py-1 border rounded"
              >
                +
              </button>
            </div>

            {/* حذف */}
            <Button
              onClick={() => remove(item.id)}
              variant="danger"
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              {t("remove")}
            </Button>
          </div>
        ))}
      </div>

      {/* السعر الإجمالي */}
      <div className="border-t pt-6 text-right">
        <h2 className="text-2xl font-semibold">
          {t("total")}:{" "}
          <span className="text-primary">
            ${total.toFixed(2)}
          </span>
        </h2>

        <div className="mt-5 flex gap-4 justify-end flex-wrap">
        <Button 
        className="toast-button"
        onClick={() => { 
          toast.error(t("Are-you-sure") || "Are you sure you want to empty your cart?", {
            action: {
              label: t("yes"),
              onClick: () => {
                clear();
              },
            },
          });
        }}
    variant="danger">
            {t("empty_cart")}
          </Button>

          <Button variant="outline">
            <Link to="/checkout">
              {t("checkout")}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );  
}
