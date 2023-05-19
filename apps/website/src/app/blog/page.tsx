import AppIcon from "@/ui/AppIcon";
import BlogPreview from "./components/BlogPreview";
import { getBlogMetadata } from "./components/getData";

export default function Blog() {
  const postMetadata = getBlogMetadata();
  const postPreviews = postMetadata.map((post) => (
    <BlogPreview key={post.slug} {...post} />
  ));

  return (
    <>
      <div className="py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center w-full flex flex-col space-y-6 items-center">
            <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2 sm:text-4xl">
              <AppIcon src={"/logos/favicon.svg"} /> The Formzillion blog
            </h2>
            <p className="mt-2 text-lg leading-8 lg:max-w-2xl">
              Explore the latest updates on Formzillion, in-depth tutorials on
              building powerful forms for everyone.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:space-x-6 mt-8">
            {postPreviews}
          </div>
        </div>
      </div>
    </>
  );
}
