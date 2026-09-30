import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.resolve(projectRoot, 'dist');

if (!fs.existsSync(distDir)) {
  console.error('Error: dist directory does not exist. Run vite build first.');
  process.exit(1);
}

const baseHtmlPath = path.join(distDir, 'index.html');
const baseHtml = fs.readFileSync(baseHtmlPath, 'utf8');

// Load stories
const storyDataUrl = pathToFileURL(path.resolve(projectRoot, 'src/data/storyData.js')).href;
const { STORY_DATABASE } = await import(storyDataUrl);

function createHtmlPage({ title, description, canonicalUrl, ogType = 'article', bodyHtml }) {
  let html = baseHtml;

  // Replace Title
  html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);

  // Replace Description
  html = html.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${description}" />`);

  // Replace Canonical
  html = html.replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${canonicalUrl}" />`);

  // Replace OpenGraph & Twitter tags
  html = html.replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${title}" />`);
  html = html.replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${description}" />`);
  html = html.replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${canonicalUrl}" />`);
  html = html.replace(/<meta property="og:type" content=".*?" \/>/, `<meta property="og:type" content="${ogType}" />`);
  html = html.replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${title}" />`);
  html = html.replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${description}" />`);

  // Inject content into <div id="root"> and update noscript
  const wrappedContent = `
    <div class="prerendered-content" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      ${bodyHtml}
    </div>
  `;

  // Inject into root
  html = html.replace('<div id="root"></div>', `<div id="root">${wrappedContent}</div>`);

  // Also replace noscript with this page's content for non-JS bots
  html = html.replace(/<noscript>[\s\S]*?<\/noscript>/, `<noscript>${wrappedContent}</noscript>`);

  return html;
}

function savePage(routePath, htmlContent) {
  if (!routePath || routePath === '/' || routePath === '') {
    fs.writeFileSync(path.join(distDir, 'index.html'), htmlContent, 'utf8');
    return;
  }

  // 1. Directory index: dist/{routePath}/index.html (e.g. /privacy/ or /story/1/)
  const targetDir = path.join(distDir, routePath);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  fs.writeFileSync(path.join(targetDir, 'index.html'), htmlContent, 'utf8');

  // 2. Direct HTML: dist/{routePath}.html (e.g. /privacy or /story/1)
  // Prevents Cloudflare 308 redirect when requested without trailing slash!
  const directHtmlPath = path.join(distDir, `${routePath}.html`);
  const directHtmlDir = path.dirname(directHtmlPath);
  if (!fs.existsSync(directHtmlDir)) {
    fs.mkdirSync(directHtmlDir, { recursive: true });
  }
  fs.writeFileSync(directHtmlPath, htmlContent, 'utf8');
}

