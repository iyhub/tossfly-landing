import {
	postsQuery as query,
	type Post,
	type Section,
	type Category,
	type Style,
	type TechStack,
	type Product
} from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';
import {
	postsCountQuery as postsCountQuery,
	sectionsQuery,
	categoriesQuery,
	stylesQuery,
	techStacksQuery,
	productsQuery,
	productsCountQuery
} from '$lib/sanity/queries';

export const load: PageServerLoad = async (event) => {
	const { loadQuery } = event.locals;

	// 获取分页参数
	const page = Number(event.url.searchParams.get('page')) || 1;
	const pageSize = Number(event.url.searchParams.get('pageSize')) || 12;

	// 计算分页的起始和结束位置
	const start = (page - 1) * pageSize;
	const end = start + pageSize;

	// 使用 Promise.all 并行执行所有查询
	const [products, productsCount, sections, categories, styles, techStacks] = await Promise.all([
		// loadQuery<Post[]>(query, { start, end }),
		// loadQuery<number>(postsCountQuery),
		loadQuery<Product[]>(productsQuery, { start, end }),
		loadQuery<number>(productsCountQuery),
		loadQuery<Section[]>(sectionsQuery),
		loadQuery<Category[]>(categoriesQuery),
		loadQuery<Style[]>(stylesQuery),
		loadQuery<TechStack[]>(techStacksQuery)
	]);

	const count = Number(productsCount.data);

	return {
		query,
		count,
		options: {
			page,
			pageSize,
			totalPages: Math.ceil(count / pageSize),
			products,
			productsCount,
			sections,
			categories,
			styles,
			techStacks
		}
	};
};
