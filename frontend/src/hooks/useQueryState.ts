import { useSearchParams, usePathname, useRouter } from "next/navigation";

export function useQueryState<T extends boolean>(
  key: string,
  multiple: T
): [T extends true ? string[] : string, (newValue: string) => void] {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const values = (
    multiple ? searchParams.getAll(key) : searchParams.get(key) || ""
  ) as T extends true ? string[] : string;

  const setValue = (newValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (multiple) {
      if (values.includes(newValue)) params.delete(key, newValue);
      else params.append(key, newValue);
    } else params.set(key, newValue);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return [values, setValue] as const;
}
