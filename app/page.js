'use client';

import { useState } from 'react';
import {
  AlertTriangle, ArrowRight, Bell, Bot, Camera, CheckCircle2, ChevronRight,
  CircleHelp, Clock3, Home, Lightbulb, LocateFixed, MapPin, Mic, Moon,
  Navigation, Plus, Search, Settings, ShieldCheck, Sparkles, Sun, UserRound,
  UsersRound, WalletCards, Wrench, X, Zap
} from 'lucide-react';

const reports = [
  { id: 'SX-1048', title: 'Water pipeline leakage', location: 'Ward 4 · Main road', status: 'In progress', color: 'amber', time: 'Today, 9:42 AM', icon: '💧' },
  { id: 'SX-1032', title: 'Streetlight not working', location: 'Near community centre', status: 'Resolved', color: 'green', time: 'Yesterday', icon: '💡' },
  { id: 'SX-1019', title: 'Road pothole', location: 'School crossing', status: 'Under review', color: 'blue', time: 'Sep 24', icon: '🛣️' },
];

const nearby = [
  { title: 'Open drain near market', distance: '180 m', severity: 'High', reports: 8, icon: '🚧' },
  { title: 'Transformer issue', distance: '420 m', severity: 'Medium', reports: 3, icon: '⚡' },
  { title: 'Water pressure low', distance: '650 m', severity: 'Medium', reports: 5, icon: '💧' },
];

function StatusPill({ children, tone='blue' }) { return <span className={`pill ${tone}`}>{children}</span> }

export default function App() {
  const [tab, setTab] = useState('home');
  const [dark, setDark] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [reportMode, setReportMode] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const nav = [
    ['home', Home, 'Home'], ['reports', Clock3, 'Reports'], ['nearby', Navigation, 'Nearby'], ['alerts', Bell, 'Alerts'], ['profile', UserRound, 'Profile']
  ];

  const openReport = (mode) => { setReportMode(mode); setReportOpen(true); setSubmitted(false); };
  const closeReport = () => { setReportOpen(false); setReportMode(null); };

  return (
    <main className={dark ? 'app dark' : 'app'}>
      <div className="ambient ambient-a"/><div className="ambient ambient-b"/>
      <header className="topbar">
        <div className="brand"><div className="brand-mark"><Sparkles size={18}/></div><div><strong>SAHAY<span>AI</span></strong><small>Smart village assistance</small></div></div>
        <div className="top-actions"><button className="icon-btn" onClick={() => setDark(!dark)} aria-label="Toggle theme">{dark ? <Sun size={19}/> : <Moon size={19}/>}</button><button className="avatar">A</button></div>
      </header>

      <section className="page">
        {tab === 'home' && <HomeScreen onReport={openReport} />}
        {tab === 'reports' && <ReportsScreen />}
        {tab === 'nearby' && <NearbyScreen />}
        {tab === 'alerts' && <AlertsScreen />}
        {tab === 'profile' && <ProfileScreen onTheme={() => setDark(!dark)} dark={dark} />}
      </section>

      <nav className="bottom-nav">
        {nav.map(([key, Icon, label]) => <button key={key} className={tab===key?'active':''} onClick={() => setTab(key)}><Icon size={19}/><span>{label}</span>{key==='alerts' && <i/>}</button>)}
      </nav>

      {reportOpen && <ReportSheet mode={reportMode} submitted={submitted} onClose={closeReport} onSubmit={() => setSubmitted(true)} onChoose={setReportMode}/>} 
    </main>
  );
}

