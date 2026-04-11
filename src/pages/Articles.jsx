import React from 'react';
import { useArticles } from '../context/ArticleContext';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { t, tx } from '../lib/translations';

const Articles = () => {
  const { articles } = useArticles();
  const { lang, isAr } = useLanguage();

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen">
      <div className="container mx-auto max-w-7xl">
        <div className={`mb-16 ${isAr ? 'text-right' : 'text-left'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 mb-6 font-arabic">
            <BookOpen size={16} />
            <span className="text-sm font-semibold tracking-wide uppercase">{tx(t.articlesPage.badge, lang)}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
            {isAr ? (
              <>أحدث <span className="text-gradient">المَقالات</span></>
            ) : (
              <>Latest <span className="text-gradient">Articles</span></>
            )}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            {tx(t.articlesPage.subheading, lang)}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link to={`/articles/${article.id}`} key={article.id} className="group glass-panel rounded-industrial overflow-hidden flex flex-col transition-all hover:scale-[1.02] hover:shadow-glow cursor-pointer block">
              <div className="relative h-48 overflow-hidden bg-muted">
                {article.imageUrl ? (
                  <img 
                    src={article.imageUrl?.match(/(?:id=|d\/)([a-zA-Z0-9_-]{25,})/) ? `https://drive.google.com/uc?id=${article.imageUrl.match(/(?:id=|d\/)([a-zA-Z0-9_-]{25,})/)[1]}` : article.imageUrl} 
                    alt={isAr && article.title_ar ? article.title_ar : article.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <BookOpen size={40} className="opacity-20" />
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-background/80 backdrop-blur-md rounded-full text-xs font-semibold">
                    {isAr && article.category_ar ? article.category_ar : article.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <span className="ltr-force">{article.date}</span>
                  <span>•</span>
                  <span>{article.author}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {isAr && article.title_ar ? article.title_ar : article.title}
                </h3>
                <p className="text-muted-foreground line-clamp-3 mb-6 flex-1 leading-relaxed">
                  {(isAr && article.content_ar ? article.content_ar : article.content)?.replace(/<[^>]*>?/gm, ' ')}
                </p>
                
                <span className="flex items-center gap-2 text-sm font-bold text-primary w-fit group/btn">
                  {tx(t.articlesPage.readMore, lang)}
                  <ArrowRight size={16} className={`transition-transform ${isAr ? 'rotate-180 group-hover/btn:-translate-x-1' : 'group-hover/btn:translate-x-1'}`} />
                </span>
              </div>
            </Link>
          ))}
        </div>
        
        {articles.length === 0 && (
          <div className="text-center py-20 text-muted-foreground glass-panel rounded-industrial">
            <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-bold mb-2">{tx(t.articlesPage.noResults, lang)}</h3>
            <p>{tx(t.articlesPage.checkBack, lang)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Articles;

