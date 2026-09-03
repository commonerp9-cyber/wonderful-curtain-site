import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { Blinds, Mail, MapPin, Phone } from 'lucide-react'

import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: '열린창 커튼 | 커튼 · 부자재 · 제작 기계',
      },
      {
        name: 'description',
        content:
          '커튼, 커튼 제작 부자재, 커튼 제작 기계를 한눈에 살펴보는 제품 소개 사이트입니다.',
      },
    ],
    links: [
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@400;700&family=Noto+Sans+KR:wght@300;400;500;600;700&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Footer />
        <Scripts />
      </body>
    </html>
  )
}

function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-linen)]">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-10 md:py-12 flex flex-col md:flex-row md:items-start md:justify-between gap-8">
        <div className="flex items-center gap-2">
          <Blinds size={22} className="text-[var(--color-clay-dark)]" />
          <span className="font-display text-xl text-[var(--color-clay-dark)]">
            열린창 커튼
          </span>
        </div>

        <div className="flex flex-col gap-2.5 text-sm text-[var(--color-taupe)]">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-[var(--color-clay)] shrink-0" />
            <span>서울특별시 종로구 창덕궁길 12, 3층</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={16} className="text-[var(--color-clay)] shrink-0" />
            <span>02-1234-5678</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-[var(--color-clay)] shrink-0" />
            <span>info@yeollincurtain.co.kr</span>
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--color-border)]">
        <p className="max-w-7xl mx-auto px-5 md:px-8 py-4 text-xs text-[var(--color-taupe)]">
          © {new Date().getFullYear()} 열린창 커튼. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