// 0. Main Landing Page (/)
const homeBody = `
  <div style="max-width: 1040px; margin: 2rem auto; padding: 0 1.25rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b; line-height: 1.7;">
    <header style="text-align: center; margin-bottom: 3rem; border-bottom: 2px solid #f1f5f9; padding-bottom: 2rem;">
      <h1 style="font-size: 2.3rem; color: #0f172a; margin: 0 0 1rem 0; font-weight: 800; letter-spacing: -0.02em;">
        오늘 어떤 한자 공부를 해볼까요?
      </h1>
      <p style="font-size: 1.2rem; color: #059669; font-weight: 700; margin: 0 0 0.5rem 0;">
        매일 10분! 스스로 익히는 급수 한자 교재 및 무료 A4 학습지 인쇄 서비스
      </p>
      <p style="font-size: 1.02rem; color: #64748b; margin: 0; max-width: 760px; margin: 0 auto; line-height: 1.6;">
        일일한자(11HANJA.COM)는 유아부터 초·중·고 학생, 성인 수험생까지 누구나 회원가입 없이 무료로 공인 급수별 배정한자 학습과 쓰기 연습, 인터랙티브 획순 시각화 및 맞춤형 인쇄 학습지를 제작할 수 있는 개방형 한자 교육 플랫폼입니다.
      </p>
    </header>

    <section style="margin-bottom: 3.5rem;">
      <h2 style="font-size: 1.45rem; color: #0f172a; border-left: 4px solid #059669; padding-left: 0.75rem; margin-bottom: 1.5rem;">
        🎯 일일한자 핵심 학습 서비스 바로가기
      </h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
        <div style="background: #ffffff; border: 2px solid #e2e8f0; border-radius: 16px; padding: 1.75rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
          <h3 style="font-size: 1.25rem; margin: 0 0 0.75rem 0; color: #059669;">📖 급수별 학습지 만들기</h3>
          <p style="color: #475569; font-size: 0.98rem; margin-bottom: 1.25rem; line-height: 1.6;">
            한국어문회, 대한검정회, 대한상공회의소의 8급부터 특급까지 배정한자를 선택하여 나만의 맞춤 A4 쓰기 노트를 3초 만에 생성하고 인쇄하세요.
          </p>
          <a href="/grade/8GR?board=uhmoon" style="display: inline-block; background: #059669; color: white; padding: 8px 16px; border-radius: 8px; text-decoration: none; font-weight: 600;">한국어문회 8급 시작하기 →</a>
        </div>
        <div style="background: #ffffff; border: 2px solid #e2e8f0; border-radius: 16px; padding: 1.75rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
          <h3 style="font-size: 1.25rem; margin: 0 0 0.75rem 0; color: #0284c7;">✍️ 한자 획순 애니메이션 연습</h3>
          <p style="color: #475569; font-size: 0.98rem; margin-bottom: 1.25rem; line-height: 1.6;">
            획순이 헷갈리는 한자를 붓의 움직임 그대로 SVG 애니메이션으로 확인하고, 가이드라인에 맞춰 마우스나 터치로 직접 써보며 필순을 완벽히 마스터합니다.
          </p>
          <a href="/stroke/8GR?board=uhmoon" style="display: inline-block; background: #0284c7; color: white; padding: 8px 16px; border-radius: 8px; text-decoration: none; font-weight: 600;">획순 연습 바로가기 →</a>
        </div>
        <div style="background: #ffffff; border: 2px solid #e2e8f0; border-radius: 16px; padding: 1.75rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
          <h3 style="font-size: 1.25rem; margin: 0 0 0.75rem 0; color: #7c3aed;">📝 단어·사자성어 맞춤 학습지</h3>
          <p style="color: #475569; font-size: 0.98rem; margin-bottom: 1.25rem; line-height: 1.6;">
            공부하고 싶은 단어나 고사성어를 직접 입력하면 A4 용지 36칸 전체 채움 가로쓰기 연습장 및 한 줄 쓰기 맞춤형 학습지를 즉시 출력합니다.
          </p>
          <a href="/custom" style="display: inline-block; background: #7c3aed; color: white; padding: 8px 16px; border-radius: 8px; text-decoration: none; font-weight: 600;">맞춤 단어 학습지 만들기 →</a>
        </div>
      </div>
    </section>

    <section style="margin-bottom: 3.5rem; background: #f8fafc; padding: 2rem; border-radius: 16px; border: 1px solid #e2e8f0;">
      <h2 style="font-size: 1.4rem; color: #0f172a; margin-top: 0; margin-bottom: 1rem;">
        🏛️ 국내 3대 한자 검정기관 급수 체계 완전 정복
      </h2>
      <p style="color: #334155; line-height: 1.8;">
        한국어 어휘의 다수를 차지하는 한자어(漢字語)는 초·중·고 학습 문해력의 근간입니다. 일일한자는 대한민국 공인 3대 검정기관의 급수 기준을 완벽 지원합니다.
      </p>
      <ul style="color: #475569; line-height: 1.8; margin-bottom: 1.5rem;">
        <li><strong>한국어문회 (5,978자):</strong> 국내에서 가장 권위 있고 깊이 있는 급수 시험으로 정자(正字) 위주의 쓰기 능력과 학술적 문해력을 기르는 데 최적화되어 있습니다.</li>
        <li><strong>대한검정회:</strong> 실생활에 자주 쓰이는 실용한자 위주로 구성되어 있어 유아 및 초등학생의 첫 급수 취득에 높은 성취도를 제공합니다.</li>
        <li><strong>대한상공회의소:</strong> 직장인, 대학생, 공기업 취업 및 승진 가산점에 특화된 실무 한자 시험 체계입니다.</li>
      </ul>
      <p style="color: #64748b; font-size: 0.95rem; margin: 0;">
        💡 8급(50자), 7급(150자), 6급(300자)부터 준4급, 4급, 3급, 2급, 1급, 특급까지 단계별 맞춤 인쇄지를 무료로 경험하세요.
      </p>
    </section>

    <section style="margin-bottom: 3.5rem;">
      <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1.25rem;">
        <h2 style="font-size: 1.4rem; color: #0f172a; border-left: 4px solid #059669; padding-left: 0.75rem; margin: 0;">
          📚 일일한자 추천 교육 칼럼 & 시험 가이드 (총 30편)
        </h2>
        <a href="/story" style="color: #059669; font-weight: 700; text-decoration: none; font-size: 0.95rem;">칼럼 전체보기 →</a>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1rem;">
        ${STORY_DATABASE.map(s => `
          <article style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.25rem;">
            <div style="font-size: 0.8rem; color: #059669; font-weight: 700; margin-bottom: 0.35rem;">제${s.id}편 • ${s.date}</div>
            <h3 style="font-size: 1.05rem; margin: 0 0 0.5rem 0; line-height: 1.4;">
              <a href="/story/${s.id}" style="color: #0f172a; text-decoration: none;">${s.title}</a>
            </h3>
            <p style="color: #64748b; font-size: 0.88rem; line-height: 1.5; margin: 0 0 0.75rem 0;">${s.summary}</p>
            <a href="/story/${s.id}" style="color: #0284c7; font-size: 0.88rem; font-weight: 600; text-decoration: underline;">칼럼 전문 읽기 →</a>
          </article>
        `).join('\n')}
      </div>
    </section>

    <section style="border-top: 1px solid #e2e8f0; padding-top: 2rem; margin-top: 3rem; text-align: center; color: #64748b; font-size: 0.95rem;">
      <p style="margin-bottom: 1rem;">
        <a href="/privacy" style="color: #0f172a; font-weight: 700; text-decoration: none; margin: 0 10px;">개인정보처리방침</a> |
        <a href="/about" style="color: #475569; text-decoration: none; margin: 0 10px;">서비스 소개</a> |
        <a href="/faq" style="color: #475569; text-decoration: none; margin: 0 10px;">자주 묻는 질문</a> |
        <a href="/contact" style="color: #475569; text-decoration: none; margin: 0 10px;">문의하기</a> |
        <a href="/story" style="color: #475569; text-decoration: none; margin: 0 10px;">한자 이야기 칼럼</a>
      </p>
      <p style="font-size: 0.85rem; color: #94a3b8; margin: 0;">
        © 2026 일일한자 (11HANJA.COM) - 매일 10분, 스스로 익히는 무료 급수 한자 학습지. All rights reserved.
      </p>
    </section>
  </div>
`;

