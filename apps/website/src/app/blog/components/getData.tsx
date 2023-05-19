import fs from "fs";
import matter from "gray-matter";
import { BlogMetadata } from "./BlogMetaData";

const postsPath = `${__dirname.split(".next")[0]}\src\\app\\blog\\posts`;

// to get blog meta data
export const getBlogMetadata = (): BlogMetadata[] => {
  const files = fs.readdirSync(postsPath);
  const markdownBlogs = files.filter((file) => file.endsWith(".md"));

  const blogs = markdownBlogs.map((fileName) => {
    const fileContents = fs.readFileSync(`${postsPath}\\${fileName}`, "utf8");
    const matterResult = matter(fileContents)?.data as {
      title: string;
      date: string;
      subtitle: string;
      author: string;
      banner: string
    };

    return {
      ...matterResult,
      slug: fileName.replace(".md", ""),
    };
  });

  return blogs;
};

// to get blog content
export const getBlogContent = (slug: string) => {
  const file = `${postsPath}\\${slug}.md`;
  const content = fs.readFileSync(file, "utf8");
  const matterResult = matter(content);
  return matterResult;
};
