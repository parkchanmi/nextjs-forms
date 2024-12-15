"use client";
import { InitialProducts } from "@/app/(tabs)/bookmark/page";
import ListProduct from "../item/item-product";
import { useEffect, useRef, useState } from "react";
import { getMoreProducts } from "@/app/(tabs)/products/actions";
interface ProductListProps {
  initialProducts: InitialProducts;
}
export default function ProductList({ initialProducts }: ProductListProps) {
  const [products, setProducts] = useState(initialProducts);
  
   return (
    <div className="p-5 flex flex-col gap-5">
      {products.map((product) => (
        <ListProduct key={product.product.id} {...product.product} />
      ))}
    </div>
  );
}