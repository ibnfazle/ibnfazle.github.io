import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkFootnotes from "remark-footnotes";
import Navigation from "@/components/Navigation";
import { getPostBySlug } from "@/data/posts";
import { format } from "date-fns";

// Calculate estimated read time based on word count
const calculateReadTime = (content: string): number => {
  const wordsPerMinute = 200;
  // Remove markdown syntax and count words
  const text = content.replace(/[#*`\[\]()]/g, '').replace(/\s+/g, ' ').trim();
  const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : null;

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Maktabah Thaqib`;
    }
    return () => {
      document.title = "Maktabah Thaqib";
    };
  }, [post]);

  if (!post) {
    return <Navigate to="/articles" replace />;
  }

  const readTime = calculateReadTime(post.content);
  const formattedDate = format(new Date(post.date), "MMMM d, yyyy");

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 max-w-5xl mx-auto px-6 py-xl w-full">
        <Link 
          to="/articles" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-lg"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to articles
        </Link>

        <article>
          <div className="mb-lg">
            <h1 className="text-5xl font-medium mb-xs text-foreground/95 tracking-[0.02em] leading-tight">
              {post.title}
            </h1>
            {post.category && (
              <div className="mt-xs mb-md">
                <span className="text-xs text-muted-foreground/70 font-medium tracking-wide uppercase">
                  {post.category}
                </span>
              </div>
            )}
            
            {/* Article metadata */}
            <div className="flex flex-wrap items-center gap-4 mt-md text-sm text-muted-foreground">
              {post.date && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.date}>{formattedDate}</time>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{readTime} min</span>
              </div>
              {post.author && (
                <div className="flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
              )}
            </div>
          </div>

          {/* Bismillah */}
          <div className="mb-xxs">
            <img 
              src="/bismillah.svg" 
              alt="Bismillah" 
              className="h-20 max-w-full w-auto"
            />
          </div>

          <div className="markdown-content">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm, remarkFootnotes]}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>
      </main>
    </div>
  );
};

export default BlogPost;
