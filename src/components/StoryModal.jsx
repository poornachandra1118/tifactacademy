import React, { useState, useRef, useEffect, useCallback } from 'react';
import { STORIES_DATA } from '../data/storiesData';

const { stories, modalTitle, modalSubtitle } = STORIES_DATA;
const TOTAL = stories.length;

export default function StoryModal({ isOpen, onClose }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const iframeRef = useRef(null);

  /* ── Reset to first slide & stop video whenever modal opens/closes ── */
  useEffect(() => {
    if (isOpen) {
      setActive(0);
      setPlaying(false);
    }
  }, [isOpen]);

  /* ── Stop video when the active slide changes ── */
  const stopVideo = useCallback(() => {
    if (iframeRef.current) {
      // Reload the src to force-stop playback
      // eslint-disable-next-line no-self-assign
      iframeRef.current.src = iframeRef.current.src;
    }
    setPlaying(false);
  }, []);

  const goTo = useCallback((idx) => {
    if (idx === active) return;
    stopVideo();
    setActive(idx);
  }, [active, stopVideo]);

  /* ── Close on Escape key ── */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const story = stories[active];
  const embedSrc = `https://www.youtube.com/embed/${story.videoId}?rel=0&modestbranding=1&enablejsapi=1`;

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        className="story-modal-backdrop"
        onClick={() => { stopVideo(); onClose(); }}
        role="presentation"
      />

      {/* ── Modal ── */}
      <div
        className="story-modal-wrap"
        role="dialog"
        aria-modal="true"
        aria-label={modalTitle}
      >
        <div className="story-modal-box" onClick={(e) => e.stopPropagation()}>

          {/* ── Header ── */}
          <div className="story-modal-header">
            <div>
              <h5 className="story-modal-title font-display fw-bold mb-0">
                <i className="bi bi-play-circle-fill me-2" style={{ color: 'var(--clr-primary)' }}></i>
                {modalTitle}
              </h5>
              <p className="story-modal-subtitle text-muted mb-0">{modalSubtitle}</p>
            </div>
            <button
              type="button"
              className="story-modal-close"
              onClick={() => { stopVideo(); onClose(); }}
              aria-label="Close stories"
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

          {/* ── Carousel Body ── */}
          <div className="story-modal-body">

            {/* ── Video / Thumbnail area ── */}
            <div className="story-video-wrap">
              {playing ? (
                <iframe
                  ref={iframeRef}
                  id={`story-iframe-${story.id}`}
                  title={story.videoLabel}
                  src={embedSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: 'block', borderRadius: '14px' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="story-thumb-wrap">
                  <img
                    src={story.thumbnail}
                    alt={story.thumbnailAlt}
                    className="story-thumb-img"
                  />
                  <button
                    type="button"
                    className="story-play-btn"
                    onClick={() => setPlaying(true)}
                    aria-label={`Play ${story.studentName}'s story`}
                  >
                    <i className="bi bi-play-fill"></i>
                  </button>
                  <div className="story-thumb-overlay" />
                </div>
              )}
            </div>

            {/* ── Story Info ── */}
            <div className="story-info">
              <blockquote className="story-quote">
                <i className="bi bi-quote story-quote-icon"></i>
                {story.quote}
              </blockquote>
              <div className="story-meta">
                <div className="story-meta-name fw-bold font-display">{story.studentName}</div>
                <div className="story-meta-role text-muted small">
                  {story.role} &mdash; <span style={{ color: 'var(--clr-primary)' }}>{story.company}</span>
                </div>
                <div className="story-meta-batch">
                  <i className="bi bi-mortarboard-fill me-1"></i>{story.batch}
                </div>
              </div>
            </div>

            {/* ── Dot Indicators (no arrows) ── */}
            <div className="story-dots" role="tablist" aria-label="Story slides">
              {stories.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Story ${i + 1}: ${s.studentName}`}
                  className={`story-dot${i === active ? ' active' : ''}`}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>

            {/* ── Slide counter ── */}
            <div className="story-counter text-muted small text-center">
              {active + 1} / {TOTAL}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
