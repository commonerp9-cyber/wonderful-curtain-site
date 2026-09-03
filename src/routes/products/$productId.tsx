import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import products, { categories } from '../../data/products'

export const Route = createFileRoute('/products/$productId')({
  validateSearch: (search: Record<string, unknown>) => ({
    category: (search.category as string | undefined) ?? undefined,
    subcategory: (search.subcategory as string | undefined) ?? undefined,
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
  const categoryLabel = categories.find((c) => c.id === product.category)
    ?.label

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-5 md:px-8 py-8 md:py-12">
        <Link
          to="/"
          search={{
            category: search.category,
            subcategory: search.subcategory,
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
      </div>
    </div>
  )
}
