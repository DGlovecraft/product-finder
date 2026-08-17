import Link from 'next/link'
import { products } from '@/data/products'
import { filterProducts } from '@/lib/filter-products'
 
const PAGE_SIZE = 4
 
type PageProps = {
  searchParams: Promise<{
    q?: string
    category?: string
    sort?: string
    page?: string
    minPrice?: string
    maxPrice?: string
  }>
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const query = params.q ?? ''
  const category = params.category ?? 'all'
  const sort =
    params.sort === 'price-asc' || params.sort === 'price-desc'
      ? params.sort
      : 'name'

  const minPriceValue =
    params.minPrice === undefined || params.minPrice === ''
      ? undefined
      : Number(params.minPrice)
  const maxPriceValue =
    params.maxPrice === undefined || params.maxPrice === ''
      ? undefined
      : Number(params.maxPrice)

  const minPrice = Number.isFinite(minPriceValue) ? minPriceValue : undefined
  const maxPrice = Number.isFinite(maxPriceValue) ? maxPriceValue : undefined

  const requestedPage = Number(params.page ?? '1')
  const filtered = filterProducts(products, {
    query,
    category,
    sort,
    minPrice,
    maxPrice,
  })
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Number.isFinite(requestedPage) && requestedPage > 0
    ? Math.min(Math.floor(requestedPage), totalPages)
    : 1
  const start = (currentPage - 1) * PAGE_SIZE
  const visibleProducts = filtered.slice(start, start + PAGE_SIZE)

  function pageHref(page: number) {
    const nextParams = new URLSearchParams()
    if (query) nextParams.set('q', query)
    if (category !== 'all') nextParams.set('category', category)
    if (sort !== 'name') nextParams.set('sort', sort)
    if (minPrice !== undefined) nextParams.set('minPrice', String(minPrice))
    if (maxPrice !== undefined) nextParams.set('maxPrice', String(maxPrice))
    nextParams.set('page', String(page))
    return `/products?${nextParams.toString()}`
  }

  const prevDisabled = currentPage <= 1
  const nextDisabled = currentPage >= totalPages

  return (
    <main className="mx-auto max-w-7xl px-5 py-10 md:py-14">
      <div className="ancient-book rounded-[26px] p-4 md:p-6">
        <header className="ancient-header mb-8 rounded-[18px] p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="ancient-badge inline-block rounded-full px-3 py-1 text-[10px] font-bold tracking-[0.28em]">
                The Scriptorium
              </span>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-[#2c1b10] md:text-5xl">
                Product Finder
              </h1>
            </div>
            <div className="folio-ornament rounded-full border border-[#5c3f2c]/70 bg-[#f8f0d6]/60 px-4 py-2 text-sm text-[#412d1e]">
              Catalogus Mercatorum
            </div>
          </div>
        </header>

        <form
          action="/products"
          method="get"
          className="ancient-panel mt-4 grid gap-4 rounded-[18px] p-5 md:grid-cols-6"
        >
          <label className="md:col-span-2">
            <span className="mb-1 block text-sm font-semibold text-[#3a2718]">คำค้นหา</span>
            <input
              type="search"
              name="q"
              defaultValue={query}
              className="ancient-input w-full rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-[#7f5a32]/30"
            />
          </label>

          <label>
            <span className="mb-1 block text-sm font-semibold text-[#3a2718]">หมวดหมู่</span>
            <select
              name="category"
              defaultValue={category}
              className="ancient-select w-full rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-[#7f5a32]/30"
            >
              <option value="all">ทั้งหมด</option>
              <option value="office">Office</option>
              <option value="tech">Tech</option>
              <option value="lifestyle">Lifestyle</option>
            </select>
          </label>

          <label>
            <span className="mb-1 block text-sm font-semibold text-[#3a2718]">ราคาต่ำสุด</span>
            <input
              type="number"
              name="minPrice"
              min="0"
              defaultValue={minPrice ?? ''}
              className="ancient-input w-full rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-[#7f5a32]/30"
            />
          </label>

          <label>
            <span className="mb-1 block text-sm font-semibold text-[#3a2718]">ราคาสูงสุด</span>
            <input
              type="number"
              name="maxPrice"
              min="0"
              defaultValue={maxPrice ?? ''}
              className="ancient-input w-full rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-[#7f5a32]/30"
            />
          </label>

          <label>
            <span className="mb-1 block text-sm font-semibold text-[#3a2718]">เรียงตาม</span>
            <select
              name="sort"
              defaultValue={sort}
              className="ancient-select w-full rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-[#7f5a32]/30"
            >
              <option value="name">ชื่อ</option>
              <option value="price-asc">ราคาน้อยไปมาก</option>
              <option value="price-desc">ราคามากไปน้อย</option>
            </select>
          </label>

          <div className="flex gap-3 md:col-span-6 md:justify-start">
            <button className="ancient-button rounded-xl px-5 py-2.5 font-semibold">
              ค้นหา
            </button>
            <Link
              href="/products"
              className="ancient-button-secondary rounded-xl px-5 py-2.5 font-semibold"
            >
              ล้างตัวกรอง
            </Link>
          </div>
        </form>

        <p role="status" className="my-6 text-sm font-medium text-[#4f3424]">
          พบ {filtered.length} รายการ · หน้า {currentPage} จาก {totalPages}
        </p>

        {visibleProducts.length === 0 ? (
          <div className="ancient-panel rounded-[18px] border border-dashed border-[#5d402d]/60 p-12 text-center">
            <h2 className="text-2xl font-bold text-[#2d1d10]">ไม่พบสินค้า</h2>
            <p className="mt-3 text-[#4f3424]">ลองเปลี่ยนคำค้นหา หรือปรับช่วงราคาให้ตรงกับของในคลัง</p>
          </div>
        ) : (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {visibleProducts.map((product) => (
              <li key={product.id} className="ancient-card rounded-[18px] p-5">
                <p className="ancient-badge inline-block rounded-full px-2.5 py-1 text-[9px] font-bold tracking-[0.22em]">
                  {product.category}
                </p>
                <h2 className="mt-4 text-xl font-bold text-[#2d1d10]">{product.name}</h2>
                <p className="mt-5 text-2xl font-black text-[#7a4d1d]">
                  {product.price.toLocaleString('th-TH')} บาท
                </p>
              </li>
            ))}
          </ul>
        )}

        <nav aria-label="Pagination" className="ancient-pagination mt-8 flex flex-wrap justify-center gap-2">
          {prevDisabled ? (
            <span className="disabled rounded-xl px-4 py-2 text-sm font-medium">
              Previous
            </span>
          ) : (
            <Link
              href={pageHref(currentPage - 1)}
              className="rounded-xl px-4 py-2 text-sm font-medium"
            >
              Previous
            </Link>
          )}

          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <Link
                key={page}
                href={pageHref(page)}
                aria-current={page === currentPage ? 'page' : undefined}
                className="rounded-xl px-4 py-2 text-sm font-medium"
              >
                {page}
              </Link>
            ),
          )}

          {nextDisabled ? (
            <span className="disabled rounded-xl px-4 py-2 text-sm font-medium">
              Next
            </span>
          ) : (
            <Link
              href={pageHref(currentPage + 1)}
              className="rounded-xl px-4 py-2 text-sm font-medium"
            >
              Next
            </Link>
          )}
        </nav>
      </div>
    </main>
  )
}