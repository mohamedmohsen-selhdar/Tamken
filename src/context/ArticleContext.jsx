import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const ArticleContext = createContext();

export function ArticleProvider({ children }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) {
      console.error('Error fetching articles:', error);
    } else {
      setArticles(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const addArticle = async (article) => {
    const { data, error } = await supabase
      .from('articles')
      .insert([{ 
        title: article.title,
        content: article.content,
        category: article.category,
        author: article.author || 'Admin',
        imageUrl: article.imageUrl,
        seoTitle: article.seoTitle,
        seoDescription: article.seoDescription,
        seoKeywords: article.seoKeywords,
        date: new Date().toISOString()
      }])
      .select()
      .single();
      
    if (error) {
      console.error('Error adding article:', error);
      alert('Failed to add article to Database. Ensure you have run the SQL script.');
    } else if (data) {
      setArticles([data, ...articles]);
    }
  };

  const updateArticle = async (id, updatedFields) => {
    const { data, error } = await supabase
      .from('articles')
      .update(updatedFields)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating article:', error);
    } else if (data) {
      setArticles(articles.map(a => a.id === id ? data : a));
    }
  };

  const deleteArticle = async (id) => {
    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting article:', error);
    } else {
      setArticles(articles.filter(a => a.id !== id));
    }
  };

  return (
    <ArticleContext.Provider value={{ articles, loading, addArticle, updateArticle, deleteArticle }}>
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