savePage('', createHtmlPage({
  title: '일일한자 - 검정기관별 무료 급수 한자 학습지 만들기 & 획순 연습',
  description: '한국어문회·대한검정회·상공회의소 검정기관별 급수 한자학습, 쓰기, 획순 가이드 및 맞춤형 A4 학습지 인쇄까지 회원가입 없이 무료로 이용하세요.',
  canonicalUrl: 'https://www.11hanja.com/',
  ogType: 'website',
  bodyHtml: homeBody
}));

// 1. /privacy
const privacyBody = `
  <div style="max-width: 820px; margin: 2rem auto; padding: 0 1rem; line-height: 1.8; color: #334155;">
    <header style="border-bottom: 1px solid #e2e8f0; padding-bottom: 1.5rem; margin-bottom: 2rem;">
      <h1 style="font-size: 1.85rem; color: #0f172a; margin: 0 0 0.5rem 0;">개인정보처리방침</h1>
      <p style="color: #64748b; font-size: 0.9rem; margin: 0;">시행일자: 2026년 7월 31일 (최종 개정: 2026년 9월 3일)</p>
    </header>
    <section>
      <p><strong>일일한자 (11HANJA.COM)</strong>(이하 "서비스")는 이용자의 개인정보를 매우 중요하게 생각하며, 「개인정보 보호법」 및 관련 법령을 엄격히 준수하고 있습니다. 본 개인정보처리방침은 서비스가 이용자의 정보를 어떻게 다루고 안전하게 보호하는지 명확히 설명합니다.</p>
      <h2 style="font-size: 1.3rem; color: #0f172a; margin-top: 2rem; border-left: 4px solid #059669; padding-left: 0.75rem;">1. 개인정보 수집 항목 및 방법</h2>
      <p>본 서비스는 <strong>회원가입 및 로그인이 필요 없는 무료 공공 교육 서비스</strong>입니다.</p>
      <ul>
        <li><strong>기본 이용 시:</strong> 이름, 주민등록번호, 연락처, 이메일 등 어떠한 개인식별정보도 일체 요구하거나 데이터베이스에 수집·저장하지 않습니다.</li>
        <li><strong>이용자 문의 시:</strong> [문의하기] 양식을 통해 이용자가 직접 입력하는 이름, 이메일 주소, 문의 내용은 오직 고객 문의 처리 및 답변 발송 목적으로만 사용되며, 문의 처리가 완료된 후 지체 없이 안전하게 파기됩니다.</li>
      </ul>
      <h2 style="font-size: 1.3rem; color: #0f172a; margin-top: 2rem; border-left: 4px solid #059669; padding-left: 0.75rem;">2. 쿠키(Cookie) 및 서드파티 분석/광고 기술 운용 고지</h2>
      <p>서비스는 사이트 이용 행태 분석 및 무료 서비스 운영비 조달을 위해 제3자 서비스(Google AdSense, Microsoft Clarity)를 활용하고 있으며, 이 과정에서 브라우저 쿠키(Cookie)가 사용될 수 있습니다.</p>
      <ul>
        <li><strong>구글 애드센스 (Google AdSense):</strong> 구글을 포함한 제3자 광고 공급업체는 이용자가 본 웹사이트 또는 다른 웹사이트를 과거에 방문한 기록을 기반으로 맞춤형 광고를 게재하기 위해 쿠키를 사용합니다. 이용자는 <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer" style="color: #0284c7;">구글 광고 설정 페이지</a>를 방문하여 개인 맞춤형 광고 수신을 언제든지 차단 및 관리할 수 있습니다. 또한 <a href="https://www.aboutads.info/choices/" target="_blank" rel="noreferrer" style="color: #0284c7;">www.aboutads.info</a>를 통해 제3자 공급업체의 쿠키 사용을 선택 해제할 수 있습니다.</li>
        <li><strong>마이크로소프트 클레리티 (Microsoft Clarity):</strong> 웹사이트 사용성 개선(클릭 수, 스크롤 반응 등)을 위해 사용되며, 모든 행동 정보는 익명 처리되어 통계 목적으로만 집계됩니다.</li>
      </ul>
      <h2 style="font-size: 1.3rem; color: #0f172a; margin-top: 2rem; border-left: 4px solid #059669; padding-left: 0.75rem;">3. 쿠키의 설치/운영 및 거부 방법</h2>
      <p>이용자는 웹 브라우저의 옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 모든 쿠키의 저장을 거부할 수 있는 선택권을 가지고 있습니다.</p>
      <ul>
        <li><strong>Chrome:</strong> 웹브라우저 우측 상단 설정 → 개인정보 보호 및 보안 → 서드 파티 쿠키 차단</li>
        <li><strong>Edge:</strong> 설정 → 쿠키 및 사이트 권한 → 쿠키 및 사이트 데이터 관리 및 삭제</li>
        <li><strong>Safari:</strong> 환경설정 → 개인정보 보호 → 모든 쿠키 차단</li>
      </ul>
      <h2 style="font-size: 1.3rem; color: #0f172a; margin-top: 2rem; border-left: 4px solid #059669; padding-left: 0.75rem;">4. 개인정보의 보유 및 파기 절차</h2>
      <p>일일한자는 이용자의 계정이나 개인정보를 서버에 영구 보관하지 않습니다. 브라우저 내에서 선택하신 한자 목록이나 급수 설정 등은 사용자의 로컬 기기(LocalStorage)에만 일시 보관되며 언제든지 브라우저 캐시 삭제를 통해 제거할 수 있습니다.</p>
      <h2 style="font-size: 1.3rem; color: #0f172a; margin-top: 2rem; border-left: 4px solid #059669; padding-left: 0.75rem;">5. 개인정보 보호책임자 및 의견 수렴</h2>
      <p>서비스 이용 중 발생하는 개인정보 보호와 관련된 모든 문의는 온라인 문의 창구를 통해 신속하게 답변받으실 수 있습니다.</p>
      <div style="background: #f8fafc; padding: 1.25rem 1.5rem; border-radius: 12px; border: 1px solid #e2e8f0; margin-top: 1rem;">
        <p style="margin: 0; font-weight: 700; color: #0f172a;">일일한자 (11HANJA.COM) 운영팀</p>
        <p style="margin: 6px 0 0 0; color: #475569;">• 서비스 운영 및 개인정보 관리 책임: 일일한자 고객지원팀</p>
        <p style="margin: 4px 0 0 0; color: #475569;">• 온라인 문의: <a href="https://11hanja.com/contact" style="color: #059669; font-weight: 600;">[문의하기 페이지로 바로가기]</a></p>
        <p style="margin: 4px 0 0 0; color: #475569;">• 공식 웹사이트: https://11hanja.com</p>
      </div>
    </section>
  </div>
`;

