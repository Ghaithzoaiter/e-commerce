import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCart } from "@/stores/cart";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@/components/ui/button";
import { useTranslation } from "react-i18next";


// 🔥 مخطط التحقق Zod  

const schema = z.object({
  name: z.string().min(3, ),
  email: z.string().email(),
  address: z.string().min(5, ),
});

type FormType = z.infer<typeof schema>;


export default function CheckoutPage() {
  
  const { clear } = useCart();
  const [success, setSuccess] = useState(false);
  const { t } = useTranslation();


  const {
    register,
    handleSubmit, 
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(schema),
  });


  const onSubmit = (data: FormType) => {
    console.log("Order Data:", data);
    clear();
    setSuccess(true);
  };

  if (success) {
    return (
      <div className=" text-center py-20">
        <h1 className="text-3xl font-bold mb-4">{t("order_success")}</h1>
        <p className="text-gray-600 mb-4">{t("we_will_contact_you_soon")}</p>
        <Button
        variant="outline">
        <Link
          to="/"
          >
          {t("return_to_shop")}
        </Link>
          </Button>
  
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">{t("checkout")}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* الاسم */}
        <div>
          <label className="block mb-1 font-semibold">{t("full_name")}</label>
          <input
            {...register("name")}
            className="w-full border rounded p-2"
            placeholder={t("enter_your_name")}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* البريد */}
        <div>
          <label className="block mb-1 font-semibold">{t("email")}</label>
          <input
            {...register("email")}
            className="w-full border rounded p-2"
              placeholder={t("enter_your_email")}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* العنوان */}
        <div>
          <label className="block mb-1 font-semibold">{t("address")}</label>
          <textarea
            {...register("address")}
            className="w-full border rounded p-2 h-24"
            placeholder={t("enter_your_address")}
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
        </div>

          <Button
          variant="outline"
          onClick={handleSubmit(onSubmit)}
          className="w-full self-center hover:bg-primary/80"
        >
            {t("send_order")}
        </Button>
      </form>
    </div>
  );
}
