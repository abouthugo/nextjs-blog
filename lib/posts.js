import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

/**
 * Returns an array of {params} which inside there is {id}
 */
export function getAllPostIds() {
  const filenames = fs.readdirSync(postsDirectory);
  return filenames.map((filename) => {
    return {
      params: {
        id: filename.replace(/\.md$/, ""),
      },
    };
  });

  /**
   * Important: The returned list is not just an array of strings — it must be an array of objects that look like the return above.
   * Each object must have the "params" key and contain an object with the "id" key (because we’re using [id] in the file name).
   * Otherwise, getStaticPaths will fail.
   */
}

/**
 * Gets the data from a given post
 * @param {String} id
 */
export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContent = fs.readFileSync(fullPath, "utf-8");

  // Use gray-matter to parse the post metadata section
  const matterResults = matter(fileContent);

  // Parse the markdown
  const processedContent = await remark()
    .use(html)
    .process(matterResults.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...matterResults.data,
  };
}
