import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/DropdownMenu";
import { Button } from "@/ui/Buttons/SButton";
import { isEmpty } from "lodash";

export default function ActionMenu({
  title,
  items,
}: {
  title?: string;
  items: { name: string; Icon?: any; onClick?: any }[];
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {title ? title : <EllipsisHorizontalIcon className="h-5 w-5" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-fit">
        {!isEmpty(items) && (
          <DropdownMenuGroup>
            {items?.map((item) => (
              <DropdownMenuItem onSelect={item.onClick} key={item.name}>
                {item.Icon && <item.Icon className="mr-2 h-4 w-4" />}
                <span>{item.name}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* 
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"withText"} className="px-2 py-1 min-w-max">
            <div className={`${title && "ml-2"}`}>{title}</div>
            <EllipsisHorizontalIcon className="mx-2 h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {menuItems.map((item, idx) => (
            <DropdownMenuItem onSelect={item.onClick} key={item.text}>
              {item.text}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

*/
