import React, { useState } from 'react';
import { useArticles } from '../context/ArticleContext';
import { useCaseStudies } from '../context/CaseStudyContext';
import { useCareers } from '../context/CareerContext';
import { Settings, Plus, Trash2, Edit2, LogOut, FileText, Briefcase, BriefcaseBusiness } from 'lucide-react';

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  
  // Contexts
  const { articles, addArticle, updateArticle, deleteArticle } = useArticles();
  const { caseStudies, addCaseStudy, updateCaseStudy, deleteCaseStudy } = useCaseStudies();
  const { careers, addCareer, updateCareer, deleteCareer } = useCareers();
  
  const [activeTab, setActiveTab] = useState('articles'); // 'articles' | 'casestudies' | 'careers'

  // Generic State for Adds and Edits
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Forms State
  const [articleForm, setArticleForm] = useState({ title: '', content: '', category: '', imageUrl: '' });
  const [caseStudyForm, setCaseStudyForm] = useState({ client: '', challenge: '', solution: '', impact: '', imageUrl: '' });
  const [careerForm, setCareerForm] = useState({ title: '', department: '', location: '', type: '', description: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === '123456789' || password === 'admin') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid password');
    }
  };

  const resetForms = () => {
    setArticleForm({ title: '', content: '', category: '', imageUrl: '' });
    setCaseStudyForm({ client: '', challenge: '', solution: '', impact: '', imageUrl: '' });
    setCareerForm({ title: '', department: '', location: '', type: '', description: '' });
  };

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setIsAdding(false);
    setEditingId(null);
    resetForms();
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'articles') {
      if (!articleForm.title) return;
      addArticle({ ...articleForm, author: 'Admin' });
    } else if (activeTab === 'casestudies') {
      if (!caseStudyForm.client) return;
      addCaseStudy(caseStudyForm);
    } else if (activeTab === 'careers') {
      if (!careerForm.title) return;
      addCareer(careerForm);
    }
    setIsAdding(false);
    resetForms();
  };

  const handleEditClick = (item) => {
    setIsAdding(false);
    setEditingId(item.id);
    if (activeTab === 'articles') {
      setArticleForm({ title: item.title, content: item.content, category: item.category, imageUrl: item.imageUrl || '' });
    } else if (activeTab === 'casestudies') {
      setCaseStudyForm({ client: item.client, challenge: item.challenge, solution: item.solution, impact: item.impact, imageUrl: item.imageUrl || '' });
    } else if (activeTab === 'careers') {
      setCareerForm({ title: item.title, department: item.department, location: item.location, type: item.type, description: item.description });
    }
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'articles') {
      updateArticle(editingId, articleForm);
    } else if (activeTab === 'casestudies') {
      updateCaseStudy(editingId, caseStudyForm);
    } else if (activeTab === 'careers') {
      updateCareer(editingId, careerForm);
    }
    setEditingId(null);
    resetForms();
  };

  const handleDelete = (id) => {
    if(!window.confirm("Are you sure?")) return;
    if (activeTab === 'articles') deleteArticle(id);
    else if (activeTab === 'casestudies') deleteCaseStudy(id);
    else if (activeTab === 'careers') deleteCareer(id);
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
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-primary transition-colors" placeholder="Enter admin password" />
            </div>
            <button type="submit" className="bg-primary text-primary-foreground font-bold py-2 rounded-lg hover:bg-primary-glow transition-colors">Login</button>
          </form>
        </div>
      </div>
    );
  }

  // Generic renderers for tables based on active tab
  const getTableHeaders = () => {
    if (activeTab === 'articles') return ['Title', 'Category', 'Date', 'Actions'];
    if (activeTab === 'casestudies') return ['Client', 'Challenge Snippet', 'Date', 'Actions'];
    if (activeTab === 'careers') return ['Job Title', 'Department', 'Type', 'Actions'];
  };

  const renderTableRows = () => {
    let list = activeTab === 'articles' ? articles : activeTab === 'casestudies' ? caseStudies : careers;
    
    if (list.length === 0) {
      return <tr><td colSpan="4" className="p-8 text-center text-muted-foreground">No records found.</td></tr>;
    }

    return list.map(item => (
      <tr key={item.id} className="border-b border-border/50 hover:bg-surface-hover/50 transition-colors">
        <td className="p-4 font-medium">{activeTab === 'casestudies' ? item.client : item.title}</td>
        <td className="p-4 text-sm text-muted-foreground truncate max-w-[200px]">
          {activeTab === 'articles' ? item.category : activeTab === 'casestudies' ? item.challenge : item.department}
        </td>
        <td className="p-4 text-sm text-muted-foreground">
          {activeTab === 'careers' ? item.type : item.date}
        </td>
        <td className="p-4 flex justify-end gap-2">
          <button onClick={() => handleEditClick(item)} className="p-2 text-muted-foreground hover:text-primary transition-colors bg-background rounded-md border border-border"><Edit2 size={16} /></button>
          <button onClick={() => handleDelete(item.id)} className="p-2 text-muted-foreground hover:text-destructive transition-colors bg-background rounded-md border border-border"><Trash2 size={16} /></button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Control Dashboard</h1>
            <p className="text-muted-foreground">Manage your dynamic content across the portal.</p>
          </div>
          <div className="flex gap-4 items-center">
            <button onClick={() => { setIsAdding(!isAdding); setEditingId(null); resetForms(); }} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:bg-primary-glow transition-colors">
              <Plus size={20} />
              {isAdding ? 'Cancel' : 'Add New'}
            </button>
            <button onClick={() => setIsAuthenticated(false)} className="flex items-center gap-2 bg-surface-hover border border-border px-4 py-2 rounded-lg hover:bg-surface-elevated transition-colors">
              <LogOut size={20} />
            </button>
          </div>
        </div>

        {/* Custom Tabs */}
        <div className="flex gap-2 mb-8 p-1 glass-panel rounded-xl max-w-fit border-border">
          <button onClick={() => handleTabSwitch('articles')} className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all ${activeTab === 'articles' ? 'bg-primary text-white shadow-glow' : 'hover:bg-background/50 text-muted-foreground'}`}><FileText size={18} /> Articles</button>
          <button onClick={() => handleTabSwitch('casestudies')} className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all ${activeTab === 'casestudies' ? 'bg-primary text-white shadow-glow' : 'hover:bg-background/50 text-muted-foreground'}`}><BriefcaseBusiness size={18} /> Case Studies</button>
          <button onClick={() => handleTabSwitch('careers')} className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all ${activeTab === 'careers' ? 'bg-primary text-white shadow-glow' : 'hover:bg-background/50 text-muted-foreground'}`}><Briefcase size={18} /> Careers</button>
        </div>

        {/* Dynamic Add / Edit Form */}
        {(isAdding || editingId !== null) && (
          <div className={`glass-panel p-6 rounded-industrial border mb-8 animate-fade-in ${editingId ? 'border-primary/50 shadow-glow' : 'border-border'}`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">{editingId ? `Edit ${activeTab}` : `New ${activeTab}`}</h2>
              {(isAdding || editingId) && <button type="button" onClick={() => { setIsAdding(false); setEditingId(null); }} className="text-muted-foreground hover:text-foreground text-sm font-semibold">Cancel</button>}
            </div>
            
            <form onSubmit={editingId ? handleUpdateSubmit : handleAddSubmit} className="grid gap-4 md:grid-cols-2">
              
              {/* === ARTICLES FORM === */}
              {activeTab === 'articles' && (
                <>
                  <div className="md:col-span-2"><label className="block text-sm mb-1 text-muted-foreground">Title</label><input required type="text" value={articleForm.title} onChange={e => setArticleForm({...articleForm, title: e.target.value})} className="w-full bg-background border border-border rounded-md px-3 py-2" /></div>
                  <div><label className="block text-sm mb-1 text-muted-foreground">Category</label><input required type="text" value={articleForm.category} onChange={e => setArticleForm({...articleForm, category: e.target.value})} className="w-full bg-background border border-border rounded-md px-3 py-2" /></div>
                  <div><label className="block text-sm mb-1 text-muted-foreground">Image URL (Optional)</label><input type="text" value={articleForm.imageUrl} onChange={e => setArticleForm({...articleForm, imageUrl: e.target.value})} className="w-full bg-background border border-border rounded-md px-3 py-2" /></div>
                  <div className="md:col-span-2"><label className="block text-sm mb-1 text-muted-foreground">Content</label><textarea required rows="5" value={articleForm.content} onChange={e => setArticleForm({...articleForm, content: e.target.value})} className="w-full bg-background border border-border rounded-md px-3 py-2"></textarea></div>
                </>
              )}

              {/* === CASE STUDIES FORM === */}
              {activeTab === 'casestudies' && (
                <>
                  <div className="md:col-span-2"><label className="block text-sm mb-1 text-muted-foreground">Client Name</label><input required type="text" value={caseStudyForm.client} onChange={e => setCaseStudyForm({...caseStudyForm, client: e.target.value})} className="w-full bg-background border border-border rounded-md px-3 py-2" /></div>
                  <div className="md:col-span-2"><label className="block text-sm mb-1 text-muted-foreground">Challenge</label><textarea required rows="2" value={caseStudyForm.challenge} onChange={e => setCaseStudyForm({...caseStudyForm, challenge: e.target.value})} className="w-full bg-background border border-border rounded-md px-3 py-2"></textarea></div>
                  <div className="md:col-span-2"><label className="block text-sm mb-1 text-muted-foreground">Solution</label><textarea required rows="3" value={caseStudyForm.solution} onChange={e => setCaseStudyForm({...caseStudyForm, solution: e.target.value})} className="w-full bg-background border border-border rounded-md px-3 py-2"></textarea></div>
                  <div className="md:col-span-2"><label className="block text-sm mb-1 text-muted-foreground">Impact (Results)</label><input required type="text" value={caseStudyForm.impact} onChange={e => setCaseStudyForm({...caseStudyForm, impact: e.target.value})} className="w-full bg-background border border-border rounded-md px-3 py-2" /></div>
                  <div className="md:col-span-2"><label className="block text-sm mb-1 text-muted-foreground">Image URL (Optional)</label><input type="text" value={caseStudyForm.imageUrl} onChange={e => setCaseStudyForm({...caseStudyForm, imageUrl: e.target.value})} className="w-full bg-background border border-border rounded-md px-3 py-2" /></div>
                </>
              )}

              {/* === CAREERS FORM === */}
              {activeTab === 'careers' && (
                <>
                  <div className="md:col-span-2"><label className="block text-sm mb-1 text-muted-foreground">Job Title</label><input required type="text" value={careerForm.title} onChange={e => setCareerForm({...careerForm, title: e.target.value})} className="w-full bg-background border border-border rounded-md px-3 py-2" /></div>
                  <div><label className="block text-sm mb-1 text-muted-foreground">Department</label><input required type="text" value={careerForm.department} onChange={e => setCareerForm({...careerForm, department: e.target.value})} className="w-full bg-background border border-border rounded-md px-3 py-2" /></div>
                  <div><label className="block text-sm mb-1 text-muted-foreground">Location</label><input required type="text" value={careerForm.location} onChange={e => setCareerForm({...careerForm, location: e.target.value})} className="w-full bg-background border border-border rounded-md px-3 py-2" /></div>
                  <div className="md:col-span-2"><label className="block text-sm mb-1 text-muted-foreground">Type (e.g. Full-time, Contract)</label><input required type="text" value={careerForm.type} onChange={e => setCareerForm({...careerForm, type: e.target.value})} className="w-full bg-background border border-border rounded-md px-3 py-2" /></div>
                  <div className="md:col-span-2"><label className="block text-sm mb-1 text-muted-foreground">Job Description</label><textarea required rows="4" value={careerForm.description} onChange={e => setCareerForm({...careerForm, description: e.target.value})} className="w-full bg-background border border-border rounded-md px-3 py-2"></textarea></div>
                </>
              )}

              <div className="md:col-span-2 flex justify-end mt-4">
                <button type="submit" className="bg-primary hover:bg-primary-glow text-primary-foreground px-8 py-2 rounded-lg font-bold transition-colors">
                  {editingId ? 'Update Record' : 'Save Record'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="glass-panel rounded-industrial border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-elevated border-b border-border">
                  {getTableHeaders().map((head, i) => (
                    <th key={i} className={`p-4 font-semibold text-muted-foreground ${i === getTableHeaders().length - 1 ? 'text-right' : ''}`}>{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {renderTableRows()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