function HomeScreen({ onReport }) {
  return <>
    <section className="hero-card">
      <div className="hero-copy"><div className="eyebrow"><span className="live-dot"/> Village intelligence active</div><h1>What’s happening<br/><em>around you?</em></h1><p>Tell SAHAY AI. We’ll understand it, find the right help and keep you updated.</p>
      <button className="primary-btn voice" onClick={() => onReport('voice')}><Mic size={21}/><span>Tell us what’s wrong</span><kbd>⌘ V</kbd></button></div>
      <div className="hero-orb"><div className="orb-ring r1"/><div className="orb-ring r2"/><div className="orb-core"><Bot size={31}/></div></div>
    </section>

    <div className="quick-grid">
      <button onClick={() => onReport('photo')}><div className="quick-icon photo"><Camera/></div><strong>Photo</strong><span>Show the problem</span></button>
      <button onClick={() => onReport('text')}><div className="quick-icon text"><Search/></div><strong>Describe</strong><span>Type a report</span></button>
      <button onClick={() => onReport('worker')}><div className="quick-icon worker"><Wrench/></div><strong>Find help</strong><span>Nearby workers</span></button>
    </div>

    <section className="section-head"><div><span className="section-kicker">Your activity</span><h2>Stay in the loop</h2></div><button className="text-btn">View all <ArrowRight size={16}/></button></section>
    <div className="stat-strip">
      <div><span className="stat-num">3</span><span>Reports</span></div><div><span className="stat-num">2</span><span>Resolved</span></div><div><span className="stat-num trust">86</span><span>Trust score</span></div>
    </div>

    <section className="section-head"><div><span className="section-kicker">AI watch</span><h2>Needs attention</h2></div><StatusPill tone="red">3 nearby</StatusPill></section>
    <div className="attention-card"><div className="attention-icon"><AlertTriangle/></div><div className="attention-main"><strong>Open drain near market</strong><p>8 people reported the same issue · 180 m away</p><div className="progress"><span style={{width:'72%'}}/></div><small>Community impact <b>High</b></small></div><ChevronRight/></div>

    <section className="section-head"><div><span className="section-kicker">Recent</span><h2>Your reports</h2></div><button className="text-btn">See all <ArrowRight size={16}/></button></section>
    <div className="report-list">{reports.slice(0,2).map(r => <ReportRow key={r.id} report={r}/>)}</div>

    <div className="tip-card"><div className="tip-icon"><Lightbulb/></div><div><span>SAHAY AI tip</span><strong>For simple problems, we can guide you step-by-step before you book a worker.</strong></div></div>
  </>
}

function ReportRow({report:r}) { return <div className="report-row"><div className="report-emoji">{r.icon}</div><div className="report-info"><div><strong>{r.title}</strong><StatusPill tone={r.color}>{r.status}</StatusPill></div><p><MapPin size={13}/>{r.location} · {r.time}</p></div><ChevronRight size={17}/></div> }

function ReportsScreen(){ return <><PageTitle kicker="Your activity" title="My reports" action={<button className="icon-btn"><Search size={19}/></button>}/><div className="filter-row"><StatusPill tone="blue">All · 3</StatusPill><span>Active · 2</span><span>Resolved · 1</span></div><div className="report-list large">{reports.map(r=><ReportRow key={r.id} report={r}/> )}</div><div className="empty-prompt"><CheckCircle2/><strong>Everything is trackable</strong><p>Every report gets an ID, status and timeline so you always know what’s happening.</p></div></> }

function NearbyScreen(){ return <><PageTitle kicker="Around your village" title="Nearby issues" action={<button className="icon-btn"><LocateFixed size={19}/></button>}/><div className="map-card"><div className="map-grid"/><div className="map-label label-a">You</div><div className="map-pin pin-a"><AlertTriangle size={15}/></div><div className="map-pin pin-b"><Zap size={15}/></div><div className="map-pin pin-c"><DropletIcon/></div><div className="map-you"><LocateFixed size={17}/></div><div className="map-bottom"><span><span className="map-dot red-dot"/> High</span><span><span className="map-dot amber-dot"/> Medium</span><span><span className="map-dot teal-dot"/> Resolved</span></div></div><section className="section-head"><div><span className="section-kicker">Community pulse</span><h2>3 active issues</h2></div></section><div className="nearby-list">{nearby.map((x,i)=><div className="nearby-row" key={i}><span className="nearby-emoji">{x.icon}</span><div><strong>{x.title}</strong><p>{x.distance} · {x.reports} reports</p></div><StatusPill tone={x.severity==='High'?'red':'amber'}>{x.severity}</StatusPill></div>)}</div></> }

function DropletIcon(){return <span style={{fontSize:12}}>💧</span>}
function AlertsScreen(){ return <><PageTitle kicker="Stay informed" title="Notifications" action={<button className="text-btn">Mark all read</button>}/><div className="alert-card unread"><div className="alert-icon green"><CheckCircle2/></div><div><strong>Your streetlight report was resolved</strong><p>Officer verified the repair near community centre.</p><small>18 min ago</small></div></div><div className="alert-card unread"><div className="alert-icon blue"><Bot/></div><div><strong>AI found 5 similar reports</strong><p>Water pressure issue reported around Ward 4.</p><small>2 hrs ago</small></div></div><div className="alert-card"><div className="alert-icon amber"><Wrench/></div><div><strong>Worker accepted your request</strong><p>Rakesh Kumar is on the way · ETA 18 min.</p><small>Yesterday</small></div></div></> }

