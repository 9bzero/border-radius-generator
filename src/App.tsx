import{useState}from'react'
  export default function App(){
    const[tl,setTl]=useState(16)
    const[tr,setTr]=useState(16)
    const[bl,setBl]=useState(16)
    const[br,setBr]=useState(16)
    const[linked,setLinked]=useState(true)
    const[cp,setCp]=useState(false)
    const setAll=(v:number)=>{setTl(v);setTr(v);setBl(v);setBr(v)}
    const set=(fn:(v:number)=>void)=>(v:number)=>{if(linked)setAll(v);else fn(v)}
    const cssVal=tl===tr&&tr===bl&&bl===br?tl+"px":`${tl}px ${tr}px ${br}px ${bl}px`
    const css=`.element {\n  border-radius: ${cssVal};\n}`
    const copy=()=>{navigator.clipboard.writeText(css);setCp(true);setTimeout(()=>setCp(false),2000)}
    const CORNERS=[{l:"Top Left",v:tl,set:set(setTl)},{l:"Top Right",v:tr,set:set(setTr)},{l:"Bottom Right",v:br,set:set(setBr)},{l:"Bottom Left",v:bl,set:set(setBl)}]
    return(
      <div style={{minHeight:"100vh",display:"flex",fontFamily:"Inter,system-ui,sans-serif",color:"#e2e8f0"}}>
        <div style={{width:300,borderRight:"1px solid #1e293b",padding:"2rem",display:"flex",flexDirection:"column",gap:"1.25rem",background:"#111827",flexShrink:0}}>
          <h1 style={{fontWeight:800,fontSize:"1.3rem",color:"#f8fafc"}}>⬛ Border Radius</h1>
          <label style={{display:"flex",alignItems:"center",gap:"0.5rem",color:"#94a3b8",fontSize:"0.85rem",cursor:"pointer"}}>
            <input type="checkbox" checked={linked} onChange={e=>setLinked(e.target.checked)} style={{accentColor:"#38bdf8"}}/>Link all corners
          </label>
          {CORNERS.map(({l,v,set:s})=>(
            <div key={l}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:"0.82rem",marginBottom:"0.35rem"}}>
                <span style={{color:"#94a3b8"}}>{l}</span><span style={{color:"#38bdf8",fontFamily:"monospace"}}>{v}px</span>
              </div>
              <input type="range" min={0} max={100} value={v} onChange={e=>s(+e.target.value)} style={{width:"100%",accentColor:"#38bdf8"}}/>
            </div>
          ))}
          <pre style={{background:"#0f172a",border:"1px solid #1e293b",borderRadius:8,padding:"0.75rem",fontSize:"0.75rem",fontFamily:"JetBrains Mono,monospace",color:"#86efac",overflowX:"auto"}}>{css}</pre>
          <button onClick={copy} style={{padding:"0.65rem",background:cp?"#166534":"#0ea5e9",color:"#fff",border:"none",borderRadius:8,cursor:"pointer",fontWeight:700}}>{cp?"✓ Copied!":"Copy CSS"}</button>
        </div>
        <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",background:"#0f172a"}}>
          <div style={{width:200,height:200,background:"linear-gradient(135deg,#38bdf8,#6366f1)",borderRadius:cssVal,transition:"border-radius 0.2s",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:"0.9rem"}}>{cssVal}</div>
        </div>
      </div>
    )
  }