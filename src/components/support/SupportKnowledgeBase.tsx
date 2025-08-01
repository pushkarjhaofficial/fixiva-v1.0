import React, { useState } from "react"
import clsx from "clsx"
import { FaSearch, FaBookOpen } from "react-icons/fa"
import { useTheme } from "@/hooks/useTheme"

export interface SupportKnowledgeArticle {
  id: string
  title: string
  content: string
}

export interface SupportKnowledgeBaseProps {
  articles: SupportKnowledgeArticle[]
  onSelectArticle: (article: SupportKnowledgeArticle) => void
  className?: string
}

const SupportKnowledgeBase: React.FC<SupportKnowledgeBaseProps> = ({
  articles, onSelectArticle, className
}) => {
  const { theme } = useTheme()
  const [searchQuery, setSearchQuery] = useState("")
  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white"
  const text = theme === "dark" ? "text-white" : "text-gray-900"

  return (
    <div className={clsx("rounded-lg shadow border p-6 space-y-4", cardBg, className)}>
      <h2 className={clsx("text-lg font-semibold flex items-center gap-2", text)}>
        <FaBookOpen /> Knowledge Base
      </h2>
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Search for articles..."
          className="px-3 py-2 rounded-lg w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <FaSearch className="text-lg text-gray-400" />
      </div>
      <div>
        {filteredArticles.length === 0 ? (
          <p className="text-center text-gray-400">No articles found.</p>
        ) : (
          filteredArticles.map((article) => (
            <div key={article.id} className="p-3 bg-[--color-bg-secondary] rounded mb-2 cursor-pointer"
              onClick={() => onSelectArticle(article)}>
              <h3 className="font-semibold">{article.title}</h3>
              <p className="text-sm text-gray-600">{article.content.slice(0, 100)}...</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
export default SupportKnowledgeBase
