'use client';

import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Maximize2, Minimize2 } from 'lucide-react';
import { config } from './content';
import './bio-demo.css';

export default function BioDemo({active}:{active:boolean}) {
  const panel=useRef<HTMLDivElement>(null);
  const [visited,setVisited]=useState(false);
  const [expanded,setExpanded]=useState(false);
  const [loaded,setLoaded]=useState(false);
  const [notice,setNotice]=useState('');
  if(active&&!visited)setVisited(true);
  useEffect(()=>{
    const sync=()=>setExpanded(document.fullscreenElement===panel.current);
    document.addEventListener('fullscreenchange',sync);
    return ()=>document.removeEventListener('fullscreenchange',sync);
  },[]);
  const expand=async()=>{
    try {
      if(document.fullscreenElement===panel.current)await document.exitFullscreen();
      else await panel.current?.requestFullscreen();
      setNotice('');
    } catch {setNotice('Use Open app for a larger workspace.');}
  };
  return <div className="bio-demo-shell" ref={panel}>
    <div className="bio-demo-toolbar">
      <span className="bio-demo-label"><i aria-hidden="true"/>Live application</span>
      <div className="bio-demo-actions">
        <a href={config.sampleAppUrl} target="_blank" rel="noopener noreferrer">Open app <ExternalLink size={14}/></a>
        <button onClick={expand} aria-label={expanded?'Exit full screen':'Expand bio builder'}>{expanded?<Minimize2 size={15}/>:<Maximize2 size={15}/>}<span>{expanded?'Restore':'Expand'}</span></button>
      </div>
    </div>
    {notice&&<output className="bio-demo-notice">{notice}</output>}
    <div className="bio-demo-workspace">
      {!loaded&&<output className="bio-demo-loading"><span>Opening Canopy Bio Builder…</span><a href={config.sampleAppUrl} target="_blank" rel="noopener noreferrer">Open the app directly <ExternalLink size={14}/></a></output>}
      {(active||visited)&&<iframe src={config.sampleAppUrl} title="Canopy consultant bio builder" onLoad={()=>setLoaded(true)}/>}
    </div>
  </div>;
}
