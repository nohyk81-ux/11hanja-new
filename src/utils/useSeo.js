import { useEffect } from 'react';

export function useSeo(title, description, options = {}) {
  useEffect(() => {
    // 타이틀 업데이트
    if (title) {
      const fullTitle = (title.includes('일일한자') || title.includes('11HANJA')) ? title : `${title} - 일일한자 | 11HANJA.COM`;
      document.title = fullTitle;

      // OG / Twitter 타이틀도 동기화
      const setMeta = (selector, value) => {
        const el = document.querySelector(selector);
        if (el) el.setAttribute('content', value);
      };
      setMeta('meta[property="og:title"]', fullTitle);
      setMeta('meta[name="twitter:title"]', fullTitle);
    }

    // 설명 업데이트
    if (description) {
      const setMeta = (selector, value) => {
        const el = document.querySelector(selector);
        if (el) el.setAttribute('content', value);
      };
      setMeta('meta[name="description"]', description);
      setMeta('meta[property="og:description"]', description);
      setMeta('meta[name="twitter:description"]', description);
    }

    // robots noindex 제어 (기능성 페이지를 씬 콘텐츠 판정으로부터 방어)
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (options.noindex) {
      if (!robotsMeta) {
        robotsMeta = document.createElement('meta');
        robotsMeta.name = 'robots';
        document.head.appendChild(robotsMeta);
      }
      robotsMeta.setAttribute('content', 'noindex, follow');
    } else {
      if (robotsMeta) {
        robotsMeta.setAttribute('content', 'index, follow');
      }
    }

    return () => {
      if (options.noindex) {
        const rMeta = document.querySelector('meta[name="robots"]');
        if (rMeta) rMeta.setAttribute('content', 'index, follow');
      }
    };
  }, [title, description, options.noindex]);
}
