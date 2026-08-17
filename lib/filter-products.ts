import type { Product } from '@/data/products'
 
export type ProductFilters = {
  query: string
  category: string
  sort: 'name' | 'price-asc' | 'price-desc'
  minPrice?: number
  maxPrice?: number
}

export function filterProducts(
  products: Product[],
  filters: ProductFilters,
) {
  const query = filters.query.trim().toLowerCase()
  const minPrice = Number.isFinite(filters.minPrice)
    ? filters.minPrice!
    : undefined
  const maxPrice = Number.isFinite(filters.maxPrice)
    ? filters.maxPrice!
    : undefined

  return products
    .filter((product) => {
      const matchesQuery = product.name.toLowerCase().includes(query)
      const matchesCategory =
        filters.category === 'all' || product.category === filters.category
      const matchesMinPrice =
        minPrice === undefined || product.price >= minPrice
      const matchesMaxPrice =
        maxPrice === undefined || product.price <= maxPrice
      return (
        matchesQuery &&
        matchesCategory &&
        matchesMinPrice &&
        matchesMaxPrice
      )
    })
    .toSorted((a, b) => {
      if (filters.sort === 'price-asc') return a.price - b.price
      if (filters.sort === 'price-desc') return b.price - a.price
      return a.name.localeCompare(b.name)
    })
}