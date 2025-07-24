import type { PortableTextBlock } from '@portabletext/types';
import type { ImageAsset, Image, Slug } from '@sanity/types';

import groq from 'groq';

export const postQuery = groq`*[_type == "post" && slug.current == $slug][0] {
  ...,
  category->{
    title,
    slug
  }
}`;

export const productQuery = groq`*[_type == "product" && slug.current == $slug][0] {
  ...,
  category->{
    title,
    slug
  }
}`;

// list by category
export const postsByCategoryQuery = groq`*[_type == "post" && defined(slug.current) && references(*[_type == "category" && slug.current == $slug]._id)] | order(_createdAt desc) [$start...$end] {
  ...,
  category->{
    title,
    slug
  }
}`;

// count by category
export const postsCountByCategoryQuery = groq`count(*[_type == "post" && defined(slug.current) && references(*[_type == "category" && slug.current == $slug]._id)])`;

// 增加分页查询
export const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc) [$start...$end] {
  ...,
  category->{
    title,
    slug
  }
}`;

export const productsQuery = groq`*[_type == "product" && defined(slug.current)] | order(_createdAt desc) [$start...$end] {
  ...,
  category->{
    name,
    slug
  },
  style->{
    name,
    slug
  },
  stack->{
    name,
    slug
  }
}`;

export const sectionsQuery = groq`*[_type == "section" && defined(slug.current)] | order(_createdAt desc) {
  ...,
  slug
}`;

export const categoriesQuery = groq`*[_type == "category" && defined(slug.current)] | order(_createdAt desc) {
  ...,
  slug
}`;

export const stylesQuery = groq`*[_type == "style" && defined(slug.current)] | order(_createdAt desc) {
  ...,
  slug
}`;

export const techStacksQuery = groq`*[_type == "stack" && defined(slug.current)] | order(_createdAt desc) {
  ...,
  slug
}`;

export const postsSitemapQuery = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc) {
  ...,
  slug
}`;

export const productsSitemapQuery = groq`*[_type == "product" && defined(slug.current)] | order(_createdAt desc) {
  ...,
  slug
}`;

// 获取文章总数
export const postsCountQuery = groq`count(*[_type == "post" && defined(slug.current)])`;

export const productsCountQuery = groq`count(*[_type == "product" && defined(slug.current)])`;

// 检查分类是否存在
export const categoryQuery = groq`*[_type == "category" && slug.current == $slug][0]`;

export interface Post {
	_type: 'post';
	_createdAt: string;
	title?: string;
	url?: string;
	assertUrl?: string;
	slug: Slug;
	excerpt?: string;
	tags?: string[];
	mainImage?: ImageAsset;
	body: PortableTextBlock[];
	category: Category;
}

export interface Category {
	_type: 'category';
	_createdAt: string;
	title?: string;
	slug: Slug;
	excerpt?: string;
}

export interface Section {
	_type: 'section';
	_createdAt: string;
	title?: string;
	slug: Slug;
}

export interface Style {
	_type: 'style';
	_createdAt: string;
	title?: string;
	slug: Slug;
}

export interface TechStack {
	_type: 'techStack';
	_createdAt: string;
	title?: string;
	slug: Slug;
}

export interface Product {
	_type: 'product';
	_createdAt: string;
	url?: string;
	slug: Slug;
	title?: string;
	description?: string;
	mainImage: Image;
	category?: Category;
	style?: Style;
	stack?: TechStack;
}