function ProfileScreen({onTheme,dark}){ return <><PageTitle kicker="Your account" title="Profile" action={<button className="icon-btn"><Settings size={19}/></button>}/><div className="profile-hero"><div className="big-avatar">A</div><div><h2>Arjun Sharma</h2><p><MapPin size={14}/> Ward 4 · Your Village</p><div className="verified"><ShieldCheck size={14}/> Verified citizen</div></div></div><div className="profile-stats"><div><b>12</b><span>Reports</span></div><div><b>9</b><span>Resolved</span></div><div><b>86</b><span>Trust score</span></div></div><div className="settings-card"><div className="setting-row"><div><Moon size={18}/><span>Appearance</span></div><button className="toggle" onClick={onTheme}><i className={dark?'on':''}/></button></div><div className="setting-row"><div><Bell size={18}/><span>Notifications</span></div><ChevronRight size={18}/></div><div className="setting-row"><div><CircleHelp size={18}/><span>Help & safety</span></div><ChevronRight size={18}/></div></div></>}

function PageTitle({kicker,title,action}){return <div className="page-title"><div><span className="section-kicker">{kicker}</span><h1>{title}</h1></div>{action}</div>}

function ReportSheet({mode,submitted,onClose,onSubmit,onChoose}){
  return <div className="sheet-backdrop" onMouseDown={e=>e.target===e.currentTarget&&onClose()}><div className="sheet"><div className="sheet-handle"/><div className="sheet-head"><div><span className="section-kicker">New report</span><h2>{submitted?'Report submitted':'Tell SAHAY AI'}</h2></div><button className="icon-btn" onClick={onClose}><X size={18}/></button></div>{submitted ? <div className="success-state"><div className="success-icon"><CheckCircle2/></div><h2>We’ve got it.</h2><p>Your report <b>#SX-1051</b> has been created. We’ll keep you updated as it moves forward.</p><div className="ai-understood"><Sparkles/><div><span>AI understood</span><strong>Water pipeline leakage</strong><small>Ward 4 · High priority · Public utility</small></div></div><button className="primary-btn" onClick={onClose}>View report</button></div> : <>
  <div className="mode-tabs"><button className={mode==='voice'?'selected':''} onClick={()=>onChoose('voice')}><Mic/> Voice</button><button className={mode==='photo'?'selected':''} onClick={()=>onChoose('photo')}><Camera/> Photo</button><button className={mode==='text'?'selected':''} onClick={()=>onChoose('text')}><Search/> Text</button></div>
  {mode==='voice' && <div className="voice-panel"><div className="big-mic"><div className="pulse p1"/><div className="pulse p2"/><Mic/></div><strong>Speak naturally</strong><p>“Mere gaon mein paani ki pipeline leak ho rahi hai…”</p><span className="listening"><i/> Listening for your problem</span></div>}
  {mode==='photo' && <div className="upload-panel"><div className="upload-icon"><Camera/></div><strong>Show us the problem</strong><p>Take a clear photo. SAHAY AI will identify what it can and ask you to confirm.</p><button className="secondary-btn"><Camera size={18}/> Open camera</button></div>}
  {mode==='text' && <div className="text-panel"><label>Describe the problem</label><textarea placeholder="Tell us what’s happening…" defaultValue="There is water leaking from the main pipeline near Ward 4."/><div className="location-line"><MapPin size={15}/> Ward 4 · Main road <CheckCircle2 size={15}/></div></div>}
  {mode==='worker' && <div className="worker-panel"><div className="worker-search"><Search/><span>What help do you need?</span></div><div className="worker-suggestions"><button><Wrench/>Plumber <ChevronRight/></button><button><Zap/>Electrician <ChevronRight/></button><button><UsersRound/>House help <ChevronRight/></button></div></div>}
  <div className="sheet-footer"><div><small>Location attached</small><span><MapPin size={13}/> Ward 4 · GPS ready</span></div><button className="primary-btn" onClick={onSubmit}>{mode==='worker'?'Find nearby help':'Continue'} <ArrowRight size={17}/></button></div>
  </>}</div></div>
}
