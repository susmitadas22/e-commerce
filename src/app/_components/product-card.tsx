"use client";

import { Plus, ShoppingCart } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { Products } from "~/generated/prisma";
import { useCartStore } from "~/lib/stores";
import { formatPrice } from "~/lib/utils";

export const ProductCard: React.FC<{ product: Products }> = ({
  product: item,
}) => {
  const [isAdding, setIsAdding] = React.useState(false);
  const [justAdded, setJustAdded] = React.useState(false);
  const [inCart, setInCart] = React.useState(false);
  const { addItem, removeItem, items } = useCartStore((state) => state);

  const handleAddToCart = () => {
    if (inCart) {
      removeItem(item.id);
      setInCart(false);
      return;
    }

    setIsAdding(true);
    addItem(item);
    setIsAdding(false);
    setJustAdded(true);
    setInCart(true);
  };

  React.useEffect(() => {
    const itemInCart = items.find((cartItem) => cartItem.id === item.id);
    setInCart(!!itemInCart);
  }, [items, item.id]);

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="aspect-square relative mb-4 overflow-hidden bg-gray-100">
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-sm line-clamp-2 text-balance">
            {item.name}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {item.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-primary">
              {formatPrice(item.price)}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          disabled={isAdding || justAdded || inCart}
          className="w-full"
          variant={justAdded ? "secondary" : "default"}
        >
          {isAdding ? (
            <>
              <Plus className="h-4 w-4 mr-2 animate-spin" />
              Adding...
            </>
          ) : justAdded ? (
            <>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Added to Cart
            </>
          ) : inCart ? (
            "In Cart"
          ) : (
            <>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
