import { Products } from "~/generated/prisma";

export interface ICartState {
  items: Array<Products & { quantity: number }>;
}

export interface ICartActions {
  addItem: (item: Products) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  updateItemQuantity: (id: string, quantity: number) => void;
}

export type ICartStore = ICartState & ICartActions;
