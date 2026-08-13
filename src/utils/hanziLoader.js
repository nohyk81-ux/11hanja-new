// 한국 한자(정자체) 모양이 중국(hanzi-writer-data)과 다를 때, 
// 자체 제작한 로컬 데이터를 최우선으로 사용하기 위한 오버라이드 목록
// 애니메이션(hanzi-writer)은 medians 데이터가 필수이므로 커스텀 생성이 어려워 임시로 비워둡니다.
const LOCAL_OVERRIDES = ['擧', '敎', '産', '直', '絲', '線', '給', '練', '終', '細', '純', '紀', '織'];

export const loadHanziData = (char, onComplete) => {
  // 로컬 오버라이드 대상이면 로컬 JSON을 즉시 사용
  if (LOCAL_OVERRIDES.includes(char)) {
    fetch(`/data/strokes-hw/${encodeURIComponent(char)}.json?v=18`)
      .then(res => res.json())
      .then(data => onComplete(data))
      .catch(err => {
        console.error('Failed to load local hanzi data for', char, err);
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
    .catch((err) => {
      console.warn(`Primary data not found for ${char}, trying fallback...`);
      fetch(fallbackUrl)
        .then(res => {
          if (!res.ok) throw new Error('Fallback not found');
          return res.json();
        })
        .then(data => onComplete(data))
        .catch(fallbackErr => {
          console.error('Failed to load hanzi data for', char, fallbackErr);
          onComplete(null);
        });
    });
};
