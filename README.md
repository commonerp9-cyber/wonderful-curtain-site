# 커튼하우스

커튼, 커튼 제작 부자재, 커튼 제작 기계를 소개하는 제품 카탈로그 사이트입니다. 실제 온라인 판매(가격/결제)는 제공하지 않고, 제품 정보를 보여주는 데 초점을 맞췄습니다.

## 주요 기능

- 검색: 상단 검색창으로 제품명/설명을 실시간으로 검색
- 필터: 오른쪽(모바일에서는 슬라이드 메뉴) 카테고리 내비게이션으로 커튼 / 부자재 / 제작 기계 필터링
- 제품 상세 페이지: 각 제품의 설명과 규격(spec) 정보 표시

## 기술 스택

- [TanStack Start](https://tanstack.com/start) (React 19, TanStack Router)
- Vite 7
- Tailwind CSS 4
- lucide-react (아이콘)
- Netlify (배포)

## 로컬 개발

```bash
npm install
npm run dev
```

기본적으로 `http://localhost:3000` 에서 실행됩니다. Netlify 기능(리다이렉트 등)을 함께 확인하려면 Netlify CLI로 실행하세요:

```bash
netlify dev
```

## 빌드

```bash
npm run build
```

## 제품 데이터

제품 목록과 카테고리는 `src/data/products.ts` 에서 관리합니다. 새 제품을 추가하려면 이 배열에 항목을 추가하면 됩니다.
