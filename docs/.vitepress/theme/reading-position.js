import { readingTitle } from './reading-targets.js';
import { courseForPath, isResourcePath } from './course-experience.js';

export const READING_KEY = 'study-space-reading-v2';
export const READING_EVENT = 'study-space-reading-change';
const LEGACY_KEY = 'study-space-last-reading-v1';
const empty = () => ({ version: 2, latest: null, byCourse: {} });

// Only chapter URLs already registered by the site can become resume links.
export function validateReadingPosition(value) {
  if (!value || typeof value.path !== 'string' || !/^\/study-space\/[^?#\s]+\.html(?:#[^\s]*)?$/.test(value.path)) return null;
  const title = readingTitle(value.path);
  const course = courseForPath(value.path.split('#')[0]);
  if (!title || !course || isResourcePath(value.path)) return null;
  let hash = value.path.includes('#') ? value.path.slice(value.path.indexOf('#') + 1) : '';
  try { hash = decodeURIComponent(hash); } catch { return null; }
  if (/[\u0000-\u001f]/.test(hash)) return null;
  return {
    path: value.path.split('#')[0] + (hash ? '#' + encodeURIComponent(hash) : ''),
    title: String(value.title || title).slice(0, 240),
    section: hash ? String(value.section || '').slice(0, 240) : '',
    courseId: course.id,
    updatedAt: Number.isFinite(value.updatedAt) && value.updatedAt > 0 && value.updatedAt < 8640000000000000 ? value.updatedAt : null
  };
}

export function readReadingState(storage = typeof localStorage !== 'undefined' ? localStorage : null) {
  const state = empty();
  if (!storage) return state;
  try {
    const raw = storage.getItem(READING_KEY);
    if (raw !== null) {
      const parsed = JSON.parse(raw);
      if (parsed?.version !== 2) return state;
      state.latest = validateReadingPosition(parsed.latest);
      for (const [id, record] of Object.entries(parsed.byCourse || {})) {
        const valid = validateReadingPosition(record);
        if (valid?.courseId === id) state.byCourse[id] = valid;
      }
      return state;
    }
    // Read old chapter-level records once, without trusting their stored title or URL.
    const old = JSON.parse(storage.getItem(LEGACY_KEY));
    const valid = validateReadingPosition({ path: old?.path });
    if (valid) { state.latest = valid; state.byCourse[valid.courseId] = valid; }
  } catch { /* Storage can be unavailable in private or restricted browsers. */ }
  return state;
}

function announce() {
  if (typeof window !== 'undefined') window.dispatchEvent(new Event(READING_EVENT));
}
export function saveReadingPosition(record, storage = typeof localStorage !== 'undefined' ? localStorage : null) {
  const valid = validateReadingPosition(record);
  if (!storage || !valid) return false;
  try {
    const state = readReadingState(storage);
    state.latest = valid;
    state.byCourse[valid.courseId] = valid;
    storage.setItem(READING_KEY, JSON.stringify(state));
    announce();
    return true;
  } catch { return false; }
}
export function clearReadingPositions(storage = typeof localStorage !== 'undefined' ? localStorage : null) {
  if (!storage) return false;
  try {
    // An explicit empty v2 record also prevents a stale v1 record resurfacing.
    storage.setItem(READING_KEY, JSON.stringify(empty()));
    storage.removeItem(LEGACY_KEY);
    announce();
    return true;
  } catch { return false; }
}
