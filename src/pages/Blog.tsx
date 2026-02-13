import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { Search, Filter, Clock } from "lucide-react";
import Navigation from "@/components/Navigation";
import { posts } from "@/data/posts";

// Calculate estimated read time based on word count
const calculateReadTime = (content: string): number => {
  const wordsPerMinute = 200;
  // Remove markdown syntax and count words
  const text = content.replace(/[#*`\[\]()]/g, '').replace(/\s+/g, ' ').trim();
  const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
};

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFilter, setShowFilter] = useState(false);

  // Get all unique categories from posts
  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    posts.forEach((post) => {
      if (post.category) {
        categories.add(post.category);
      }
    });
    return Array.from(categories).sort();
  }, []);

  // Filter and search posts
  const filteredPosts = useMemo(() => {
    return posts
      .filter((post) => {
        // Search filter
        const matchesSearch =
          searchQuery === "" ||
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.summary.toLowerCase().includes(searchQuery.toLowerCase());

        // Category filter
        const matchesCategory =
          selectedCategory === null ||
          post.category === selectedCategory;

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [searchQuery, selectedCategory]);

  const toggleCategory = (category: string) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
  };

  useEffect(() => {
    document.title = "Articles | Maktabah Thaqib";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 max-w-5xl mx-auto px-6 py-xl w-full">
        <h1 className="text-5xl font-medium mb-md text-foreground/95 tracking-[0.02em] leading-tight">Articles</h1>

        {/* Search and Filter Bar */}
        <div className="mb-2xl">
          <div className="flex items-center gap-2 mb-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>
            <Filter 
              onClick={() => setShowFilter(!showFilter)}
              className={`h-4 w-4 cursor-pointer transition-colors ${
                selectedCategory !== null ? "text-foreground" : "text-foreground/70"
              } hover:text-foreground`}
              aria-label="Filter by category"
            />
          </div>
          
          {/* Category Filter */}
          {showFilter && allCategories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {allCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`px-3 py-1.5 text-xs font-medium tracking-wide uppercase transition-colors ${
                    selectedCategory === category
                      ? "text-foreground"
                      : "text-muted-foreground/70 hover:text-foreground"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-xl">
          {filteredPosts.length === 0 ? (
            <p className="text-muted-foreground">No articles found.</p>
          ) : (
            filteredPosts.map((post) => (
              <Link 
                key={post.slug}
                to={`/articles/${post.slug}`}
                className="block group"
              >
                <article className="border-l-2 border-border pl-md hover:border-accent transition-colors">
                  <h2 className="text-2xl font-medium text-foreground/95 tracking-[0.01em] leading-snug group-hover:text-accent transition-colors mb-0.5">
                    {post.title}
                  </h2>
                  {(post.category || post.content) && (
                    <div className="mb-1">
                      <span className="text-xs text-muted-foreground/70 font-medium tracking-wide uppercase flex items-center gap-1.5">
                        {post.category && <>{post.category}</>}
                        {post.content && (
                          <>
                            {post.category && <span>·</span>}
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {calculateReadTime(post.content)} min
                            </span>
                          </>
                        )}
                      </span>
                    </div>
                  )}
                  <p className="text-muted-foreground leading-relaxed text-base">
                    {post.summary}
                  </p>
                </article>
              </Link>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Blog;
