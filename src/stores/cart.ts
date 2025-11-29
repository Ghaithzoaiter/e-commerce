import { create } from "zustand";
// import { persist } from "zustand/middleware";
// 🛍️ نوع المنتج
export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  thumbnail: string;
  qty: number;
  review:number; 
}

// 🛒 نوع الـ Store
interface CartStore {
  items: CartItem[];

  add: (product: Omit<CartItem, "qty">) => void;
  remove: (id: number) => void;
  update: (id: number, qty: number) => void; // 🔥 تمت إضافتها هنا
  clear: () => void;
}




export const useCart = create<CartStore>((set) => ({
  items: [],

  // ➕ إضافة منتج
  add: (product) =>
    set((state) => {
      const exist = state.items.find((i) => i.id === product.id);

      if (exist) {
        return {
          items: state.items.map((i) =>
            i.id === product.id ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }

      return {
        items: [...state.items, { ...product, qty: 1 }],
      };
    }),

  // 🔄 تحديث الكمية
  update: (id, qty) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id
          ? { ...item, qty: qty < 1 ? 1 : qty } // 🔥 لا يسمح بالكمية أقل من 1
          : item
      ),
    })),

  // ❌ إزالة منتج حسب ID
  remove: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    })),

  // 🧹 مسح السلة
  clear: () => set({ items: [] }),


}));
