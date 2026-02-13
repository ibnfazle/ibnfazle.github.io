import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import Navigation from "@/components/Navigation";
import { getLatestPosts } from "@/data/posts";

// Calculate estimated read time based on word count
const calculateReadTime = (content: string): number => {
  const wordsPerMinute = 200;
  // Remove markdown syntax and count words
  const text = content.replace(/[#*`\[\]()]/g, '').replace(/\s+/g, ' ').trim();
  const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
};

const Home = () => {
  const latestPosts = getLatestPosts(3);

  useEffect(() => {
    document.title = "Maktabah Thaqib";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Banner */}
      <div className="w-full aspect-[4/1] overflow-hidden max-h-[200px] xl:max-h-[230px] 2xl:max-h-[260px] relative">
        <img 
          src="/banner.svg" 
          alt="" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src="/thaqib.svg" 
            alt="Thaqib" 
            className="h-[80%] max-h-[240px] xl:max-h-[280px] 2xl:max-h-[320px] w-auto object-contain"
          />
        </div>
      </div>
      
      <main className="flex-1 max-w-5xl mx-auto px-6 py-xl w-full">
        {/* Latest Articles */}
        <section className="mb-2xl">
          <div className="flex items-center justify-between mb-lg">
            <h2 className="text-3xl font-medium text-foreground/95 tracking-[0.015em] leading-tight">Latest Articles</h2>
            <Link 
              to="/articles" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              View all →
            </Link>
          </div>
          
          <div className="space-y-lg">
            {latestPosts.map((post) => (
              <Link 
                key={post.slug}
                to={`/articles/${post.slug}`}
                className="block group"
              >
                <div className="border-l-2 border-border pl-md hover:border-accent transition-colors">
                  <h3 className="text-xl font-medium text-foreground group-hover:text-accent transition-colors mb-0.5">
                    {post.title}
                  </h3>
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
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section className="mb-2xl">
          <div className="mb-lg">
            <h2 className="text-3xl font-medium text-foreground/95 tracking-[0.015em] leading-tight">About</h2>
          </div>
          <div className="max-w-3xl">
          <p className="text-base text-muted-foreground leading-relaxed mb-lg">
            Assalamualaikum, I’m Thaqib ibn Fazle, and this is a digital library of clear, referenced articles written to explain Islam upon the understanding of the Salaf. 
            <br /><br />
            I started this project to digitize my personal notes, from the various duroos I have attended and the books I have studied with mashayikh. I refine those notes into articles so they can be preserved in a structured and accessible format.
            <br /><br />
            Anything truthful I convey is from Allah and His Messenger ﷺ, and any falsehood is from myself, my shortcomings, and Shaytan, and Allah and His Messenger ﷺ are free from it. 
          </p>
            <div className="pl-6 border-l border-border">
              <p className="text-sm text-muted-foreground mb-1">
                The Messenger of Allah ﷺ said:
              </p>
              <p className="text-base text-muted-foreground italic leading-relaxed mb-1">
                Convey from me, even a single verse.
              </p>
              <p className="text-xs text-muted-foreground/80 mt-1">
                (Sahih al-Bukharī 3461)
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
