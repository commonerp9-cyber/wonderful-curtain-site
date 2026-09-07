import { Link } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import {
  ChevronDown,
  ChevronRight,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react'
import { categories, subcategories, minicategories } from '@/data/products'
import type { Category } from '@/data/products'

export function Header({
  query,
  onQueryChange,
  onMenuOpen,
}: {
  query: string
  onQueryChange: (value: string) => void
  onMenuOpen: () => void
}) {
  return (
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
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="제품명을 검색해보세요"
            className="w-full rounded-full border border-[var(--color-border)] bg-[var(--color-linen)] py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[var(--color-clay)] transition-colors"
          />
        </div>

        <button
          onClick={onMenuOpen}
          className="lg:hidden shrink-0 flex items-center gap-1.5 rounded-full border border-[var(--color-border)] px-4 py-2.5 text-sm text-[var(--color-ink)]"
        >
          <SlidersHorizontal size={16} />
          메뉴
        </button>
      </div>
    </header>
  )
}

export function NavPanel({
  activeCategory,
  activeSubcategory,
  activeMinicategory,
  onSelect,
  variant,
}: {
  activeCategory: Category | 'all'
  activeSubcategory: string | null
  activeMinicategory: string | null
  onSelect: (
    category: Category | 'all',
    subcategory?: string | null,
    mini?: string | null,
  ) => void
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

  const renderSubcategoryList = (category: Category) => {
    const subs = subcategories[category]
    const isActiveCategory = activeCategory === category

    return (
      <>
        {subs.map((sub) => {
          const minis = minicategories[sub]
          const isActiveSub = isActiveCategory && activeSubcategory === sub

          return (
            <div key={sub}>
              <button
                onClick={() => {
                  onSelect(category, sub, null)
                  if (variant === 'flyout') setOpenCategory(null)
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActiveSub && !activeMinicategory
                    ? 'bg-[var(--color-clay)] text-white font-medium'
                    : 'text-[var(--color-ink)] hover:bg-[var(--color-linen)]'
                }`}
              >
                {sub}
              </button>

              {minis && (
                <div className="ml-3 mt-0.5 flex flex-col gap-0.5 border-l border-[var(--color-border)] pl-2.5">
                  {minis.map((mini) => {
                    const isActiveMini =
                      isActiveCategory &&
                      activeSubcategory === sub &&
                      activeMinicategory === mini

                    return (
                      <button
                        key={mini}
                        onClick={() => {
                          onSelect(category, sub, mini)
                          if (variant === 'flyout') setOpenCategory(null)
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                          isActiveMini
                            ? 'bg-[var(--color-clay)] text-white font-medium'
                            : 'text-[var(--color-taupe)] hover:bg-[var(--color-linen)]'
                        }`}
                      >
                        {mini}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </>
    )
  }

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
                  className="absolute right-full top-0 mr-2 w-48 max-h-[70vh] overflow-y-auto rounded-xl border border-[var(--color-border)] bg-white shadow-lg p-1.5 z-10"
                  onMouseEnter={() => openSubmenu(category.id)}
                  onMouseLeave={() => scheduleCloseSubmenu(category.id)}
                >
                  {renderSubcategoryList(category.id)}
                </div>
              )}

              {!isFlyout && isOpen && (
                <div className="mt-1 ml-4 flex flex-col gap-1 border-l border-[var(--color-border)] pl-3">
                  {renderSubcategoryList(category.id)}
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export function MobileNavOverlay({
  open,
  onClose,
  activeCategory,
  activeSubcategory,
  activeMinicategory,
  onSelect,
}: {
  open: boolean
  onClose: () => void
  activeCategory: Category | 'all'
  activeSubcategory: string | null
  activeMinicategory: string | null
  onSelect: (
    category: Category | 'all',
    subcategory?: string | null,
    mini?: string | null,
  ) => void
}) {
  if (!open) return null

  return (
    <div className="lg:hidden fixed inset-0 z-40 flex justify-end">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative w-72 max-w-[85%] bg-white h-full p-6 shadow-xl overflow-y-auto">
        <button
          onClick={onClose}
          className="mb-6 flex items-center gap-1 text-sm text-[var(--color-taupe)]"
        >
          <X size={18} />
          닫기
        </button>
        <NavPanel
          activeCategory={activeCategory}
          activeSubcategory={activeSubcategory}
          activeMinicategory={activeMinicategory}
          onSelect={(category, subcategory, mini) => {
            onSelect(category, subcategory, mini)
            onClose()
          }}
          variant="inline"
        />
      </div>
    </div>
  )
}
