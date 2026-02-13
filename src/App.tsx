import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Component to handle GitHub Pages redirect
const RedirectHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we're on GitHub Pages and have a query string redirect
    // The 404.html redirects to /?/path, so we need to parse ?/path
    const search = location.search;
    if (search && search.startsWith('?/')) {
      // Extract the path from ?/path format
      const path = search
        .slice(2) // Remove '?/'
        .split('&')[0] // Take only the path part (before any & parameters)
        .replace(/~and~/g, '&');
      
      // Navigate to the correct path without the query string
      navigate('/' + path + location.hash, { replace: true });
    }
  }, [location, navigate]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RedirectHandler />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Blog />} />
          <Route path="/articles/:slug" element={<BlogPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
