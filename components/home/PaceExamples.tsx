'use client';

import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import { home } from '@/content/home';

export function PaceExamples() {
  const { stages, indexCaption } = home.framework;
  const [active, setActive] = useState(0);
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function navigate(event: KeyboardEvent, index: number) {
    const keys: Record<string, number> = {
      ArrowDown: (index + 1) % stages.length,
      ArrowUp: (index + stages.length - 1) % stages.length,
      Home: 0, End: stages.length - 1,
    };
    const next = keys[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return <div className="pace-workbook">
    <div className="pace-index">
      <p>{indexCaption}</p>
      <div role="tablist" aria-label="P.A.C.E. work samples" aria-orientation="vertical">
        {stages.map((stage, index) => <button key={stage.name} type="button" role="tab"
          id={id + '-tab-' + index} aria-controls={id + '-sample-' + index} aria-selected={active === index}
          tabIndex={active === index ? 0 : -1} ref={el => { tabs.current[index] = el; }}
          onClick={() => setActive(index)} onKeyDown={event => navigate(event, index)}>
          <span>{stage.name}</span><small>{stage.deliverable}</small><ArrowRight size={17} aria-hidden="true" />
        </button>)}
      </div>
    </div>
    <div className="pace-samples">
      {stages.map((stage, index) => <div key={stage.name} role="tabpanel" hidden={active !== index} tabIndex={0}
        id={id + '-sample-' + index} aria-labelledby={id + '-tab-' + index}>
        <div className="pace-sheet">
          <span className="pace-imprint">Example / {stage.deliverable}</span>
          <h3>{stage.sample.title}</h3>
          <strong>{stage.sample.detailLabel}</strong>
          <p>{stage.sample.detail}</p>
          {'context' in stage.sample && <p className="pace-signoff">{stage.sample.context}</p>}
        </div>
        <p className="pace-explanation">{stage.explanation}</p>
      </div>)}
    </div>
  </div>;
}
