import React from 'react';

const DiffView = ({ before, after }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 bg-bg/20">
      <div className="border-r-2 border-border">
        <div className="p-4 bg-panel border-b-2 border-border">
          <p className="mono text-[10px] text-text-muted uppercase font-black tracking-[0.4em]">LEGACY_LOGIC</p>
        </div>
        <div className="p-6 bg-bg/30 overflow-x-auto shadow-inner">
          <pre className="text-[12px] font-mono text-text-muted whitespace-pre leading-relaxed font-bold opacity-60">
            {before}
          </pre>
        </div>
      </div>
      <div className="bg-bg/10">
        <div className="p-4 bg-text border-b-2 border-text">
          <p className="mono text-[10px] text-bg uppercase font-black tracking-[0.4em]">STABILIZED_LAYER</p>
        </div>
        <div className="p-6 overflow-x-auto bg-highlight/10 shadow-inner">
          <pre className="text-[12px] font-mono text-text whitespace-pre leading-relaxed font-black italic">
            {after}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default DiffView;