savePage('privacy', createHtmlPage({
  title: '개인정보처리방침 - 일일한자 | 11HANJA.COM',
  description: '일일한자(11HANJA.COM)의 개인정보처리방침입니다. 이용자의 개인정보 보호 및 쿠키, 구글 애드센스 관련 처리 방침을 명확히 안내합니다.',
  canonicalUrl: 'https://www.11hanja.com/privacy',
  bodyHtml: privacyBody
}));

// 2. /about
const aboutBody = `
  <div style="max-width: 820px; margin: 2rem auto; padding: 0 1rem; line-height: 1.85; color: #334155;">
    <header style="border-bottom: 1px solid #e2e8f0; padding-bottom: 1.5rem; margin-bottom: 2rem;">
      <h1 style="font-size: 1.85rem; color: #0f172a; margin: 0 0 0.5rem 0;">일일한자 활용가이드 & 서비스 소개</h1>
      <p style="color: #64748b; font-size: 1.05rem; margin: 0;">"매일 10분, 부담 없는 한자 공부로 문해력의 기초를 세웁니다."</p>
    </header>
    <section>
      <h2 style="font-size: 1.3rem; color: #0f172a; border-left: 4px solid #059669; padding-left: 0.75rem;">1. 일일한자(11HANJA.COM)의 탄생 배경</h2>
      <p>한국어 어휘에서 한자가 차지하는 비중은 연구 결과에 따라 다르지만 상당히 높으며, 교과서 주요 학습 개념의 90% 이상은 <strong>한자어(漢字語)</strong>로 이루어져 있습니다. 하지만 많은 학생들이 비싼 학습지 구독료나 학원비, 복잡한 회원가입 절차 때문에 한자 학습의 진입 장벽을 느끼고 있습니다.</p>
      <p><strong>일일한자</strong>는 유아부터 초·중·고 학생, 국가공인 한자 자격증을 준비하는 성인 및 취업 준비생까지 <strong>누구나 아무런 조건 없이 100% 무료</strong>로 최고의 한자 학습 환경을 누릴 수 있도록 개발된 개방형 교육 웹 플랫폼입니다.</p>
      <h2 style="font-size: 1.3rem; color: #0f172a; margin-top: 2rem; border-left: 4px solid #059669; padding-left: 0.75rem;">2. 일일한자만의 4대 핵심 기능</h2>
      <ul>
        <li><strong>국내 3대 한자 검정기관 전면 호환:</strong> 한국어문회(5,978자), 대한검정회, 대한상공회의소의 급수 체계를 완벽 지원합니다.</li>
        <li><strong>단 3초 만에 생성되는 A4 인쇄 학습지:</strong> 내가 공부하고 싶은 한자나 단어를 골라 깔끔한 A4 맞춤 쓰기 노트를 바로 출력할 수 있습니다.</li>
        <li><strong>살아 움직이는 인터랙티브 획순 가이드:</strong> 붓의 획순을 생동감 넘치는 SVG 애니메이션으로 시각화하고 직접 손글씨로 따라 쓸 수 있습니다.</li>
        <li><strong>하루 5자 데일리 루틴 추천:</strong> '랜덤 5자' 추출 기능으로 매일 아침 가벼운 테스트지를 만들 수 있습니다.</li>
      </ul>
    </section>
  </div>
`;

