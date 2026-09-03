import { useEffect } from 'react';

export function useSeo(title, description) {
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
  }, [title, description]);
}
