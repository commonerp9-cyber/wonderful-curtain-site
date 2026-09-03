import { Link, createFileRoute } from '@tanstack/react-router'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ChevronDown,
  ChevronRight,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react'
import products, { categories, subcategories } from '@/data/products'
import type { Category } from '@/data/products'

export const Route = createFileRoute('/')({
  component: ProductsIndex,
})

const heroSlides = [
  {
    title: '암막커튼 컬렉션',
    subtitle: '완벽한 빛 차단과 편안한 휴식',
    image: '/images/curtain-hero-livingroom.jpg',
  },
  {
    title: '쉬어커튼 컬렉션',
    subtitle: '자연광을 담는 부드러운 감성',
    image: '/images/curtain-room-beige.jpg',
  },
  {
    title: '리넨커튼 컬렉션',
    subtitle: '내추럴한 텍스처의 완성',
    image: '/images/curtain-room-brown.jpg',
  },
  {
    title: '커튼 부자재 & 제작 기계',
    subtitle: '전문가의 손길을 더하는 도구',
    image: '/images/curtain-room-blue.jpg',
  },
]

function ProductsIndex() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>(
    'all',
  )
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(
    null,
  )
  const [navOpen, setNavOpen] = useState(false)

  const handleSelect = (
    category: Category | 'all',
    subcategory: string | null = null,
  ) => {
    setActiveCategory(category)
    setActiveSubcategory(subcategory)
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === 'all' || product.category === activeCategory
      const matchesSubcategory =
        !activeSubcategory || product.subcategory === activeSubcategory
      const matchesQuery =
        q.length === 0 ||
        product.name.toLowerCase().includes(q) ||
        product.shortDescription.toLowerCase().includes(q)
      return matchesCategory && matchesSubcategory && matchesQuery
    })
  }, [query, activeCategory, activeSubcategory])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-4 flex items-center gap-4">
          <Link
            to="/"
            className="font-display text-2xl md:text-3xl text-[var(--color-clay-dark)] shrink-0"
          >
            열린창 커튼
          </Link>

          <div className="flex-1 max-w-md ml-auto relative">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-taupe)]"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="제품명을 검색해보세요"
              className="w-full rounded-full border border-[var(--color-border)] bg-[var(--color-linen)] py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[var(--color-clay)] transition-colors"
            />
          </div>

          <button
            onClick={() => setNavOpen(true)}
            className="lg:hidden shrink-0 flex items-center gap-1.5 rounded-full border border-[var(--color-border)] px-4 py-2.5 text-sm text-[var(--color-ink)]"
          >
            <SlidersHorizontal size={16} />
            메뉴
          </button>
        </div>
      </header>

      <HeroCarousel />

      <div className="max-w-7xl mx-auto px-5 md:px-8 py-10 md:py-14 lg:flex lg:gap-12 lg:flex-row-reverse">
        {/* Right-side navigation / filter panel */}
        <aside className="hidden lg:block w-56 shrink-0">
          <NavPanel
            activeCategory={activeCategory}
            activeSubcategory={activeSubcategory}
            onSelect={handleSelect}
            variant="flyout"
          />
        </aside>

        {/* Mobile slide-over nav */}
        {navOpen && (
          <div className="lg:hidden fixed inset-0 z-40 flex justify-end">
            <div
              className="absolute inset-0 bg-black/30"
              onClick={() => setNavOpen(false)}
            />
            <div className="relative w-72 max-w-[85%] bg-white h-full p-6 shadow-xl overflow-y-auto">
              <button
                onClick={() => setNavOpen(false)}
                className="mb-6 flex items-center gap-1 text-sm text-[var(--color-taupe)]"
              >
                <X size={18} />
                닫기
              </button>
              <NavPanel
                activeCategory={activeCategory}
                activeSubcategory={activeSubcategory}
                onSelect={(category, subcategory) => {
                  handleSelect(category, subcategory)
                  setNavOpen(false)
                }}
                variant="inline"
              />
            </div>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 min-w-0">
          <div className="mb-10 md:mb-14">
            <p className="text-sm text-[var(--color-clay-dark)] font-medium mb-2">
              PRODUCT CATALOG
            </p>
            <h1 className="font-display text-3xl md:text-4xl leading-snug mb-3">
              커튼 한 폭에 담긴,
              <br />
              편안하고 정갈한 공간
            </h1>
            <p className="text-[var(--color-taupe)] leading-relaxed max-w-xl">
              커튼, 커튼 제작 부자재, 제작 기계까지. 우리가 만드는 모든
              제품을 소개합니다. 오른쪽 메뉴에서 카테고리를 선택하거나
              검색창에서 원하는 제품을 찾아보세요.
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-24 text-[var(--color-taupe)]">
              검색 결과가 없습니다. 다른 검색어를 입력해보세요.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
              {filtered.map((product) => (
                <Link
                  key={product.id}
                  to="/products/$productId"
                  params={{ productId: product.id.toString() }}
                  className="group block rounded-2xl border border-[var(--color-border)] overflow-hidden hover:shadow-lg hover:border-[var(--color-clay)] transition-all bg-white"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-[var(--color-linen)]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-medium text-[var(--color-clay-dark)]">
                      {
                        categories.find((c) => c.id === product.category)
                          ?.label
                      }{' '}
                      · {product.subcategory}
                    </span>
                    <h2 className="text-lg font-semibold mt-1 mb-1.5">
                      {product.name}
                    </h2>
                    <p className="text-sm text-[var(--color-taupe)] leading-relaxed">
                      {product.shortDescription}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

function HeroCarousel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % heroSlides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-64 md:h-96 overflow-hidden bg-[var(--color-linen)]">
      {heroSlides.map((slide, i) => (
        <div
          key={slide.title}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <h2 className="font-display text-2xl md:text-4xl text-white mb-2">
              {slide.title}
            </h2>
            <p className="text-white/90 text-sm md:text-base">
              {slide.subtitle}
            </p>
          </div>
        </div>
      ))}

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {heroSlides.map((slide, i) => (
          <button
            key={slide.title}
            onClick={() => setIndex(i)}
            aria-label={`${slide.title} 슬라이드로 이동`}
            className={`h-2 rounded-full transition-all ${
              i === index ? 'w-6 bg-white' : 'w-2 bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

function NavPanel({
  activeCategory,
  activeSubcategory,
  onSelect,
  variant,
}: {
  activeCategory: Category | 'all'
  activeSubcategory: string | null
  onSelect: (category: Category | 'all', subcategory?: string | null) => void
  variant: 'flyout' | 'inline'
}) {
  const [openCategory, setOpenCategory] = useState<Category | null>(null)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
  }

  const openSubmenu = (id: Category) => {
    clearCloseTimeout()
    setOpenCategory(id)
  }

  const scheduleCloseSubmenu = (id: Category) => {
    clearCloseTimeout()
    closeTimeoutRef.current = setTimeout(() => {
      setOpenCategory((current) => (current === id ? null : current))
    }, 300)
  }

  useEffect(() => clearCloseTimeout, [])

  return (
    <nav className="lg:sticky lg:top-24">
      <p className="text-xs font-semibold text-[var(--color-taupe)] mb-4 tracking-wide">
        카테고리
      </p>
      <ul className="flex flex-col gap-1">
        <li>
          <button
            onClick={() => onSelect('all')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-colors ${
              activeCategory === 'all'
                ? 'bg-[var(--color-clay)] text-white font-medium'
                : 'text-[var(--color-ink)] hover:bg-[var(--color-linen)]'
            }`}
          >
            전체 보기
          </button>
        </li>
        {categories.map((category) => {
          const subs = subcategories[category.id]
          const isOpen = openCategory === category.id
          const isActiveCategory = activeCategory === category.id
          const isFlyout = variant === 'flyout'
          const Chevron = isFlyout ? ChevronRight : ChevronDown

          return (
            <li
              key={category.id}
              className="relative"
              onMouseEnter={() => openSubmenu(category.id)}
              onMouseLeave={() => scheduleCloseSubmenu(category.id)}
            >
              <button
                onClick={() => {
                  onSelect(category.id)
                  openSubmenu(category.id)
                }}
                className={`w-full flex items-center justify-between gap-2 text-left px-4 py-2.5 rounded-xl text-sm transition-colors ${
                  isActiveCategory && !activeSubcategory
                    ? 'bg-[var(--color-clay)] text-white font-medium'
                    : 'text-[var(--color-ink)] hover:bg-[var(--color-linen)]'
                }`}
              >
                <span>{category.label}</span>
                <Chevron
                  size={14}
                  className={`transition-transform ${
                    isActiveCategory && !activeSubcategory
                      ? 'opacity-80'
                      : 'opacity-40'
                  } ${!isFlyout && isOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isFlyout && isOpen && (
                <div
                  className="absolute right-full top-0 mr-2 w-40 rounded-xl border border-[var(--color-border)] bg-white shadow-lg p-1.5 z-10"
                  onMouseEnter={() => openSubmenu(category.id)}
                  onMouseLeave={() => scheduleCloseSubmenu(category.id)}
                >
                  {subs.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => {
                        onSelect(category.id, sub)
                        setOpenCategory(null)
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        isActiveCategory && activeSubcategory === sub
                          ? 'bg-[var(--color-clay)] text-white font-medium'
                          : 'text-[var(--color-ink)] hover:bg-[var(--color-linen)]'
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}

              {!isFlyout && isOpen && (
                <div className="mt-1 ml-4 flex flex-col gap-1 border-l border-[var(--color-border)] pl-3">
                  {subs.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => onSelect(category.id, sub)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        isActiveCategory && activeSubcategory === sub
                          ? 'bg-[var(--color-clay)] text-white font-medium'
                          : 'text-[var(--color-ink)] hover:bg-[var(--color-linen)]'
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
