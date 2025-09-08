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
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [justAdded, setJustAdded] = React.useState(false);
  const { addItem, removeItem, items } = useCartStore((state) => state);

  const inCart = React.useMemo(
    () => items.some((cartItem) => cartItem.id === item.id),
    [items, item.id]
  );

  const handleAddToCart = () => {
    if (inCart) {
      removeItem(item.id);
      setJustAdded(false);
      return;
    }
    setIsProcessing(true);
    addItem(item);
    setIsProcessing(false);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

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
          disabled={isProcessing}
          variant={justAdded ? "secondary" : "default"}
          className="w-full"
        >
          {isProcessing ? (
            <>
              <Plus className="h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : justAdded ? (
            <>
              <ShoppingCart className="h-5 w-5" />
              Added!
            </>
          ) : inCart ? (
            "Remove"
          ) : (
            <>
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