savePage('about', createHtmlPage({
  title: '일일한자 활용가이드 & 서비스 소개 | 11HANJA.COM',
  description: '일일한자(11HANJA.COM)의 탄생 배경, 4대 핵심 기능 및 한자 학습 효과 극대화 비법을 상세히 소개합니다.',
  canonicalUrl: 'https://www.11hanja.com/about',
  bodyHtml: aboutBody
}));

// 3. /faq
const faqBody = `
  <div style="max-width: 820px; margin: 2rem auto; padding: 0 1rem; line-height: 1.8; color: #334155;">
    <header style="border-bottom: 1px solid #e2e8f0; padding-bottom: 1.5rem; margin-bottom: 2rem;">
      <h1 style="font-size: 1.85rem; color: #0f172a; margin: 0 0 0.5rem 0;">자주 묻는 질문 (FAQ)</h1>
      <p style="color: #64748b; font-size: 0.95rem; margin: 0;">일일한자 이용에 관해 가장 많이 문의해 주시는 질문들을 모았습니다.</p>
    </header>
    <section>
      <div style="background: #f8fafc; padding: 1.25rem 1.5rem; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 1.25rem;">
        <h2 style="font-size: 1.1rem; color: #0f172a; margin: 0 0 0.5rem 0;">Q. 일일한자의 모든 서비스는 정말 100% 무료인가요?</h2>
        <p style="margin: 0; color: #475569;">네, 일일한자는 회원가입이나 결제 없이 모든 급수의 한자 데이터 조회, 인터랙티브 획순 연습, PDF A4 학습지 생성 및 인쇄 기능을 무료로 제공합니다.</p>
      </div>
      <div style="background: #f8fafc; padding: 1.25rem 1.5rem; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 1.25rem;">
        <h2 style="font-size: 1.1rem; color: #0f172a; margin: 0 0 0.5rem 0;">Q. 출력한 학습지를 학교 수업이나 학원 교재로 사용해도 되나요?</h2>
        <p style="margin: 0; color: #475569;">네, 상업적 재판매를 제외한 공교육, 홈스쿨링, 학원 보충 학습용 출력 및 배포는 전면 허용됩니다. 출처(11HANJA.COM)가 표기된 상태로 자유롭게 사용해 주세요.</p>
      </div>
      <div style="background: #f8fafc; padding: 1.25rem 1.5rem; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 1.25rem;">
        <h2 style="font-size: 1.1rem; color: #0f172a; margin: 0 0 0.5rem 0;">Q. 한국어문회, 대한검정회, 상공회의소 중 어떤 기관을 선택해야 하나요?</h2>
        <p style="margin: 0; color: #475569;">초등학생이나 일반 공인 자격증은 한국어문회를 추천하며, 기초 한자 승급은 대한검정회, 직장인 실무 및 취업 가산점은 상공회의소를 선택하시면 좋습니다.</p>
      </div>
      <div style="background: #f8fafc; padding: 1.25rem 1.5rem; border-radius: 12px; border: 1px solid #e2e8f0;">
        <h2 style="font-size: 1.1rem; color: #0f172a; margin: 0 0 0.5rem 0;">Q. 학습지 인쇄 시 용지 크기나 여백 설정은 어떻게 해야 하나요?</h2>
        <p style="margin: 0; color: #475569;">A4 용지 세로 방향(Portrait)에 최적화되어 있습니다. 인쇄 창에서 [용지: A4], [여백: 기본 또는 없음], [배경 그래픽: 체크]를 선택하시면 가장 깔끔하게 출력됩니다.</p>
      </div>
    </section>
  </div>
`;

