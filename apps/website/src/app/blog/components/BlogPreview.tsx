import { UserCircleIcon } from "@heroicons/react/24/outline";
import { BlogMetadata } from "./BlogMetaData";

const PostPreview = (props: BlogMetadata) => {
  return (
    <article className="flex flex-col items-start justify-between border border-gray-800 rounded-xl hover:border-gray-500">
      <div className="relative w-full">
        <a href={`blog/${props.slug}`}>
          <img
            src={props.banner}
            alt="banner"
            className="aspect-[16/9] w-full rounded-t-xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2] h-[200px]"
          />
        </a>
      </div>
      <div className="px-4">
        <div className="">
          <h3 className="mt-3 text-lg font-semibold leading-6">
            <a href={`blog/${props.slug}`}>{props.title}</a>
          </h3>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-300">
            {props.subtitle}
          </p>
        </div>
        <div className="flex justify-between w-full text-sm leading-6 text-gray-300 my-4">
          <div className="flex items-center gap-x-4">
            <div className="flex gap-x-2.5">
              <UserCircleIcon className="h-6 w-6 flex-none rounded-full" />
              {props.author}
            </div>
          </div>
          <time dateTime={props.date} className="mr-8">
            {props.date}
          </time>
        </div>
      </div>
    </article>
  );
};

export default PostPreview;
