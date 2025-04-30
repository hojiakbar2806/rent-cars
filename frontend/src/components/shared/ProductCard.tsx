import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export function ProductCard() {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <Link href={`/`}>
        <div className="overflow-hidden">
          <div className="relative h-48 w-full">
            <Image
              src={"https://picsum.photos/200/300"}
              alt={"product.name"}
              layout="fill"
              objectFit="cover"
              className="transition-transform hover:scale-105"
            />
          </div>
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/products`} className="no-underline">
          <h3 className="text-lg font-medium mb-1 line-clamp-1">product.name</h3>
        </Link>
        <div className="flex items-center mb-2">
          {Array(5).fill(0).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
            />
          ))}
          <span className="text-xs ml-2 text-gray-500">({"product.reviewCount"})</span>
        </div>
        <p className="text-sm text-gray-500 line-clamp-2">{"product.description"}</p>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <div className="font-bold">$100</div>
        <Button size="sm" className="flex gap-2">
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}