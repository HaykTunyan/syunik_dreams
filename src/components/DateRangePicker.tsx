"use client";

import { useState, useMemo, useCallback } from "react";

/* ── Helpers ─────────────────────────────────────────────────────────── */

const MONTH_NAMES = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December",
];

const DAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isBefore(a: Date, b: Date) {
  return a.getTime() < b.getTime();
}

function isInRange(day: Date, start: Date, end: Date) {
  return day.getTime() >= start.getTime() && day.getTime() <= end.getTime();
}

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/* ── Types ───────────────────────────────────────────────────────────── */

export interface DateRangePickerProps {
  /** Currently selected start date */
  startDate: Date | null;
  /** Currently selected end date */
  endDate: Date | null;
  /** Called with [start, end] whenever the selection changes */
  onChange: (range: [Date | null, Date | null]) => void;
}

/* ── Component ───────────────────────────────────────────────────────── */

export default function DateRangePicker({
  startDate,
  endDate,
  onChange,
}: DateRangePickerProps) {
  const today = startOfDay(new Date());

  // Which month the calendar is viewing
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  // Hover state for range preview
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  /* Navigate months */
  const goToPrev = useCallback(() => {
    setViewMonth((m) => {
      if (m === 0) {
        setViewYear((y) => y - 1);
        return 11;
      }
      return m - 1;
    });
  }, []);

  const goToNext = useCallback(() => {
    setViewMonth((m) => {
      if (m === 11) {
        setViewYear((y) => y + 1);
        return 0;
      }
      return m + 1;
    });
  }, []);

  /* Build the grid of day cells */
  const calendarDays = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1);
    const startOffset = firstDay.getDay(); // 0=Sun
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

    const cells: (Date | null)[] = [];
    // Leading blanks
    for (let i = 0; i < startOffset; i++) cells.push(null);
    // Actual days
    for (let d = 1; d <= daysInMonth; d++)
      cells.push(new Date(viewYear, viewMonth, d));
    return cells;
  }, [viewYear, viewMonth]);

  /* Click logic – two-click range */
  function handleDayClick(day: Date) {
    if (isBefore(day, today)) return; // disable past

    if (!startDate || (startDate && endDate)) {
      // First click or reset
      onChange([day, null]);
    } else {
      // Second click
      if (isBefore(day, startDate)) {
        onChange([day, startDate]);
      } else {
        onChange([startDate, day]);
      }
    }
  }

  /* Determine cell styling */
  function dayClasses(day: Date) {
    const isPast = isBefore(day, today);
    const isToday = isSameDay(day, today);
    const isStart = startDate && isSameDay(day, startDate);
    const isEnd = endDate && isSameDay(day, endDate);
    const isSelected = isStart || isEnd;

    // Range (filled) or preview range (while hovering)
    let inRange = false;
    let inPreview = false;

    if (startDate && endDate) {
      inRange = isInRange(day, startDate, endDate);
    } else if (startDate && !endDate && hoverDate) {
      const lo = isBefore(hoverDate, startDate) ? hoverDate : startDate;
      const hi = isBefore(hoverDate, startDate) ? startDate : hoverDate;
      inPreview = isInRange(day, lo, hi);
    }

    const base =
      "relative w-10 h-10 flex items-center justify-center text-sm font-medium rounded-full transition-all duration-200 select-none";

    if (isPast)
      return `${base} text-zinc-700 cursor-not-allowed`;

    if (isSelected)
      return `${base} bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30 scale-105 cursor-pointer`;

    if (inRange)
      return `${base} bg-orange-500/20 text-orange-300 cursor-pointer`;

    if (inPreview)
      return `${base} bg-orange-500/10 text-orange-300/80 cursor-pointer`;

    if (isToday)
      return `${base} ring-1 ring-orange-500/50 text-orange-400 cursor-pointer hover:bg-orange-500/15`;

    return `${base} text-zinc-300 cursor-pointer hover:bg-white/5`;
  }

  /* Preview label below the calendar */
  const rangeLabel = useMemo(() => {
    if (startDate && endDate) {
      const fmt = (d: Date) =>
        `${MONTH_NAMES[d.getMonth()].slice(0, 3)} ${d.getDate()}, ${d.getFullYear()}`;
      return `${fmt(startDate)}  →  ${fmt(endDate)}`;
    }
    if (startDate) return "Select end date…";
    return "Select start date…";
  }, [startDate, endDate]);

  /* Can we go back? Don't allow before current month */
  const canGoPrev =
    viewYear > today.getFullYear() ||
    (viewYear === today.getFullYear() && viewMonth > today.getMonth());

  return (
    <div className="space-y-4">
      {/* ── Month Navigation ── */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={goToPrev}
          disabled={!canGoPrev}
          className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors
            ${canGoPrev ? "bg-white/5 hover:bg-white/10 text-zinc-300" : "text-zinc-700 cursor-not-allowed"}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        <span className="text-sm font-bold tracking-wide text-white">
          {MONTH_NAMES[viewMonth]} {viewYear}
        </span>

        <button
          type="button"
          onClick={goToNext}
          className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/5 hover:bg-white/10 text-zinc-300 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>

      {/* ── Day-of-week Header ── */}
      <div className="grid grid-cols-7 gap-1">
        {DAY_LABELS.map((d) => (
          <div
            key={d}
            className="w-10 h-8 flex items-center justify-center text-[10px] font-bold uppercase tracking-widest text-zinc-500"
          >
            {d}
          </div>
        ))}
      </div>

      {/* ── Day Grid ── */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, i) =>
          day ? (
            <button
              key={i}
              type="button"
              onClick={() => handleDayClick(day)}
              onMouseEnter={() => setHoverDate(day)}
              onMouseLeave={() => setHoverDate(null)}
              className={dayClasses(day)}
            >
              {day.getDate()}
            </button>
          ) : (
            <div key={i} className="w-10 h-10" />
          )
        )}
      </div>

      {/* ── Selected Range Label ── */}
      <div className="flex items-center justify-center gap-2 pt-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 text-orange-400/70"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
          />
        </svg>
        <span className="text-xs font-medium text-zinc-400">{rangeLabel}</span>
      </div>
    </div>
  );
}
