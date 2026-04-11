import React, { useEffect, useRef, useState } from 'react';
import {
  Smartphone, CheckCircle, Clock, Eye, Sliders, Database, Menu, Bell,
  Home as HomeIcon, Settings, BarChart2, Activity, AlertTriangle,
  Plus, ClipboardList, ChevronRight, TrendingUp, TrendingDown,
  Package, Wrench, User, Zap, Filter, RefreshCw, Check, X, ArrowUp, ArrowDown
} from 'lucide-react';
import { ContainerScroll } from '../components/ui/container-scroll-animation';

// ─── Mini Bar Chart ───────────────────────────────────────────────
const MiniBarChart = ({ data, color = '#dc2626', height = 60 }) => {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-[3px]" style={{ height }}>
      {data.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-sm transition-all duration-500"
          style={{ height: `${(v / max) * 100}%`, background: color, opacity: 0.7 + (i / data.length) * 0.3 }}
        />
      ))}
    </div>
  );
};

// ─── Mini Line Chart (SVG) ────────────────────────────────────────
const MiniLineChart = ({ data, color = '#dc2626', w = 120, h = 40 }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * (h - 4) - 2;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <defs>
        <linearGradient id={`lg-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.3} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <polyline fill="none" stroke={color} strokeWidth="1.5" points={pts} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

// ─── Donut Chart ─────────────────────────────────────────────────
const DonutChart = ({ value, size = 64, stroke = 8, color = '#dc2626', bg = '#ffffff11' }) => {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (value / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={bg} strokeWidth={stroke} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke={color} strokeWidth={stroke}
        strokeDasharray={`${dash} ${circ - dash}`}
        strokeLinecap="round"
        style={{ transition: 'stroke-dasharray 0.6s ease' }}
      />
    </svg>
  );
};

// ─── Interactive Mobile App ───────────────────────────────────────
const InteractiveMobileApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [loading, setLoading] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [newTask, setNewTask] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Calibrate Line B sensors', done: true, priority: 'high' },
    { id: 2, text: 'Review scrap log for Shift 2', done: false, priority: 'medium' },
    { id: 3, text: 'Approve purchasing PO #8812', done: false, priority: 'high' },
    { id: 4, text: 'Update maintenance schedule', done: false, priority: 'low' },
  ]);
  const [taskInput, setTaskInput] = useState('');
  const [stats, setStats] = useState({
    oee: 87.2, avail: 94.1, perf: 91.3, qual: 98.6,
    output: 1240, scrap: 2.1,
    lineA: 92, lineB: 78, lineC: 85, lineD: 61,
    weekData: [62, 78, 54, 88, 71, 83, 87],
    shiftData: [45, 72, 68, 91, 76],
  });

  const go = (tab) => {
    if (tab === activeTab) return;
    setLoading(true);
    setActiveTab(tab);
    setTimeout(() => setLoading(false), 280);
  };

  const refresh = () => {
    setLoading(true);
    setTimeout(() => {
      setStats(s => ({
        ...s,
        oee: +(80 + Math.random() * 15).toFixed(1),
        avail: +(88 + Math.random() * 8).toFixed(1),
        perf: +(85 + Math.random() * 10).toFixed(1),
        qual: +(96 + Math.random() * 3.5).toFixed(1),
        output: Math.floor(1050 + Math.random() * 700),
        scrap: +(1.0 + Math.random() * 3.5).toFixed(1),
        lineA: Math.floor(70 + Math.random() * 28),
        lineB: Math.floor(55 + Math.random() * 38),
        lineC: Math.floor(65 + Math.random() * 30),
        lineD: Math.floor(45 + Math.random() * 45),
        weekData: Array.from({ length: 7 }, () => Math.floor(45 + Math.random() * 50)),
        shiftData: Array.from({ length: 5 }, () => Math.floor(40 + Math.random() * 55)),
      }));
      setLoading(false);
    }, 450);
  };

  const toggleTask = (id) => setTasks(ts => ts.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const addTask = () => {
    if (!taskInput.trim()) return;
    setTasks(ts => [...ts, { id: Date.now(), text: taskInput, done: false, priority: 'medium' }]);
    setTaskInput('');
    setNewTask(false);
  };

  const priorityColor = { high: '#ef4444', medium: '#f59e0b', low: '#22c55e' };
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const machines = [
    { name: 'Line A', status: 'Running', eff: stats.lineA, trend: +2.1 },
    { name: 'Line B', status: 'Warning', eff: stats.lineB, trend: -1.4 },
    { name: 'Line C', status: 'Running', eff: stats.lineC, trend: +0.8 },
    { name: 'Line D', status: 'Idle', eff: stats.lineD, trend: -3.2 },
  ];
  const inventory = [
    { name: 'Raw Material Alpha', qty: 342, unit: 'kg', low: false },
    { name: 'Packaging Type C', qty: 87, unit: 'pcs', low: true },
    { name: 'Machinery Part 9X', qty: 14, unit: 'pcs', low: true },
    { name: 'Chemical Solvent B', qty: 220, unit: 'L', low: false },
    { name: 'Finished Goods', qty: 1045, unit: 'units', low: false },
  ];
  const notifs = [
    { icon: <AlertTriangle size={12} />, color: '#ef4444', msg: 'Line B extruder temp exceeded threshold', time: '2m ago' },
    { icon: <CheckCircle size={12} />, color: '#22c55e', msg: 'Batch #4429 completed — 98.6% quality', time: '18m ago' },
    { icon: <Wrench size={12} />, color: '#f59e0b', msg: 'Maintenance alert: Line D coolant low', time: '1h ago' },
    { icon: <Package size={12} />, color: '#3b82f6', msg: 'PO #8812 approved and dispatched', time: '3h ago' },
  ];

  return (
    <div className="w-full h-full bg-[#080808] text-white flex flex-col font-sans relative overflow-hidden select-none" style={{ fontSize: 11 }}>

      {/* Status Bar */}
      <div className="h-6 w-full flex justify-between items-center px-4 text-[9px] text-zinc-400 bg-black/60 shrink-0">
        <span className="font-bold tracking-wider">9:41</span>
        <div className="flex gap-1.5 items-center">
          <div className="flex gap-0.5 items-end h-[9px]">
            {[1, 1.5, 2, 2.5].map((h, i) => (
              <span key={i} className="w-0.5 rounded-full bg-white" style={{ height: h * 4, opacity: i < 3 ? 1 : 0.3 }} />
            ))}
          </div>
          <span className="w-[18px] h-2.5 border border-white/50 rounded-[2px] relative">
            <span className="absolute inset-[1.5px] bg-white" style={{ width: '70%' }} />
          </span>
        </div>
      </div>

      {/* Header */}
      <div className="py-2.5 px-4 flex justify-between items-center bg-[#0d0d0d] border-b border-white/8 z-10 shrink-0">
        <button className="text-zinc-400 hover:text-white transition-colors w-7 h-7 flex items-center justify-center">
          <Menu size={16} />
        </button>
        <span className="font-black text-primary tracking-[0.15em] text-xs">FLAPP</span>
        <button
          className="text-zinc-400 hover:text-white transition-colors relative w-7 h-7 flex items-center justify-center"
          onClick={() => setNotifOpen(n => !n)}
        >
          <Bell size={15} />
          <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
        </button>
      </div>

      {/* Notification Dropdown */}
      {notifOpen && (
        <div className="absolute top-[62px] right-0 left-0 bg-[#111] border-b border-white/10 z-30 animate-fade-in">
          <div className="px-3 py-2 border-b border-white/5 flex justify-between items-center">
            <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold">Notifications</span>
            <button onClick={() => setNotifOpen(false)}><X size={12} className="text-zinc-500" /></button>
          </div>
          {notifs.map((n, i) => (
            <div key={i} className="flex items-start gap-2 px-3 py-2 border-b border-white/5 hover:bg-white/5 transition-colors">
              <div className="mt-0.5 shrink-0" style={{ color: n.color }}>{n.icon}</div>
              <div className="flex-1 min-w-0">
                <p className="text-[9px] text-zinc-300 leading-tight">{n.msg}</p>
                <p className="text-[8px] text-zinc-600 mt-0.5">{n.time}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] z-20 flex justify-center items-center">
          <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-none">

        {/* ── HOME ── */}
        {activeTab === 'home' && (
          <div className="flex flex-col gap-3 p-3 pb-4 animate-fade-in">
            {/* OEE Hero */}
            <div className="bg-gradient-to-br from-primary/25 via-primary/10 to-transparent border border-primary/30 p-4 rounded-2xl relative overflow-hidden">
              <div className="absolute -right-4 -top-4 w-20 h-20 bg-primary/20 rounded-full blur-2xl" />
              <p className="text-[9px] text-primary uppercase tracking-widest font-bold mb-2">Live Plant OEE</p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-end gap-2">
                    <span className="text-[36px] font-black leading-none tracking-tight">{stats.oee}%</span>
                    <span className="text-[9px] text-green-400 font-bold mb-1 bg-green-400/10 px-1.5 py-0.5 rounded">+2.4%</span>
                  </div>
                  <p className="text-[9px] text-zinc-500 mt-1">Updated 30s ago</p>
                </div>
                <div className="relative">
                  <DonutChart value={stats.oee} size={56} stroke={6} />
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold">{Math.round(stats.oee)}%</span>
                </div>
              </div>
            </div>

            {/* KPI Row */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Availability', val: stats.avail + '%', color: '#22c55e' },
                { label: 'Performance', val: stats.perf + '%', color: '#f59e0b' },
                { label: 'Quality', val: stats.qual + '%', color: '#3b82f6' },
              ].map((k, i) => (
                <div key={i} className="bg-white/4 border border-white/6 rounded-xl p-2.5 text-center">
                  <div className="text-[8px] text-zinc-500 uppercase tracking-wider mb-1">{k.label}</div>
                  <div className="text-sm font-black" style={{ color: k.color }}>{k.val}</div>
                </div>
              ))}
            </div>

            {/* Lines Status */}
            <div className="bg-white/4 border border-white/6 rounded-xl p-3">
              <p className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Production Lines</p>
              {machines.map((m, i) => (
                <div key={i} className="flex items-center gap-2 py-1.5 border-b border-white/5 last:border-0">
                  <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{
                    background: m.status === 'Running' ? '#22c55e' : m.status === 'Warning' ? '#f59e0b' : '#6b7280'
                  }} />
                  <span className="text-[10px] font-medium flex-1">{m.name}</span>
                  <div className="flex-1">
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700" style={{
                        width: m.eff + '%',
                        background: m.eff > 80 ? '#22c55e' : m.eff > 65 ? '#f59e0b' : '#ef4444'
                      }} />
                    </div>
                  </div>
                  <span className="text-[9px] font-mono w-8 text-right">{m.eff}%</span>
                  <span className="text-[8px] flex items-center" style={{ color: m.trend > 0 ? '#22c55e' : '#ef4444' }}>
                    {m.trend > 0 ? <ArrowUp size={8} /> : <ArrowDown size={8} />}
                    {Math.abs(m.trend)}
                  </span>
                </div>
              ))}
            </div>

            {/* Alerts */}
            <div>
              <p className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Recent Alerts</p>
              {notifs.slice(0, 2).map((n, i) => (
                <div key={i} className="flex gap-2 items-start p-2.5 rounded-xl mb-1.5 border" style={{
                  background: n.color + '10',
                  borderColor: n.color + '30'
                }}>
                  <div className="mt-0.5" style={{ color: n.color }}>{n.icon}</div>
                  <p className="text-[9px] text-zinc-300 leading-tight flex-1">{n.msg}</p>
                </div>
              ))}
            </div>

            {/* Refresh */}
            <button onClick={refresh} className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 flex items-center justify-center gap-2 hover:bg-white/10 active:scale-95 transition-all">
              <RefreshCw size={12} className="text-primary" />
              <span className="text-[10px] font-bold text-zinc-300 tracking-wide">REFRESH SENSORS</span>
            </button>
          </div>
        )}

        {/* ── METRICS ── */}
        {activeTab === 'metrics' && (
          <div className="flex flex-col gap-3 p-3 pb-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <p className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold">Weekly OEE Trend</p>
              <button onClick={refresh} className="text-primary"><RefreshCw size={11} /></button>
            </div>

            {/* Bar Chart */}
            <div className="bg-white/4 border border-white/6 rounded-xl p-3">
              <div className="flex items-end justify-between gap-1 mb-2" style={{ height: 70 }}>
                {stats.weekData.map((h, i) => {
                  const max = Math.max(...stats.weekData);
                  return (
                    <div key={i} className="flex flex-col items-center gap-1 flex-1">
                      <div
                        className="w-full rounded-t-sm transition-all duration-700"
                        style={{
                          height: `${(h / max) * 100}%`,
                          background: i === 6 ? '#dc2626' : '#ffffff22',
                          boxShadow: i === 6 ? '0 0 8px rgba(220,38,38,0.5)' : 'none'
                        }}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between">
                {days.map((d, i) => (
                  <div key={i} className="flex-1 text-center text-[8px] text-zinc-600 font-bold">{d}</div>
                ))}
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Avg OEE', val: stats.oee + '%', sub: '+2.4% vs last week', up: true, color: '#dc2626' },
                { label: 'Total Output', val: stats.output.toLocaleString(), sub: 'units this week', up: null, color: '#fff' },
                { label: 'Scrap Rate', val: stats.scrap + '%', sub: '-0.3% vs last week', up: false, color: '#ef4444' },
                { label: 'Downtime', val: '4.2h', sub: 'avg per shift', up: null, color: '#f59e0b' },
              ].map((k, i) => (
                <div key={i} className="bg-white/4 border border-white/6 rounded-xl p-3">
                  <p className="text-[8px] text-zinc-500 uppercase tracking-wider mb-1">{k.label}</p>
                  <p className="text-[18px] font-black leading-none mb-1" style={{ color: k.color }}>{k.val}</p>
                  {k.up !== null && (
                    <p className="text-[8px] flex items-center gap-0.5" style={{ color: k.up ? '#22c55e' : '#ef4444' }}>
                      {k.up ? <TrendingUp size={8} /> : <TrendingDown size={8} />} {k.sub}
                    </p>
                  )}
                  {k.up === null && <p className="text-[8px] text-zinc-600">{k.sub}</p>}
                </div>
              ))}
            </div>

            {/* Shift comparison */}
            <div className="bg-white/4 border border-white/6 rounded-xl p-3">
              <p className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Shift Performance</p>
              {['Shift 1', 'Shift 2', 'Shift 3'].map((s, i) => {
                const val = [stats.lineA, stats.lineB, stats.lineC][i];
                return (
                  <div key={i} className="flex items-center gap-2 mb-2">
                    <span className="text-[9px] text-zinc-400 w-12 shrink-0">{s}</span>
                    <div className="flex-1 h-1.5 bg-white/8 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700" style={{
                        width: val + '%',
                        background: `linear-gradient(to right, #dc2626, #ef4444)`
                      }} />
                    </div>
                    <span className="text-[9px] font-mono text-zinc-300 w-6 text-right">{val}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── TASKS ── */}
        {activeTab === 'tasks' && (
          <div className="flex flex-col gap-3 p-3 pb-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <p className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold">
                My Tasks ({tasks.filter(t => !t.done).length} pending)
              </p>
              <button
                onClick={() => setNewTask(n => !n)}
                className="bg-primary w-6 h-6 rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors"
              >
                {newTask ? <X size={11} /> : <Plus size={11} />}
              </button>
            </div>

            {newTask && (
              <div className="bg-white/5 border border-primary/30 rounded-xl p-3 animate-fade-in">
                <p className="text-[9px] text-zinc-500 uppercase tracking-wider mb-2">New Task</p>
                <input
                  className="w-full bg-white/8 border border-white/10 rounded-lg px-2 py-1.5 text-[10px] text-white placeholder-zinc-600 outline-none focus:border-primary/50 mb-2"
                  placeholder="Describe the task..."
                  value={taskInput}
                  onChange={e => setTaskInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addTask()}
                />
                <button onClick={addTask} className="w-full bg-primary text-white text-[9px] font-bold uppercase tracking-wider py-1.5 rounded-lg">
                  Add Task
                </button>
              </div>
            )}

            {tasks.map(t => (
              <div
                key={t.id}
                className={`flex items-start gap-2.5 p-3 rounded-xl border transition-all cursor-pointer active:scale-[0.98] ${
                  t.done ? 'bg-white/3 border-white/5 opacity-50' : 'bg-white/5 border-white/8 hover:border-primary/30'
                }`}
                onClick={() => toggleTask(t.id)}
              >
                <div className={`w-4 h-4 rounded-full border-[1.5px] flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                  t.done ? 'bg-primary border-primary' : 'border-zinc-600'
                }`}>
                  {t.done && <Check size={8} />}
                </div>
                <div className="flex-1 min-w-0">
                  <span className={`text-[10px] leading-tight block ${t.done ? 'line-through text-zinc-600' : 'text-zinc-200'}`}>
                    {t.text}
                  </span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ background: priorityColor[t.priority] }} />
              </div>
            ))}

            <p className="text-[8px] text-zinc-700 text-center mt-2">Tap task to toggle completion</p>
          </div>
        )}

        {/* ── INVENTORY ── */}
        {activeTab === 'inventory' && (
          <div className="flex flex-col gap-3 p-3 pb-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <p className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold">Live Inventory</p>
              <button onClick={refresh}><RefreshCw size={11} className="text-primary" /></button>
            </div>

            {/* Summary Row */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'SKUs', val: inventory.length },
                { label: 'Low Stock', val: inventory.filter(i => i.low).length, color: '#ef4444' },
                { label: 'Orders', val: 3 },
              ].map((s, i) => (
                <div key={i} className="bg-white/4 border border-white/6 rounded-xl p-2 text-center">
                  <div className="text-[14px] font-black" style={{ color: s.color || '#fff' }}>{s.val}</div>
                  <div className="text-[8px] text-zinc-600 uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>

            {inventory.map((item, i) => (
              <div key={i} className={`bg-white/4 border rounded-xl p-3 flex items-center gap-3 transition-all hover:bg-white/8 ${
                item.low ? 'border-red-500/30 bg-red-500/5' : 'border-white/6'
              }`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  item.low ? 'bg-red-500/20' : 'bg-white/8'
                }`}>
                  <Package size={14} className={item.low ? 'text-red-400' : 'text-zinc-400'} />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-medium text-zinc-200 block leading-tight truncate">{item.name}</span>
                  {item.low && <span className="text-[8px] text-red-400 font-bold uppercase tracking-wider">⚠ Low Stock</span>}
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[12px] font-black text-white">{item.qty}</div>
                  <div className="text-[8px] text-zinc-600">{item.unit}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── SETTINGS ── */}
        {activeTab === 'settings' && (
          <div className="flex flex-col gap-3 p-3 pb-4 animate-fade-in">
            {/* Profile */}
            <div className="bg-gradient-to-br from-primary/15 to-transparent border border-primary/20 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <User size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-white">Plant Manager</p>
                <p className="text-[9px] text-zinc-500">production@tamken.eg</p>
              </div>
              <div className="ml-auto bg-primary/20 text-primary text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">Admin</div>
            </div>

            {/* Settings Groups */}
            {[
              {
                label: 'Data & Sync',
                items: [
                  { icon: <RefreshCw size={12} />, name: 'Auto Refresh', val: 'Every 30s' },
                  { icon: <Zap size={12} />, name: 'Data Source', val: 'FLAPP Cloud' },
                  { icon: <Database size={12} />, name: 'Offline Mode', val: 'Enabled' },
                ]
              },
              {
                label: 'Alerts',
                items: [
                  { icon: <Bell size={12} />, name: 'Notifications', val: 'On' },
                  { icon: <AlertTriangle size={12} />, name: 'Critical Alerts', val: 'Instant' },
                ]
              },
            ].map((g, gi) => (
              <div key={gi} className="bg-white/4 border border-white/6 rounded-xl overflow-hidden">
                <p className="text-[8px] uppercase tracking-widest text-zinc-600 font-bold px-3 py-2 border-b border-white/5">{g.label}</p>
                {g.items.map((item, ii) => (
                  <div key={ii} className="flex items-center gap-2.5 px-3 py-2.5 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors cursor-pointer">
                    <div className="text-zinc-500">{item.icon}</div>
                    <span className="text-[10px] text-zinc-300 flex-1">{item.name}</span>
                    <span className="text-[9px] text-primary font-medium">{item.val}</span>
                    <ChevronRight size={10} className="text-zinc-700" />
                  </div>
                ))}
              </div>
            ))}

            <p className="text-[8px] text-zinc-700 text-center pt-2">FLAPP v2.4.1 · Made by TAMKEN</p>
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div className="h-[58px] bg-[#0d0d0d] border-t border-white/8 flex justify-around items-center px-2 z-20 shrink-0">
        {[
          { id: 'home', icon: <HomeIcon size={18} />, label: 'Home' },
          { id: 'metrics', icon: <BarChart2 size={18} />, label: 'Analytics' },
          { id: 'tasks', icon: <ClipboardList size={18} />, label: 'Tasks' },
          { id: 'inventory', icon: <Database size={18} />, label: 'Stock' },
          { id: 'settings', icon: <Settings size={18} />, label: 'Settings' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => go(tab.id)}
            className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-all duration-200 ${
              activeTab === tab.id
                ? 'text-primary scale-110'
                : 'text-zinc-600 hover:text-zinc-300'
            }`}
          >
            {tab.icon}
            <span className="text-[7px] font-bold uppercase tracking-widest">{tab.label}</span>
            {activeTab === tab.id && (
              <span className="w-1 h-1 bg-primary rounded-full animate-pulse" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

// ─── Flapp Page ───────────────────────────────────────────────────
const Flapp = () => {
  const elementsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-6');
        }
      });
    }, { threshold: 0.1 });
    elementsRef.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const features = [
    { title: "Production Tracking", desc: "Monitor output per line, track progress against shift goals, and identify real-time bottlenecks directly from the floor.", icon: <Sliders size={32} /> },
    { title: "Inventory Oversight", desc: "Live, accurate count of raw materials and finished goods. Automatic low-stock alerts prevent production halts.", icon: <Database size={32} /> },
    { title: "Task Management", desc: "Assign, track and close operational tasks for each shift team from a single, mobile-first interface.", icon: <ClipboardList size={32} /> },
    { title: "Analytics Dashboard", desc: "Weekly OEE trends, shift comparisons, and scrap rate history — all visualized clearly for fast decisions.", icon: <BarChart2 size={32} /> },
    { title: "Instant Alerts", desc: "Receive critical threshold alerts for temperature, machine state changes, and quality issues in real time.", icon: <Bell size={32} /> },
    { title: "Purchasing Management", desc: "Streamline procurement requests and approvals — maintain material flow without disrupting operations.", icon: <CheckCircle size={32} /> },
  ];

  return (
    <div className="w-full relative z-10">
      <div className="flex flex-col overflow-hidden pb-[50px] pt-[20px] md:pt-[50px] bg-background">
        <ContainerScroll
          titleComponent={
            <>
              <div className="inline-block px-4 py-1.5 mb-8 rounded-full border border-primary/30 bg-primary/10 text-primary font-mono text-sm">
                 Frontline Operations, Built for Scale
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-semibold text-black dark:text-white mb-8">
                Unleash the power of <br />
                <span className="text-5xl md:text-[6rem] font-bold mt-1 leading-none text-primary">
                  FLAPP Mobile
                </span>
              </h1>
            </>
          }
        >
          <img
            src={`https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=3840&auto=format&fit=crop`}
            alt="hero factory dashboard"
            className="mx-auto rounded-2xl object-cover h-full w-full object-center"
            draggable={false}
          />
        </ContainerScroll>
      </div>

      <section className="bg-secondary/50 border-t border-border/50 shadow-[inset_0_20px_40px_rgba(0,0,0,0.5)] pt-24 pb-32 overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          <div className="lg:col-span-7 flex flex-col justify-center transition-all duration-700 ease-out opacity-0 translate-y-6" ref={el => elementsRef.current[0] = el}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">Your factory operations, visible on your phone.</h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              FLAPP enables manufacturers to capture real-time operational data, convert it into clear dashboards, and make timely, data-driven decisions — without the cost, complexity, or disruption of traditional ERP systems.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { icon: <Clock size={28} />, val: '100%', label: 'Real-time Visibility' },
                { icon: <Eye size={28} />, val: '0', label: 'Manual Reporting' },
                { icon: <Activity size={28} />, val: '5', label: 'Module Screens' },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-3 bg-card/60 backdrop-blur p-4 rounded-2xl border border-white/5 shadow-xl">
                  <div className="text-primary shrink-0">{s.icon}</div>
                  <div>
                    <h4 className="text-2xl font-black text-foreground tracking-tighter">{s.val}</h4>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{s.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center items-center py-8 lg:py-0 transition-all duration-1000 ease-out opacity-0 translate-y-6" ref={el => elementsRef.current[1] = el}>
            {/* Phone */}
            <div className="w-[280px] h-[580px] rounded-[44px] bg-[#1a1a1a] p-[9px] shadow-[0_40px_80px_rgba(0,0,0,0.7),inset_0_2px_10px_rgba(255,255,255,0.08)] relative transition-transform duration-700 hover:scale-105 group border border-[#2a2a2a]">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#1a1a1a] rounded-b-[18px] z-30 flex justify-center items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#111] shadow-inner" />
                <div className="w-10 h-1 rounded-full bg-[#111]" />
              </div>
              {/* Side buttons */}
              <div className="absolute -left-[3px] top-28 w-[3px] h-10 bg-[#333] rounded-l-md" />
              <div className="absolute -left-[3px] top-44 w-[3px] h-20 bg-[#333] rounded-l-md" />
              <div className="absolute -right-[3px] top-36 w-[3px] h-14 bg-[#333] rounded-r-md" />
              {/* Screen */}
              <div className="w-full h-full rounded-[36px] overflow-hidden bg-black relative isolate">
                <InteractiveMobileApp />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/4 to-transparent mix-blend-overlay rotate-12 scale-[1.5] translate-y-[-20%] pointer-events-none transition-transform duration-700 group-hover:translate-x-1/4" />
              </div>
            </div>

            {/* Badge */}
            <div className="absolute -right-6 bottom-20 bg-primary text-white font-black text-[9px] uppercase tracking-widest py-2 px-3 rounded-full shadow-xl animate-bounce hidden md:block z-50 pointer-events-none">
              Tap screens!
              <div className="absolute right-full top-1/2 -translate-y-1/2 translate-x-1 border-4 border-transparent border-r-primary" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 relative z-10 container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 mb-4">
            <Zap size={14} />
            <span className="text-sm font-semibold tracking-wide">CORE MODULES</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">Built for the Factory Floor</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">Every module is purpose-built for operational teams, not office workers.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <div
              className="glass-panel rounded-industrial transition-all duration-700 ease-out opacity-0 translate-y-6 hover:-translate-y-2 hover:border-primary/60 hover:shadow-[0_0_30px_rgba(220,38,38,0.15)] group cursor-default"
              key={idx}
              ref={el => elementsRef.current[2 + idx] = el}
            >
              <div className="p-8 h-full flex flex-col bg-gradient-to-b from-card to-background">
                <div className="mb-6 text-primary bg-primary/10 w-16 h-16 flex items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                  {feat.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{feat.title}</h3>
                <p className="text-muted-foreground leading-relaxed flex-1">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Flapp;