savePage('faq', createHtmlPage({
  title: '자주 묻는 질문(FAQ) - 일일한자 | 11HANJA.COM',
  description: '일일한자 무료 한자 학습지 이용법, 프린터 출력 요령, 급수 시험 준비 등 자주 묻는 질문과 답변 모음입니다.',
  canonicalUrl: 'https://www.11hanja.com/faq',
  bodyHtml: faqBody
}));

// 4. /contact
const contactBody = `
  <div style="max-width: 820px; margin: 2rem auto; padding: 0 1rem; line-height: 1.8; color: #334155;">
    <header style="border-bottom: 1px solid #e2e8f0; padding-bottom: 1.5rem; margin-bottom: 2rem;">
      <h1 style="font-size: 1.85rem; color: #0f172a; margin: 0 0 0.5rem 0;">문의하기 및 제안 접수</h1>
      <p style="color: #64748b; font-size: 0.95rem; margin: 0;">일일한자 서비스에 대한 의견, 오탈자 제보, 기능 개선 제안을 언제든 남겨주세요.</p>
    </header>
    <section>
      <div style="background: #f8fafc; padding: 1.5rem; border-radius: 12px; border: 1px solid #e2e8f0;">
        <h2 style="font-size: 1.2rem; color: #0f172a; margin: 0 0 0.75rem 0;">고객지원 및 운영팀 안내</h2>
        <p>• 서비스명: 일일한자 (11HANJA.COM)</p>
        <p>• 담당 부서: 일일한자 교육콘텐츠 및 기술지원팀</p>
        <p>• 접수 가능 내용: 한자 훈음 및 부수 오류 제보, 신규 급수 추가 건의, 제휴 및 교육 기관 단체 활용 문의</p>
        <p>• 처리 소요 시간: 접수 후 영업일 기준 24~48시간 이내 검토 및 회신</p>
      </div>
    </section>
  </div>
`;

