// src/components/shared/RatingStars.tsx

import React from "react"

interface Props {
  rating: number // 0-5
  max?: number
}

const RatingStars: React.FC<Props> = ({ rating, max = 5 }) => {
  return (
    <div className="flex gap-0.5">
      {[...Array(max)].map((_, i) => (
        <span key={i} className={i < rating ? "text-yellow-400" : "text-neutral-300"}>
          ★
        </span>
      ))}
    </div>
  )
}

export default RatingStars
