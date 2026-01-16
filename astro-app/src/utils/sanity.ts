import { sanityClient } from "sanity:client";
import type { PortableTextBlock } from "@portabletext/types";
import type { ImageAsset, Slug } from "@sanity/types";
import groq from "groq";

export async function getPosts(): Promise<Post[]> {
  return await sanityClient.fetch(
    groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`
  );
}

export async function getPost(slug: string): Promise<Post> {
  return await sanityClient.fetch(
    groq`*[_type == "post" && slug.current == $slug][0]{
      ...,
      "categories": categories[]->title,
      "tags": tags[]->title
    }`,
    {
      slug,
    }
  );
}

export async function getHomeData(): Promise<{ posts: Post[]; thoughts: Thought[] }> {
  return await sanityClient.fetch(
    groq`{
      "posts": *[_type == "post" && defined(slug.current)] | order(_createdAt desc) {
        title,
        _createdAt,
        excerpt,
        slug,
        publishedAt,
        mainImage,
        "categories": categories[]->title,
        "tags": tags[]->title
      },
      "thoughts": *[_type == "thought"] | order(publishedAt desc)[0...20] {
        body,
        source,
        sourceUrl,
        images,
        publishedAt
      }
    }`
  );
}

export async function getCategoryData(categorySlug: string): Promise<{ posts: Post[]; thoughts: Thought[] }> {
  return await sanityClient.fetch(
    groq`{
      "posts": *[_type == "post" && defined(slug.current) && count((categories[]->slug.current)[@ == $categorySlug]) > 0] | order(_createdAt desc) {
        title,
        _createdAt,
        excerpt,
        slug,
        publishedAt,
        mainImage,
        "categories": categories[]->title,
        "tags": tags[]->title
      },
      "thoughts": *[_type == "thought"] | order(publishedAt desc)[0...20] {
        body,
        source,
        sourceUrl,
        images,
        publishedAt
      }
    }`,
    { categorySlug }
  );
}



export async function getCategoriesWithPosts(): Promise<Category[]> {
  return await sanityClient.fetch(
    groq`*[_type == "category" && count(*[_type == "post" && references(^._id)]) > 0] {
      title,
      slug
    }`
  );
}

export async function getCategories(): Promise<Category[]> {
  return await sanityClient.fetch(
    groq`*[_type == "category"] {
      title,
      slug
    }`
  );
}

export interface Post {
  _type: "post";
  _createdAt: string;
  title?: string;
  slug: Slug;
  excerpt?: string;
  readingTime?: number;
  mainImage?: ImageAsset & { alt?: string };
  body: PortableTextBlock[];
  categories?: string[];
  tags?: string[];
  publishedAt?: string;
}

export interface Thought {
  _type: "thought";
  body: string;
  source: "X" | "Instagram" | "Self" | "Other";
  sourceUrl?: string;
  images?: (ImageAsset & { alt?: string })[];
  publishedAt: string;
}

export interface Category {
  title: string;
  slug: Slug;
}