savePage('contact', createHtmlPage({
  title: '문의하기 - 일일한자 | 11HANJA.COM',
  description: '일일한자 오류 제보, 한자 데이터 건의, 제휴 및 의견을 남겨주시면 정성껏 검토하겠습니다.',
  canonicalUrl: 'https://www.11hanja.com/contact',
  bodyHtml: contactBody
}));

// 5. /custom
const customBody = `
  <div style="max-width: 820px; margin: 2rem auto; padding: 0 1rem; line-height: 1.8; color: #334155;">
    <header style="border-bottom: 1px solid #e2e8f0; padding-bottom: 1.5rem; margin-bottom: 2rem;">
      <h1 style="font-size: 1.85rem; color: #0f172a; margin: 0 0 0.5rem 0;">단어·사자성어 맞춤 한자 학습지 만들기</h1>
      <p style="color: #64748b; font-size: 0.95rem; margin: 0;">원하는 단어를 입력하면 36칸 전체 채움 A4 가로쓰기 연습장 및 한 줄 쓰기 학습지가 즉시 생성됩니다.</p>
    </header>
    <section>
      <h2 style="font-size: 1.3rem; color: #0f172a; border-left: 4px solid #059669; padding-left: 0.75rem;">주요 지원 모드 안내</h2>
      <ul>
        <li><strong>단어 가로쓰기 (A4 36칸 전체 채움):</strong> 1행에 단어의 글자들을 나란히 배치하고, 2~6행 전체 30칸을 해당 글자들의 반복 쓰기 연습칸으로 100% 꽉 채웁니다.</li>
        <li><strong>글자별 한 줄 쓰기:</strong> 1행당 1글자씩 보기 1칸과 직접 쓰기 5칸을 배치하여 총 6글자를 한눈에 익힙니다.</li>
      </ul>
    </section>
  </div>
`;

savePage('custom', createHtmlPage({
  title: '단어·사자성어 맞춤 한자 학습지 만들기 - 일일한자 | 11HANJA.COM',
  description: '원하는 한자 단어나 사자성어를 직접 입력하여 36칸 A4 가로쓰기 연습장 및 한 줄 쓰기 맞춤 학습지를 무료로 생성하고 인쇄하세요.',
  canonicalUrl: 'https://www.11hanja.com/custom',
  bodyHtml: customBody
}));

// 6. /story
const storyListBody = `
  <div style="max-width: 840px; margin: 2rem auto; padding: 0 1rem; line-height: 1.8; color: #334155;">
    <header style="border-bottom: 1px solid #e2e8f0; padding-bottom: 1.5rem; margin-bottom: 2rem; text-align: center;">
      <h1 style="font-size: 2rem; color: #0f172a; margin: 0 0 0.75rem 0;">한자 이야기 & 교육 칼럼 (총 ${STORY_DATABASE.length}편)</h1>
      <p style="color: #64748b; font-size: 1.05rem; margin: 0;">한자 공부의 핵심 비법부터 재미있는 역사와 어원까지, 일일한자가 정성껏 전해드리는 유익한 칼럼 모음입니다.</p>
    </header>
    <section>
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        ${[...STORY_DATABASE].sort((a, b) => b.id - a.id).map(s => `
          <article style="background: white; border-radius: 12px; border: 1px solid #e2e8f0; padding: 1.5rem;">
            <div style="font-size: 0.85rem; color: #64748b; margin-bottom: 0.4rem;">제${s.id}편 • ${s.date}</div>
            <h2 style="font-size: 1.3rem; margin: 0 0 0.75rem 0;">
              <a href="/story/${s.id}" style="color: #0f172a; text-decoration: none;">${s.title}</a>
            </h2>
            <p style="color: #475569; margin: 0 0 1rem 0; font-size: 0.98rem; line-height: 1.6;">${s.summary}</p>
            <a href="/story/${s.id}" style="color: #059669; font-weight: 600; text-decoration: underline;">칼럼 전문 읽기 →</a>
          </article>
        `).join('\n')}
      </div>
    </section>
  </div>
`;

savePage('story', createHtmlPage({
  title: '한자 이야기 & 급수 시험 칼럼 - 일일한자 | 11HANJA.COM',
  description: '급수 한자 시험 대비 비법, 사자성어의 숨은 유래, 획순의 과학적 원리, 초등 한자 교육 가이드 등 일일한자가 들려주는 유익하고 흥미진진한 한자 칼럼 모음입니다.',
  canonicalUrl: 'https://www.11hanja.com/story',
  bodyHtml: storyListBody
}));

