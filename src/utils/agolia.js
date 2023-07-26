import * as dotenv from "dotenv";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import removeMd from "remove-markdown";
import { glob } from "glob"; // Import the glob package

dotenv.config();

import algoliasearch from "algoliasearch";
const client = algoliasearch(
    process.env.ALGOLIA_APP_ID,
    process.env.ALGOLIA_WRITE_API_KEY
);

console.log(process.env.ALGOLIA_APP_ID);

const MAX_SIZE_IN_KB = 9;

const truncateContentToFit = (content, maxSizeInKB) => {
    const contentSizeInBytes = Buffer.byteLength(content, "utf-8");
    if (contentSizeInBytes / 1024 <= maxSizeInKB) {
        return content;
    } else {
        const truncatedContent = content.slice(
            0,
            Math.floor((maxSizeInKB * 1024 * content.length) / contentSizeInBytes)
        );
        return truncateContentToFit(truncatedContent, maxSizeInKB);
    }
};

const mdxFiles = glob.sync("../pages/w/**/*.mdx"); // Get all the .mdx files recursively

const data = mdxFiles.reduce((accumulator, filePath) => {
    try {
        const markdownWithMeta = fs.readFileSync(filePath);
        const { data: frontmatter, content } = matter(markdownWithMeta);
        const filePathParts = filePath.split(path.sep);
        const lastThreeSubDirs = filePathParts.slice(-3).join("/");
        const objectID = lastThreeSubDirs.slice(0, -4); // Remove the ".mdx" extension from the last part
        const entry = {
            objectID: objectID,
            title: frontmatter.title,
            date: frontmatter.date,
            slug: objectID,
            tags: frontmatter.tags,
            content: truncateContentToFit(removeMd(content).replace(/\n/g, ""), MAX_SIZE_IN_KB),
        };
        accumulator.push(entry);
    } catch (e) {
        console.error(`Error processing "${filePath}": ${e.message}`);
    }
    return accumulator;
}, []);

client
    .initIndex("dev_main")
    .saveObjects(data)
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
