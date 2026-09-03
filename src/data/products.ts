export type Category = 'curtain' | 'component' | 'machine'

export interface Product {
  id: number
  name: string
  category: Category
  subcategory: string
  image: string
  shortDescription: string
  description: string
  specs: Array<{ label: string; value: string }>
}

export const categories: Array<{ id: Category; label: string }> = [
  { id: 'curtain', label: '커튼' },
  { id: 'component', label: '커튼 부자재' },
  { id: 'machine', label: '제작 기계' },
]

export const subcategories: Record<Category, Array<string>> = {
  curtain: ['암막커튼', '쉬어커튼', '리넨커튼'],
  component: ['씽', '핀', '브라켓', '레일', '기타'],
  machine: ['미싱기', '형상기', '재단기'],
}

const products: Array<Product> = [
  {
    id: 1,
    name: '암막 커튼 - 딥그레이',
    category: 'curtain',
    subcategory: '암막커튼',
    image: '/images/curtain-room-blue.jpg',
    shortDescription: '빛을 완벽히 차단하는 프리미엄 암막 커튼',
    description:
      '침실과 홈시네마에 적합한 고밀도 암막 원단으로, 외부 빛과 열을 효과적으로 차단합니다. 은은한 딥그레이 컬러로 어떤 인테리어에도 자연스럽게 어우러집니다.',
    specs: [
      { label: '원단', value: '폴리에스터 100% (암막 코팅)' },
      { label: '색상', value: '딥그레이' },
      { label: '규격', value: '폭 140cm x 길이 220cm (맞춤 제작 가능)' },
      { label: '관리', value: '드라이클리닝 권장' },
    ],
  },
  {
    id: 2,
    name: '쉬어 커튼 - 아이보리',
    category: 'curtain',
    subcategory: '쉬어커튼',
    image: '/images/curtain-room-beige.jpg',
    shortDescription: '자연광을 부드럽게 담아내는 시어 커튼',
    description:
      '얇고 가벼운 시어 원단으로 채광을 살리면서도 은은한 프라이버시를 지켜줍니다. 거실이나 카페 인테리어에 특히 잘 어울립니다.',
    specs: [
      { label: '원단', value: '폴리에스터 시어 원단' },
      { label: '색상', value: '아이보리' },
      { label: '규격', value: '폭 150cm x 길이 240cm (맞춤 제작 가능)' },
      { label: '관리', value: '중성세제 손세탁' },
    ],
  },
  {
    id: 3,
    name: '리넨 커튼 - 내추럴',
    category: 'curtain',
    subcategory: '리넨커튼',
    image: '/images/curtain-room-blue.jpg',
    shortDescription: '자연스러운 질감의 내추럴 리넨 커튼',
    description:
      '리넨 특유의 자연스러운 텍스처와 주름감이 살아있는 커튼입니다. 우드톤 가구와 함께 코지한 분위기를 완성합니다.',
    specs: [
      { label: '원단', value: '리넨 혼방 55%' },
      { label: '색상', value: '내추럴 베이지' },
      { label: '규격', value: '폭 135cm x 길이 210cm (맞춤 제작 가능)' },
      { label: '관리', value: '드라이클리닝 권장' },
    ],
  },
  {
    id: 4,
    name: '커튼링 세트 (스테인리스)',
    category: 'component',
    subcategory: '씽',
    image: '/placeholder.png',
    shortDescription: '부드러운 개폐감의 스테인리스 커튼링',
    description:
      '내구성이 뛰어난 스테인리스 소재로 제작되어 오랜 사용에도 변형이 적습니다. 다양한 커튼 원단과 레일에 호환됩니다.',
    specs: [
      { label: '소재', value: '스테인리스 스틸' },
      { label: '구성', value: '10개입 1세트' },
      { label: '내경', value: '4cm' },
      { label: '호환', value: '일반형 커튼레일' },
    ],
  },
  {
    id: 10,
    name: '씽(중간)',
    category: 'component',
    subcategory: '씽',
    image: '/placeholder.png',
    shortDescription: '부드러운 개폐감의 스테인리스 커튼링',
    description:
      '내구성이 뛰어난 스테인리스 소재로 제작되어 오랜 사용에도 변형이 적습니다. 다양한 커튼 원단과 레일에 호환됩니다.',
    specs: [
      { label: '소재', value: '스테인리스 스틸' },
      { label: '구성', value: '10개입 1세트' },
      { label: '내경', value: '4cm' },
      { label: '호환', value: '일반형 커튼레일' },
    ],
  },
  {
    id: 11,
    name: '씽(중간-역방향)',
    category: 'component',
    subcategory: '씽',
    image: '/placeholder.png',
    shortDescription: '부드러운 개폐감의 스테인리스 커튼링',
    description:
      '내구성이 뛰어난 스테인리스 소재로 제작되어 오랜 사용에도 변형이 적습니다. 다양한 커튼 원단과 레일에 호환됩니다.',
    specs: [
      { label: '소재', value: '스테인리스 스틸' },
      { label: '구성', value: '10개입 1세트' },
      { label: '내경', value: '4cm' },
      { label: '호환', value: '일반형 커튼레일' },
    ],
  },
  {
    id: 12,
    name: '씽(하)',
    category: 'component',
    subcategory: '씽',
    image: '/placeholder.png',
    shortDescription: '부드러운 개폐감의 스테인리스 커튼링',
    description:
      '내구성이 뛰어난 스테인리스 소재로 제작되어 오랜 사용에도 변형이 적습니다. 다양한 커튼 원단과 레일에 호환됩니다.',
    specs: [
      { label: '소재', value: '스테인리스 스틸' },
      { label: '구성', value: '10개입 1세트' },
      { label: '내경', value: '4cm' },
      { label: '호환', value: '일반형 커튼레일' },
    ],
  },
  {
    id: 13,
    name: '씽(하-역방향)',
    category: 'component',
    subcategory: '씽',
    image: '/placeholder.png',
    shortDescription: '부드러운 개폐감의 스테인리스 커튼링',
    description:
      '내구성이 뛰어난 스테인리스 소재로 제작되어 오랜 사용에도 변형이 적습니다. 다양한 커튼 원단과 레일에 호환됩니다.',
    specs: [
      { label: '소재', value: '스테인리스 스틸' },
      { label: '구성', value: '10개입 1세트' },
      { label: '내경', value: '4cm' },
      { label: '호환', value: '일반형 커튼레일' },
    ],
  },
  {
    id: 5,
    name: '정밀 커튼레일 (전동식)',
    category: 'component',
    subcategory: '브라켓',
    image: '/placeholder.png',
    shortDescription: '리모컨으로 여닫는 전동식 커튼레일',
    description:
      '리모컨 및 스마트홈 연동으로 손쉽게 커튼을 여닫을 수 있는 전동식 레일입니다. 조용한 모터 구동으로 야간에도 부담 없이 사용할 수 있습니다.',
    specs: [
      { label: '소재', value: '알루미늄 합금' },
      { label: '구동', value: '전동 모터 + 리모컨' },
      { label: '최대 길이', value: '400cm (연장 가능)' },
      { label: '연동', value: '스마트홈 앱 연동 지원' },
    ],
  },
  {
    id: 6,
    name: '커튼 후크 & 웨이트 세트',
    category: 'component',
    subcategory: '핀',
    image: '/placeholder.png',
    shortDescription: '단정한 라인을 잡아주는 후크와 밑단 웨이트',
    description:
      '커튼 상단 고정용 후크와 밑단이 자연스럽게 떨어지도록 무게를 잡아주는 웨이트로 구성된 부자재 세트입니다.',
    specs: [
      { label: '소재', value: '금속 도금 처리' },
      { label: '구성', value: '후크 20개 + 웨이트 10개' },
      { label: '용도', value: '커튼 제작 및 수선' },
    ],
  },
  {
    id: 7,
    name: '산업용 재봉기 (커튼 전용)',
    category: 'machine',
    subcategory: '미싱기',
    image: '/placeholder.png',
    shortDescription: '두꺼운 커튼 원단도 매끄럽게, 산업용 재봉기',
    description:
      '암막 및 리넨 등 두꺼운 커튼 원단을 안정적으로 봉제할 수 있는 산업용 재봉기입니다. 균일한 스티치와 빠른 작업 속도로 제작 효율을 높여줍니다.',
    specs: [
      { label: '유형', value: '평봉 산업용 재봉기' },
      { label: '최대 속도', value: '분당 4,000 스티치' },
      { label: '적용 원단', value: '암막, 리넨, 시어 등 전 원단' },
      { label: '전원', value: 'AC 220V' },
    ],
  },
  {
    id: 8,
    name: '자동 원단 커팅기',
    category: 'machine',
    subcategory: '재단기',
    image: '/placeholder.png',
    shortDescription: '정확한 치수로 원단을 자르는 자동 커팅기',
    description:
      '설정한 치수에 맞춰 원단을 정밀하게 절단하는 자동 커팅기로, 대량 제작 시 균일한 품질을 유지할 수 있습니다.',
    specs: [
      { label: '유형', value: '자동 원단 커팅기' },
      { label: '최대 작업 폭', value: '320cm' },
      { label: '제어', value: '터치스크린 프로그램 제어' },
      { label: '전원', value: 'AC 220V' },
    ],
  },
  {
    id: 9,
    name: '커튼 프레스 마감기',
    category: 'machine',
    subcategory: '형상기',
    image: '/placeholder.png',
    shortDescription: '완성도 높은 마감을 위한 스팀 프레스기',
    description:
      '봉제가 끝난 커튼의 주름과 각을 깔끔하게 정리해주는 스팀 프레스기입니다. 매장 진열 전 마무리 단계에서 널리 사용됩니다.',
    specs: [
      { label: '유형', value: '스팀 프레스 마감기' },
      { label: '가열 방식', value: '전기 스팀 보일러' },
      { label: '작업판 크기', value: '150cm x 100cm' },
      { label: '전원', value: 'AC 220V' },
    ],
  },
]

export default products
