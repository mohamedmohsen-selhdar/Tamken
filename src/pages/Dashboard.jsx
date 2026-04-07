import React, { useState } from 'react';
import { useArticles } from '../context/ArticleContext';
import { Settings, Plus, Trash2, Edit2, LogOut } from 'lucide-react';

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const { articles, addArticle, updateArticle, deleteArticle } = useArticles();
  
  const [isAdding, setIsAdding] = useState(false);
  const [newArticle, setNewArticle] = useState({
    title: '', content: '', category: '', author: 'Admin', imageUrl: ''
  });

  const [editingId, setEditingId] = useState(null);
  const [editArticle, setEditArticle] = useState({
    title: '', content: '', category: '', imageUrl: ''
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === '123456789' || password === 'admin') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid password');
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newArticle.title || !newArticle.content) return;
    addArticle(newArticle);
    setIsAdding(false);
    setNewArticle({ title: '', content: '', category: '', author: 'Admin', imageUrl: '' });
  };

  const handleEditClick = (article) => {
    setIsAdding(false);
    setEditingId(article.id);
    setEditArticle({
      title: article.title,
      content: article.content,
      category: article.category,
      imageUrl: article.imageUrl || ''
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!editArticle.title || !editArticle.content) return;
    updateArticle(editingId, editArticle);
    setEditingId(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="pt-32 pb-20 px-6 min-h-screen flex items-center justify-center">
        <div className="glass-panel p-8 rounded-industrial max-w-md w-full">
          <div className="flex items-center gap-3 mb-6 justify-center text-primary">
            <Settings size={32} />
            <h1 className="text-2xl font-bold">Admin Login</h1>
          </div>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-primary transition-colors"
                placeholder="Enter admin password"
              />
            </div>
            <button type="submit" className="bg-primary text-primary-foreground font-bold py-2 rounded-lg hover:bg-primary-glow transition-colors">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen">
      <div className="container mx-auto max-w-5xl">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Control Dashboard</h1>
            <p className="text-muted-foreground">Manage your articles and content.</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => { setIsAdding(!isAdding); setEditingId(null); }}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:bg-primary-glow transition-colors"
            >
              <Plus size={20} />
              {isAdding ? 'Cancel' : 'New Article'}
            </button>
            <button 
              onClick={() => setIsAuthenticated(false)}
              className="flex items-center gap-2 bg-surface-hover border border-border px-4 py-2 rounded-lg hover:bg-surface-elevated transition-colors"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>

        {isAdding && (
          <div className="glass-panel p-6 rounded-industrial border border-border mb-8 animate-fade-in">
            <h2 className="text-xl font-bold mb-4">Add New Article</h2>
            <form onSubmit={handleAdd} className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="block text-sm mb-1 text-muted-foreground">Title</label>
                <input required type="text" value={newArticle.title} onChange={e => setNewArticle({...newArticle, title: e.target.value})} className="w-full bg-background border border-border rounded-md px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm mb-1 text-muted-foreground">Category</label>
                <input required type="text" value={newArticle.category} onChange={e => setNewArticle({...newArticle, category: e.target.value})} className="w-full bg-background border border-border rounded-md px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm mb-1 text-muted-foreground">Image URL (Optional)</label>
                <input type="text" value={newArticle.imageUrl} onChange={e => setNewArticle({...newArticle, imageUrl: e.target.value})} className="w-full bg-background border border-border rounded-md px-3 py-2" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm mb-1 text-muted-foreground">Content</label>
                <textarea required rows="5" value={newArticle.content} onChange={e => setNewArticle({...newArticle, content: e.target.value})} className="w-full bg-background border border-border rounded-md px-3 py-2"></textarea>
              </div>
              <div className="md:col-span-2 flex justify-end">
                <button type="submit" className="bg-success text-success-foreground px-6 py-2 rounded-lg font-bold">Save Article</button>
              </div>
            </form>
          </div>
        )}

        {editingId !== null && (
          <div className="glass-panel p-6 rounded-industrial border border-primary/50 mb-8 animate-fade-in relative shadow-[0_0_15px_rgba(220,38,38,0.1)]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-primary">Edit Article</h2>
              <button type="button" onClick={() => setEditingId(null)} className="text-muted-foreground hover:text-foreground text-sm font-semibold">Cancel</button>
            </div>
            <form onSubmit={handleUpdate} className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="block text-sm mb-1 text-muted-foreground">Title</label>
                <input required type="text" value={editArticle.title} onChange={e => setEditArticle({...editArticle, title: e.target.value})} className="w-full bg-background border border-border rounded-md px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm mb-1 text-muted-foreground">Category</label>
                <input required type="text" value={editArticle.category} onChange={e => setEditArticle({...editArticle, category: e.target.value})} className="w-full bg-background border border-border rounded-md px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm mb-1 text-muted-foreground">Image URL (Optional)</label>
                <input type="text" value={editArticle.imageUrl} onChange={e => setEditArticle({...editArticle, imageUrl: e.target.value})} className="w-full bg-background border border-border rounded-md px-3 py-2" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm mb-1 text-muted-foreground">Content</label>
                <textarea required rows="5" value={editArticle.content} onChange={e => setEditArticle({...editArticle, content: e.target.value})} className="w-full bg-background border border-border rounded-md px-3 py-2"></textarea>
              </div>
              <div className="md:col-span-2 flex justify-end">
                <button type="submit" className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-bold">Update Article</button>
              </div>
            </form>
          </div>
        )}

        <div className="glass-panel rounded-industrial border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-elevated border-b border-border">
                  <th className="p-4 font-semibold text-muted-foreground">Title</th>
                  <th className="p-4 font-semibold text-muted-foreground">Category</th>
                  <th className="p-4 font-semibold text-muted-foreground">Date</th>
                  <th className="p-4 font-semibold text-muted-foreground text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map(article => (
                  <tr key={article.id} className="border-b border-border/50 hover:bg-surface-hover/50 transition-colors">
                    <td className="p-4 font-medium">{article.title}</td>
                    <td className="p-4 text-sm text-muted-foreground">{article.category}</td>
                    <td className="p-4 text-sm text-muted-foreground">{article.date}</td>
                    <td className="p-4 flex justify-end gap-2">
                      <button onClick={() => handleEditClick(article)} className="p-2 text-muted-foreground hover:text-primary transition-colors bg-background rounded-md border border-border">
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => deleteArticle(article.id)}
                        className="p-2 text-muted-foreground hover:text-destructive transition-colors bg-background rounded-md border border-border"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                {articles.length === 0 && (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-muted-foreground">No articles found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
