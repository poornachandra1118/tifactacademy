import React, { useEffect, useState } from 'react';

export default function Preloader() {
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHidden(true);
    }, 450);

    const removeTimer = setTimeout(() => {
      setRemoved(true);
    }, 1100);

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (removed) return null;

  return (
    <div id="preloader" className={hidden ? 'hide' : ''} aria-hidden="true">
      <div className="preload-ring">
        <i className="bi bi-heart-fill preload-heart"></i>
      </div>
      <div className="preload-text">LOADING HOPE&hellip;</div>
    </div>
  );
}
