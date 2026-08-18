// 한국 한자(정자체) 모양이 중국(hanzi-writer-data)과 다를 때, 
// 자체 제작한 로컬 데이터를 최우선으로 사용하기 위한 오버라이드 목록
const LOCAL_OVERRIDES = ['擧', '敎', '産', '直', '絲', '線', '給', '練', '終', '細', '純', '紀', '織', '玕'];

// 한국 전통 강희자전체에 대응하는 표준 CJK 획순 대체 매핑
const KANGXI_FALLBACK_MAP = {
  '淸': '清',
  '飮': '飲',
  '硏': '研',
  '鬪': '闘',
  '鄕': '郷',
  '槪': '概',
  '屛': '屏',
  '玆': '茲',
  '倂': '併',
  '揷': '挿',
  '鑛': '鉱'
};

export const loadHanziData = (rawChar, onComplete) => {
  if (!rawChar) {
    onComplete(null);
    return;
  }

  const char = rawChar.normalize('NFKC');

  // 로컬 오버라이드 대상이면 로컬 JSON을 즉시 사용
  if (LOCAL_OVERRIDES.includes(char) || LOCAL_OVERRIDES.includes(rawChar)) {
    const target = LOCAL_OVERRIDES.includes(char) ? char : rawChar;
    fetch(`/data/strokes-hw/${encodeURIComponent(target)}.json?v=18`)
      .then(res => res.json())
      .then(data => onComplete(data))
      .catch(err => {
        console.error('Failed to load local hanzi data for', target, err);
        onComplete(null);
      });
    return;
  }

  const primaryUrl = `https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0/${encodeURIComponent(char)}.json`;
  const fallbackUrl = `https://cdn.jsdelivr.net/npm/@k1low/hanzi-writer-data-jp@0.8.0/${encodeURIComponent(char)}.json`;

  fetch(primaryUrl)
    .then(res => {
      if (!res.ok) throw new Error('Primary not found');
      return res.json();
    })
    .then(data => onComplete(data))
    .catch(() => {
      fetch(fallbackUrl)
        .then(res => {
          if (!res.ok) throw new Error('Fallback not found');
          return res.json();
        })
        .then(data => onComplete(data))
        .catch(() => {
          // 강희자전 대체 자형이 존재하면 3차 시도
          const altChar = KANGXI_FALLBACK_MAP[rawChar] || KANGXI_FALLBACK_MAP[char];
          if (altChar) {
            fetch(`https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0/${encodeURIComponent(altChar)}.json`)
              .then(res => {
                if (!res.ok) return fetch(`https://cdn.jsdelivr.net/npm/@k1low/hanzi-writer-data-jp@0.8.0/${encodeURIComponent(altChar)}.json`);
                return res;
              })
              .then(res => {
                if (!res.ok) throw new Error('Alt not found');
                return res.json();
              })
              .then(data => onComplete(data))
              .catch(err => {
                console.warn('Failed to load alt hanzi data for', rawChar, err);
                onComplete(null);
              });
          } else {
            console.warn('Failed to load hanzi data for', rawChar);
            onComplete(null);
          }
        });
    });
};
