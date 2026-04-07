import React, { createContext, useContext, useState, useEffect } from 'react';

const ArticleContext = createContext();

const DUMMY_ARTICLES = [
  {
    id: '1',
    title: 'The Future of AI in SaaS',
    content: 'Artificial Intelligence is revolutionizing how we interact with Software as a Service. From automated customer support to predictive analytics, the landscape is changing rapidly. This article explores the key trends and how Tamken is adapting to these changes.',
    category: 'Technology',
    author: 'Admin',
    date: '2026-04-01',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '2',
    title: 'Building High-Fidelity User Interfaces',
    content: 'A high-fidelity UI is more than just good looks; it is about providing a seamless and intuitive user experience. We dive into the design principles that guide our development process at Tamken.',
    category: 'Design',
    author: 'Admin',
    date: '2026-04-05',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1000'
  }
];

export function ArticleProvider({ children }) {
  const [articles, setArticles] = useState(() => {
    const saved = localStorage.getItem('tamken-articles');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DUMMY_ARTICLES;
      }
    }
    return DUMMY_ARTICLES;
  });

  useEffect(() => {
    localStorage.setItem('tamken-articles', JSON.stringify(articles));
  }, [articles]);

  const addArticle = (article) => {
    const newArticle = { ...article, id: Date.now().toString(), date: new Date().toISOString().split('T')[0] };
    setArticles([newArticle, ...articles]);
  };

  const updateArticle = (id, updatedFields) => {
    setArticles(articles.map(a => a.id === id ? { ...a, ...updatedFields } : a));
  };

  const deleteArticle = (id) => {
    setArticles(articles.filter(a => a.id !== id));
  };

  return (
    <ArticleContext.Provider value={{ articles, addArticle, updateArticle, deleteArticle }}>
      {children}
    </ArticleContext.Provider>
  );
}

export const useArticles = () => {
  const context = useContext(ArticleContext);
  if (context === undefined) {
    throw new Error('useArticles must be used within an ArticleProvider');
  }
  return context;
};
