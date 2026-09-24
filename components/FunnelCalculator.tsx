'use client';

import { useState } from 'react';

const fields = [
  { key: 'visitors', label: 'Landing page visitors', hint: 'Unique visitors to the offer page' },
  { key: 'leads', label: 'Leads', hint: 'People who submitted the form or opted in' },
  { key: 'booked', label: 'Calls booked', hint: 'Confirmed discovery call bookings' },
  { key: 'attended', label: 'Calls attended', hint: 'Booked prospects who showed up' },
  { key: 'clients', label: 'New clients', hint: 'Attendees who became paying clients' },
] as const;

type Field = (typeof fields)[number]['key'];
type Values = Record<Field, string>;

const initialValues: Values = { visitors: '', leads: '', booked: '', attended: '', clients: '' };

export default function FunnelCalculator() {
  const [values, setValues] = useState<Values>(initialValues);
  const complete = fields.every(field => values[field.key] !== '');
  const counts = Object.fromEntries(fields.map(field => [field.key, Number(values[field.key])])) as Record<Field, number>;
  const valid = complete && fields.every(field => Number.isSafeInteger(counts[field.key]) && counts[field.key] >= 0)
    && counts.leads <= counts.visitors
    && counts.booked <= counts.leads
    && counts.attended <= counts.booked
    && counts.clients <= counts.attended;

  const stages = [
    { label: 'Visitor → lead', numerator: counts.leads, denominator: counts.visitors, lost: counts.visitors - counts.leads },
    { label: 'Lead → booked call', numerator: counts.booked, denominator: counts.leads, lost: counts.leads - counts.booked },
    { label: 'Booked → attended', numerator: counts.attended, denominator: counts.booked, lost: counts.booked - counts.attended },
    { label: 'Attended → client', numerator: counts.clients, denominator: counts.attended, lost: counts.attended - counts.clients },
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6 sm:p-8">
        <h2 className="text-2xl font-semibold">Enter one month of numbers</h2>
        <p className="mt-3 text-sm text-neutral-400">Use the same time period and traffic source for every field. Your entries stay in your browser.</p>
        <div className="mt-8 space-y-5">
          {fields.map(field => (
            <div key={field.key}>
              <label htmlFor={`calc-${field.key}`} className="block font-medium text-white">{field.label}</label>
              <p className="mt-1 text-xs text-neutral-500">{field.hint}</p>
              <input
                id={`calc-${field.key}`}
                type="number"
                min="0"
                step="1"
                inputMode="numeric"
                value={values[field.key]}
                onChange={event => setValues(current => ({ ...current, [field.key]: event.target.value }))}
                className="mt-2 w-full rounded-lg border border-neutral-700 bg-background px-4 py-3 text-white outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                placeholder="0"
              />
            </div>
          ))}
        </div>
        {complete && !valid && <p role="alert" className="mt-5 text-sm text-red-300">Use whole, nonnegative numbers. Each later stage must be no larger than the stage above it.</p>}
      </div>

      <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6 sm:p-8" aria-live="polite">
        <h2 className="text-2xl font-semibold">Your funnel rates</h2>
        {!valid ? (
          <p className="mt-6 leading-relaxed text-neutral-400">Fill in the five counts to see the share of people who move through each step. You can enter zero for a stage that has no conversions yet.</p>
        ) : (
          <>
            <div className="mt-7 space-y-4">
              {stages.map(stage => (
                <div key={stage.label} className="rounded-xl border border-neutral-800 bg-background p-5">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-medium text-neutral-200">{stage.label}</h3>
                    <strong className="text-2xl text-accent">{stage.denominator ? `${(stage.numerator / stage.denominator * 100).toFixed(1)}%` : '—'}</strong>
                  </div>
                  <p className="mt-2 text-xs text-neutral-500">{stage.numerator.toLocaleString()} of {stage.denominator.toLocaleString()} moved forward · {stage.lost.toLocaleString()} did not</p>
                </div>
              ))}
            </div>
            <p className="mt-7 text-sm leading-relaxed text-neutral-300">
              Overall visitor-to-client rate: <strong className="text-white">{counts.visitors ? `${(counts.clients / counts.visitors * 100).toFixed(2)}%` : '—'}</strong>. Compare each stage with your own past months and traffic sources before deciding what to change.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
