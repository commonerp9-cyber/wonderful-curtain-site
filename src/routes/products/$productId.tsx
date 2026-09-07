import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import products, { categories } from '../../data/products'
import type { Category } from '../../data/products'
import { Header, NavPanel, MobileNavOverlay } from '@/components/SiteNav'

export const Route = createFileRoute('/products/$productId')({
  validateSearch: (search: Record<string, unknown>) => ({
    category: (search.category as string | undefined) ?? undefined,
    subcategory: (search.subcategory as string | undefined) ?? undefined,
    mini: (search.mini as string | undefined) ?? undefined,
  }),
  component: RouteComponent,
  loader: async ({ params }) => {
    const product = products.find(
      (product) => product.id === +params.productId,
    )
    if (!product) {
      throw notFound()
    }
    return product
  },
})

function RouteComponent() {
  const product = Route.useLoaderData()
  const search = Route.useSearch()
  const navigate = Route.useNavigate()
  const [navOpen, setNavOpen] = useState(false)
  const [query, setQueryState] = useState('')

  const activeCategory = (search.category as Category | undefined) ?? 'all'
  const activeSubcategory = search.subcategory ?? null
  const activeMinicategory = search.mini ?? null

  const categoryLabel = categories.find((c) => c.id === product.category)
    ?.label

  // Selecting a category/subcategory/mini from here takes you to the
  // catalog page filtered accordingly, since filtering only happens there.
  const goToCatalog = (
    category: Category | 'all',
    subcategory: string | null = null,
    mini: string | null = null,
  ) => {
    navigate({
      to: '/',
      search: {
        category: category === 'all' ? undefined : category,
        subcategory: subcategory ?? undefined,
        mini: mini ?? undefined,
      },
    })
  }

  const handleQueryChange = (value: string) => {
    setQueryState(value)
    navigate({
      to: '/',
      search: { q: value || undefined },
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <Header
        query={query}
        onQueryChange={handleQueryChange}
        onMenuOpen={() => setNavOpen(true)}
      />

      <div className="max-w-7xl mx-auto px-5 md:px-8 py-10 md:py-14 lg:flex lg:gap-12 lg:flex-row-reverse">
        <aside className="hidden lg:block w-56 shrink-0">
          <NavPanel
            activeCategory={activeCategory}
            activeSubcategory={activeSubcategory}
            activeMinicategory={activeMinicategory}
            onSelect={goToCatalog}
            variant="flyout"
          />
        </aside>

        <MobileNavOverlay
          open={navOpen}
          onClose={() => setNavOpen(false)}
          activeCategory={activeCategory}
          activeSubcategory={activeSubcategory}
          activeMinicategory={activeMinicategory}
          onSelect={goToCatalog}
        />

        <main className="flex-1 min-w-0">
          <Link
            to="/"
            search={{
              category: search.category,
              subcategory: search.subcategory,
              mini: search.mini,
            }}
            className="inline-flex items-center gap-1.5 text-sm text-[var(--color-taupe)] hover:text-[var(--color-clay-dark)] mb-8 transition-colors"
          >
            <ArrowLeft size={16} />
            전체 제품으로 돌아가기
          </Link>

          <div className="flex flex-col md:flex-row gap-10 md:gap-14">
            <div className="w-full md:w-1/2">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[var(--color-linen)]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <span className="text-xs font-medium text-[var(--color-clay-dark)]">
                {categoryLabel} · {product.subcategory}
                {product.minicategory ? ` · ${product.minicategory}` : ''}
              </span>
              <h1 className="font-display text-2xl md:text-3xl mt-2 mb-4">
                {product.name}
              </h1>
              <p className="text-[var(--color-ink)] leading-relaxed mb-8">
                {product.description}
              </p>

              <div className="rounded-2xl border border-[var(--color-border)] divide-y divide-[var(--color-border)]">
                {product.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex px-5 py-3.5 text-sm gap-4"
                  >
                    <span className="w-24 shrink-0 text-[var(--color-taupe)]">
                      {spec.label}
                    </span>
                    <span className="text-[var(--color-ink)]">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-[var(--color-taupe)] mt-6">
                * 본 페이지는 제품 소개용이며, 온라인 구매는 지원하지
                않습니다. 자세한 상담은 매장 또는 고객센터로 문의해주세요.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
