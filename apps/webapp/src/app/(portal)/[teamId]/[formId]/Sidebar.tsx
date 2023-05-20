"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar({ forms }: any) {
  forms = JSON.parse(forms);
  const path = usePathname();
  const pathname = path?.split("/")[1];
  const navigation = forms?.map((item: any) => {
    return {
      name: item.name,
      href: `/${pathname}/${item.id}`,
    };
  });

  return (
    <nav className="w-40" aria-label="Sidebar">
      <ul role="list" className="space-y-1 w-40">
        {navigation.map((item: any) => (
          <li
            key={item.name}
            className="hover:bg-slate-100 hover:text-gray-600 transition-all rounded dark:hover:bg-gray-900"
          >
            <Link
              href={item.href}
              className={classNames(
                path === item.href
                  ? " dark:text-white text-orange-600 font-medium bg-slate-100 rounded dark:bg-gray-900 dark:hover:bg-gray-900 "
                  : "text-gray-500 hover:text-gray-900 dark:hover:text-white dark:hover:bg-gray-900 hover:rounded-md",
                "group flex gap-x-3 p-2 pl-3 text-sm leading-6"
              )}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
