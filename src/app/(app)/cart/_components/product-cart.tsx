"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Trash2, Plus, Minus } from "lucide-react";
import { ICartState } from "~/types";
import { useCartStore } from "~/lib/stores";

export const CartItem: React.FC<{
  cartItem: ICartState["items"][number];
}> = ({ cartItem }) => {
  const { addItem, removeItem } = useCartStore();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const handleQuantityChange = (newQuantity: number) => {
    try {
      setIsUpdating(true);
      setQuantity(newQuantity);
      addItem(cartItem);
      setIsUpdating(false);
    } catch (error) {
      console.error("Failed to update quantity:", error);
      setIsUpdating(false);
    }
  };

  const handleRemove = () => {
    try {
      setIsRemoving(true);
      removeItem(cartItem.id);
    } catch (error) {
      console.error("Failed to remove item:", error);
      setIsRemoving(false);
    }
  };

  const handleQuantityInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = Number.parseInt(e.target.value);
    if (!isNaN(value) && value >= 1) {
      handleQuantityChange(value);
    }
  };

  return (
    <Card className={`transition-opacity ${isRemoving ? "opacity-50" : ""}`}>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-shrink-0">
            <div className="w-24 h-24 relative rounded-xs overflow-hidden bg-gray-100">
              <Image
                src={cartItem.image || "/placeholder.svg"}
                alt={cartItem.name}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground line-clamp-2">
                  {cartItem.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                  {cartItem.description}
                </p>
                <p className="text-lg font-bold text-primary mt-2">
                  {formatPrice(cartItem.price)}
                </p>
              </div>

              <div className="flex flex-col sm:items-end gap-3">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1 || isUpdating}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>

                  <Input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityInputChange}
                    disabled={isUpdating}
                    className="w-16 text-center"
                  />

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={isUpdating}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>

                {/* Subtotal and Remove */}
                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <span className="font-semibold">
                    {formatPrice(cartItem.price * quantity)}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRemove}
                    disabled={isRemoving}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
