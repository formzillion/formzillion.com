import Markdown from "markdown-to-jsx";
import { getBlogContent, getBlogMetadata } from "../components/getData";

export const generateStaticParams = async () => {
  const posts = getBlogMetadata();
  return posts.map((post: any) => ({
    slug: post.slug,
  }));
};

const PostPage = (props: any) => {
  const slug = props.params.slug;
  const post = getBlogContent(slug);
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="my-12 text-center">
        <h1 className="text-2xl  text-slate-100">{post.data.title}</h1>
      </div>

      <article className="max-w-4xl prose prose-amber text-white prose-p:text-white prose-headings:text-gray-300 prose-img:w-[100%]">
        <Markdown>{post.content}</Markdown>
      </article>
    </div>
  );
};

export default PostPage;
