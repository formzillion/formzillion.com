"use client";
function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar2({ teamSlug }: any) {
  const navigation = [
    { name: "General", href: `/${teamSlug}/settings`, current: true },
    { name: "Members", href: `/${teamSlug}/settings/members`, current: false },
    { name: "Projects", href: "#", current: false },
    { name: "Calendar", href: "#", current: false },
    { name: "Documents", href: "#", current: false },
    { name: "Reports", href: "#", current: false },
  ];

  return (
    <nav className="flex m-8 flex-1 flex-col" aria-label="Sidebar">
      <ul role="list" className="-mx-2 space-y-1">
        {navigation.map((item) => (
          <li key={item.name}>
            <a
              href={item.href}
              className={classNames(
                item.current ? " text-white" : "text-gray-700 hover:text-white",
                "group flex gap-x-3 p-2 pl-3 text-sm leading-6 font-semibold"
              )}
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
