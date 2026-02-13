import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="w-full border-b border-border bg-background">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center hover:opacity-70 transition-opacity">
          <img src="/logo.svg" alt="Logo" className="h-8 w-auto" />
        </Link>
        
        <div className="flex items-center gap-8">
          <Link 
            to="/articles" 
            className="text-lg font-medium text-foreground hover:text-accent transition-colors"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Articles
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
