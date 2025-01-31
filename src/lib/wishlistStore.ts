import { create } from "zustand"
import { persist } from "zustand/middleware"

interface WishlistItem {
  id: string
  name: string
  price: number
  image: string
}

interface WishlistStore {
  items: WishlistItem[]
  addItem: (item: WishlistItem) => void
  removeItem: (id: string) => void
}

export const useWishlist = create<WishlistStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          if (!state.items.some((i) => i.id === item.id)) {
            return { items: [...state.items, item] }
          }
          return state
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
    }),
    {
      name: "wishlist-storage",
    },
  ),
)