// 7. /story/1 ~ /story/30
for (const story of STORY_DATABASE) {
  const contentParagraphs = story.content.split('\n\n').map(p => {
    const lines = p.split('\n');
    const firstLine = lines[0];
    const restLines = lines.slice(1).join('\n');
    
    let headingHtml = '';
    let bodyText = p;
    
    if (firstLine.startsWith('### ')) {
      headingHtml = `<h3 style="font-size: 1.35rem; color: #0f172a; margin-top: 2rem; margin-bottom: 0.75rem; font-weight: 700;">${firstLine.replace('### ', '')}</h3>`;
      bodyText = restLines;
    } else if (firstLine.startsWith('## ')) {
      headingHtml = `<h2 style="font-size: 1.5rem; color: #0f172a; margin-top: 2.5rem; margin-bottom: 1rem; font-weight: 700;">${firstLine.replace('## ', '')}</h2>`;
      bodyText = restLines;
    }
    
    if (!bodyText.trim()) {
      return headingHtml;
    }

    if (bodyText.trim() === '---') {
      return `${headingHtml}<hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 2rem 0;" />`;
    }

    const formattedLines = bodyText.split('\n').map(line => {
      let formatted = line.split('**').map((part, i) => i % 2 === 1 ? `<strong style="color: #0f172a;">${part}</strong>` : part).join('');
      const trimmed = formatted.trim();
      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        return `<div style="padding-left: 1rem; margin-bottom: 0.35rem;">• ${trimmed.substring(2)}</div>`;
      }
      return formatted;
    }).join('<br/>');

    return `${headingHtml}<div style="margin-bottom: 1.5rem; line-height: 1.9; font-size: 1.1rem; color: #1e293b;">${formattedLines}</div>`;
  }).join('\n');

  const sourcesHtml = (story.sources && story.sources.length > 0) ? `
    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #0284c7; border-radius: 0 10px 10px 0; padding: 1.25rem 1.5rem; margin-top: 2.5rem; margin-bottom: 1rem;">
      <div style="font-weight: 700; color: #0369a1; font-size: 0.98rem; margin-bottom: 0.65rem;">
        📖 참고문헌 및 공식 출처 (References)
      </div>
      <ul style="margin: 0; padding-left: 1.2rem; color: #475569; font-size: 0.9rem; line-height: 1.8;">
        ${story.sources.map(src => `<li style="margin-bottom: 0.35rem;">${src}</li>`).join('')}
      </ul>
    </div>
  ` : '';

  const storyDetailBody = `
    <article style="max-width: 820px; margin: 2rem auto; padding: 0 1rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      <header style="border-bottom: 1px solid #e2e8f0; padding-bottom: 1.5rem; margin-bottom: 2rem;">
        <div style="display: inline-block; background: #e0f2fe; color: #0369a1; font-size: 0.85rem; font-weight: 600; padding: 4px 10px; border-radius: 6px; margin-bottom: 0.75rem;">
          한자 교육 & 칼럼 (제${story.id}편)
        </div>
        <h1 style="font-size: 1.85rem; color: #0f172a; margin: 0 0 1rem 0; line-height: 1.4;">${story.title}</h1>
        <div style="color: #64748b; font-size: 0.9rem;">
          <span>발행일: ${story.date}</span> • <span>작성: 일일한자 편집부</span>
        </div>
      </header>

      <div style="background: #f8fafc; border-left: 4px solid #059669; padding: 1.25rem 1.5rem; border-radius: 0 8px 8px 0; margin-bottom: 2rem; color: #334155; font-size: 1.05rem; line-height: 1.7;">
        <strong>요약:</strong> ${story.summary}
      </div>

      <section class="story-body">
        ${contentParagraphs}
      </section>

      ${sourcesHtml}
    </article>
  `;

  savePage(`story/${story.id}`, createHtmlPage({
    title: `${story.title} - 한자이야기 | 일일한자 | 11HANJA.COM`,
    description: story.summary,
    canonicalUrl: `https://www.11hanja.com/story/${story.id}`,
    bodyHtml: storyDetailBody
  }));
}

console.log(`Successfully generated static pre-rendered pages for all ${STORY_DATABASE.length} stories, home (/), privacy, about, faq, contact, custom, and story catalog!`);
