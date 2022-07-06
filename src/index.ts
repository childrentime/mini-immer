import { createProxy } from "./proxy";
import { finalize } from "./finalize";

type DeepReadonly<T> = T extends object
  ? { readonly [P in keyof T]: DeepReadonly<T[P]> }
  : T;

type DeepWritable<T> = T extends object
  ? { -readonly [P in keyof T]: DeepWritable<T[P]> }
  : T;

export default function produce<T>(
  base: T,
  recipe: (draft: DeepWritable<T>) => void
): DeepReadonly<T>;
export default function produce(base: any, recipe: (draft: any) => void) {
  const proxy = createProxy(base);
  recipe(proxy);
  return finalize(proxy);
}
