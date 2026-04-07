import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useArticles } from '../context/ArticleContext';
import { ArrowLeft, BookOpen, Calendar, User } from 'lucide-react';

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { articles } = useArticles();

  const article = articles.find(a => a.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!article) {
    return (
      <div className="pt-32 pb-20 px-6 min-h-screen flex flex-col items-center justify-center">
        <BookOpen size={64} className="text-muted-foreground mb-6 opacity-50" />
        <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
        <p className="text-muted-foreground mb-8">The article you are looking for does not exist or has been removed.</p>
        <button onClick={() => navigate('/articles')} className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-bold">
          Back to Articles
        </button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen">
      <div className="container mx-auto max-w-4xl">
        <Link to="/articles" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12">
          <ArrowLeft size={20} />
          <span className="font-semibold">Back to Articles</span>
        </Link>
        
        <article>
          <div className="mb-10 text-center animate-slide-up">
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-bold mb-6">
              {article.category}
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-black tracking-tight mb-8">
              {article.title}
            </h1>
            <div className="flex items-center justify-center gap-6 text-muted-foreground font-medium">
              <span className="flex items-center gap-2">
                <Calendar size={18} />
                {article.date}
              </span>
              <span className="flex items-center gap-2">
                <User size={18} />
                {article.author}
              </span>
            </div>
          </div>

          {article.imageUrl && (
            <div className="w-full h-[40vh] md:h-[60vh] rounded-industrial overflow-hidden mb-12 animate-scale-in">
              <img 
                src={article.imageUrl} 
                alt={article.title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="glass-panel p-8 md:p-12 rounded-industrial border border-border/50 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <div className="prose prose-invert max-w-none text-lg text-foreground/80 leading-relaxed font-sans">
              {article.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-6">{paragraph}</p>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default ArticleDetail;
