"use client";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as OutlineStarIcon } from "@heroicons/react/24/outline";
import { useOptimistic } from "react";
import { delBookMark, insBookMark } from "@/app/products/add/actions";
interface ButtonProps {
  isBookMark: boolean;
  productId: number;
}
export default function BookMarkButton({
  isBookMark,
  productId,
}: ButtonProps) {
  const [state, reducerFn] = useOptimistic(
    { isBookMark },
    (previousState, payload) => ({
      isBookMark: !previousState.isBookMark,
    })
  );
  const onClick = async () => {
    reducerFn(undefined);
    if (isBookMark) {
      await delBookMark(productId);
    } else {
      await insBookMark(productId);
    }
  };
  return (
    <div>
      {state.isBookMark ? (
        <StarIcon className="size-8" onClick={onClick}/>
      ) : (
        <OutlineStarIcon className="size-8" onClick={onClick}/>
      )}
     </div>
  );
}