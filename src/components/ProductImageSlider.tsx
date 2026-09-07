import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function ProductImageSlider({
  images,
  alt,
}: {
  images: Array<string>
  alt: string
}) {
  const [index, setIndex] = useState(0)

  const goPrev = () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1))
  const goNext = () => setIndex((i) => (i === images.length - 1 ? 0 : i + 1))

  return (
    <div>
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[var(--color-linen)]">
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`${alt} ${i + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
              i === index ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        {images.length > 1 && (
          <>
            <button
              onClick={goPrev}
              aria-label="이전 이미지"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 hover:bg-white flex items-center justify-center shadow-md transition-colors"
            >
              <ChevronLeft size={20} className="text-[var(--color-ink)]" />
            </button>
            <button
              onClick={goNext}
              aria-label="다음 이미지"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 hover:bg-white flex items-center justify-center shadow-md transition-colors"
            >
              <ChevronRight size={20} className="text-[var(--color-ink)]" />
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setIndex(i)}
                  aria-label={`${i + 1}번째 이미지로 이동`}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? 'w-6 bg-white' : 'w-2 bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setIndex(i)}
              className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                i === index
                  ? 'border-[var(--color-clay)]'
                  : 'border-transparent'
              }`}
            >
              <img
                src={src}
                alt={`${alt} 썸네일 ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
