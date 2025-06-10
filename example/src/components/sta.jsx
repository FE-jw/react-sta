import React, { useRef, useEffect, useState } from 'react';
import './sta.css';

export default function STA({
  tagName = 'div',
  delay,
  duration,
  distance,
  direction,
  children,
  ...rest
}) {
  const staRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // 커스텀 스타일 적용
  useEffect(() => {
    const el = staRef.current;
    if (!el) return;
    if (delay) el.style.setProperty('--sta-delay', `${delay / 1000}s`);
    if (duration) el.style.setProperty('--sta-duration', `${duration / 1000}s`);
    if (distance) el.style.setProperty('--sta-distance', `${distance}px`);
    if (direction) el.dataset.staDirection = direction;
  }, [delay, duration, distance, direction]);

  // IntersectionObserver 및 트랜지션 이벤트 처리
  useEffect(() => {
    const el = staRef.current;
    if (!el) return;

    const observer = new window.IntersectionObserver(entries => {
      if (entries[0].intersectionRatio <= 0) return;
      setIsVisible(true);
    });
    observer.observe(el);

    const handleTransitionEnd = () => {
      if (!isComplete) setIsComplete(true);
    };
    el.addEventListener('transitionend', handleTransitionEnd);

    return () => {
      observer.disconnect();
      el.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [isComplete]);

  const Tag = tagName;

  return (
    <Tag
      ref={staRef}
      className={`${isVisible ? 'sta-trigger' : ''} ${isComplete ? 'sta-complete' : ''}`}
      data-sta
      {...rest}
    >
      {children}
    </Tag>
  );
};