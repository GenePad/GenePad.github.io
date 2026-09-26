/* 한국어 사전: key는 zh 기준과 일대일 대응; i18n.tsx에서 가져옴. */
import type { ReactNode } from "react";
import type { TKey } from "../i18n";

const ko: Record<TKey, ReactNode> = {
  // Nav
  "nav.workbench": "워크벤치",
  "nav.daynight": "라이트 & 다크",
  "nav.sanger": "Sanger 트레이스",
  "nav.toolbox": "도구 상자",
  "nav.download": "다운로드",
  "nav.library": "파일 라이브러리",
  "nav.ngs": "NGS 뷰어",
  "nav.tutorial": "튜토리얼",
  "nav.docs": "개발자 문서",
  "nav.projects": "프로젝트",
  "nav.stats": "실시간 통계",
  "nav.cta": "무료 다운로드 / 업그레이드",
  "nav.lang": "EN",

  // 페이지 제목
  "title.home": "GenePad - 가벼운 크로스 플랫폼 유전자 지도 편집기",
  "title.library": "파일 라이브러리 - GenePad | 플라스미드 파일 검색 및 관리",
  "title.ngs": "NGS 뷰어 - GenePad | FASTQ 데이터 조회 및 라이브러리 풍도 분석",
  "title.tutorial": "튜토리얼 - GenePad | AI 설정 · 파일 라이브러리 · NGS 분석",
  "title.tutorial.ai": "AI 설정 튜토리얼 - GenePad | DeepSeek API 키 발급 및 저장",
  "title.tutorial.library": "파일 라이브러리 튜토리얼 - GenePad | 플라스미드 가져오기, 검색 및 AI 태그",
  "title.tutorial.ngs": "NGS 분석 튜토리얼 - GenePad | fastq.gz 조회 및 풍도 리포트",
  "title.tutorial.lang": "원하는 언어 사용 튜토리얼 - GenePad | AI로 언어 팩 번역하기",
  "title.tutorial.langpack": "UI 언어 설정 튜토리얼 - GenePad | 내장 언어와 공식 언어 팩",
  "title.projects": "프로젝트 - GenePad | 플라스미드 파트 라이브러리 및 코돈 지도",
  "title.tech": "개발자 문서 - GenePad",
  "title.stats": "실시간 통계 - GenePad | 공개 사용 통계",

  // Hero
  "hero.badge": "무료 공개 베타",
  "hero.badgeEn": "Free Beta · Cross-platform",
  "hero.titleCn": "유전자 지도 편집기",
  "hero.titleEn": "크로스 플랫폼",
  "hero.desc":
    "일상적인 분자 클로닝을 위한 크로스 플랫폼 유전자 지도 편집기입니다. 플라스미드 맵 열람·편집, 서열 주석 관리, 제한효소 부위 분석, Sanger 시퀀싱 트레이스 비교로 클로닝 설계부터 결과 검증까지의 전 과정을 지원합니다.",
  "hero.download": "무료 다운로드 / 업그레이드",
  "hero.tour": "인터페이스 살펴보기",
  "hero.features": "MAP · ANNOTATION · ENZYME · PRIMER · TRACE",
  "hero.platforms": "지원 플랫폼",

  // Workbench
  "wb.eyebrow": "Workbench",
  "wb.title": <>맵·서열·분석을 한데 모은 워크벤치</>,
  "wb.lead":
    "맵 열람, 서열 편집, 제한효소 부위 확인, 단백질 속성 계산이 하나의 화면에 통합되어 있으며, 각 뷰는 선택한 객체에 따라 연동해 위치를 맞춥니다.",
  "wb.1.name": "플라스미드 맵",
  "wb.1.desc":
    "원형 맵과 선형 맵을 한 번의 클릭으로 전환할 수 있습니다. 프로모터, CDS, 복제 시작점, poly(A) 신호 등의 요소가 카테고리별로 색상 구분되고 라벨이 자동으로 겹침을 피해 배치되어, 요소가 많은 벡터에서도 맵을 선명하게 읽을 수 있습니다.",
  "wb.2.name": "맵 → 서열",
  "wb.2.desc":
    "주석 표에서 항목을 선택하면 서열 뷰가 해당 염기 구간으로 이동하고, 선택 영역 길이, GC 함량, Tm 값이 함께 표시됩니다. 맵과 서열은 양방향으로 연동됩니다.",
  "wb.3.name": "제한효소 부위",
  "wb.3.desc":
    "제한효소 부위는 이중가닥 서열 위에 직접 표시되며, 마우스를 올리면 인식 서열, 가닥 방향, 절단 위치를 확인할 수 있습니다. 5′ 접착 말단도 명확히 표시되어 클로닝 설계를 빠르게 검증할 수 있습니다.",
  "wb.4.name": "단백질 속성",
  "wb.4.desc":
    "CDS를 선택하면 분자량, 등전점, GRAVY, 지방족 지수, 소광계수가 실시간으로 계산됩니다. 등전점은 19가지 알고리즘이 내장되어 비교할 수 있으며, 기본적으로 문헌에서 권장하는 알고리즘의 결과를 표시합니다.",

  // DayNight
  "dn.eyebrow": "Light & Dark",
  "dn.title": (
    <>
      라이트와 다크 테마,
      <br />
      긴 작업 시간을 위해 설계되었습니다
    </>
  ),
  "dn.lead":
    "하나의 연구용 인터페이스에 완결된 두 가지 배색을 제공합니다. 밝은 테마는 프로젝션, 프레젠테이션, 주간 환경에 적합하고, 어두운 테마는 야간 장시간 사용의 시각적 피로를 줄여 줍니다.",
  "dn.day": "DAY",
  "dn.night": "NIGHT",
  "dn.state.day": "▸ LIGHT THEME — 밝은 테마 실행 중",
  "dn.state.night": "▸ DARK THEME — 어두운 테마 실행 중",
  "dn.caption.day": "DAY MODE — 밝은 테마에서 본 동일 벡터의 전체 맵",
  "dn.caption.night": "NIGHT MODE — 맵, 서열, 제한효소 부위의 다크 테마 렌더링",
  "dn.alt.day": "GenePad 밝은 테마",
  "dn.alt.night": "GenePad 어두운 테마",

  // Sanger
  "sg.eyebrow": "Sanger Trace",
  "sg.title": (
    <>
      Sanger 시퀀싱 결과와 참조 서열을
      <br />
      염기 단위로 정렬
    </>
  ),
  "sg.lead":
    "AB1 파일을 가져오면 크로마토그램, 리드, 참조 서열이 염기 단위로 정렬되고, 결과에 정렬 일치율과 E-value가 함께 표시되어 각 시퀀싱 반응의 품질과 불일치 위치를 바로 판단할 수 있습니다.",
  "sg.badge.format": "AB1 트레이스",
  "sg.shot1": "2KB-RCA-F — 트레이스가 참조 서열과 염기 단위로 정렬됨",
  "sg.shot2": "TOP STRAND — 불일치 위치가 빨간색으로 표시됨",

  // Toolbox
  "tb.eyebrow": "Toolbox",
  "tb.title": <>종합 도구 상자</>,
  "tb.lead":
    "서열을 선택하면 우클릭 메뉴에서 바로 겔 전기영동 시뮬레이션과 sgRNA 디자인을 실행할 수 있습니다. 전역 도구 상자에는 AI 어시스턴트와 유전자 파일 라이브러리가 제공되며, 다국어 인터페이스와 'Open with' 지원으로 기존 워크플로와의 연동도 쉽습니다.",
  "tb.groupA": "컨텍스트 메뉴",
  "tb.groupB": "전역 도구 상자",
  "tb.groupC": "개방성",
  "tb.c1.name": "DNA 겔 시뮬레이션",
  "tb.c1.desc":
    "서열을 선택한 뒤 우클릭 메뉴에서 겔 전기영동 시뮬레이션을 실행하면 아가로스 겔의 밴드 위치를 미리 볼 수 있습니다. Trans2K® 등 주요 분자량 마커가 내장되어 있어 실험 전에 전기영동 결과를 예측할 수 있습니다.",
  "tb.c2.name": "단백질 겔 시뮬레이션",
  "tb.c2.desc":
    "SDS-PAGE 시뮬레이션: CDS나 아미노산 구간을 선택해 시료를 로드하면 PageRuler 등 사전 염색 분자량 마커를 기준으로 밴드 위치가 실시간 계산됩니다.",
  "tb.c3.name": "CRISPR sgRNA 디자인",
  "tb.c3.desc":
    "SpCas9, xCas9, Cas12a/b, TnpB 등 12가지 인식 레이아웃을 지원하며, PAM 방향, 시드 영역 길이, 오프타겟 필터를 모두 설정할 수 있습니다. 후보 서열은 한 번의 클릭으로 맵에 주석으로 표시할 수 있습니다.",
  "tb.t1.name": "AI 어시스턴트",
  "tb.t1.desc":
    "현재 파일의 서열, 주석, 프라이머를 직접 읽고 쓸 수 있습니다. feature 추가, Tm 계산, 단백질 번역, ORF 예측 같은 작업을 자연어 명령으로 수행할 수 있습니다.",
  "tb.t2.name": "유전자 파일 라이브러리",
  "tb.t2.desc":
    "연 적 있는 벡터 파일이 자동으로 색인되고, AI가 일괄로 성질 태그를 생성하며, 감시 폴더를 지원합니다. 파일 이름을 외울 필요 없이 플라스미드 속성으로 파일을 검색해 찾을 수 있고, AI 어시스턴트로도 검색할 수 있습니다. 색인만 생성할 뿐 원본 파일은 수정하지 않습니다.",
  "tb.o1.name": "다국어",
  "tb.o1.desc":
    "중국어, 영어, 일본어, 프랑스어, 독일어, 러시아어 인터페이스가 내장되어 있습니다. 언어 팩을 내보낼 수 있고, AI 번역 지원으로 사용자 지정 언어를 추가할 수도 있습니다.",
  "tb.o2.name": "Open with",
  "tb.o2.desc":
    "내장된 'Open with' 기능으로 파일을 SnapGene, VS Code 또는 기타 지정한 도구에 한 번의 클릭으로 넘길 수 있습니다. 기존 워크플로와 함께 작동하며 파일 사용 방식을 제한하지 않습니다.",
  "tb.more": "자세히 보기",

  // 홈페이지 유전자 파일 라이브러리 추천 섹션
  "lp.lead":
    "유전자 파일 라이브러리는 여러 폴더에 흩어져 저장된 플라스미드 파일을 검색 가능한 단일 색인으로 통합하고, 프로젝트별, 저장 경로별, AI 생성 태그별 세 가지 방식으로 관리할 수 있습니다. 파일 이름이나 경로를 외울 필요 없이 한두 가지 속성 특징만으로 AI가 검색해 찾아 줍니다.",
  "lp.c1": "프로젝트 · 경로 · 태그",
  "lp.c2": "AI 자동 태그 생성",
  "lp.c3": "자연어 검색",
  "lp.c4": "감시 폴더 자동 색인",
  "lp.safe": "색인만 생성하며 원본 파일은 수정하지 않습니다",
  "lp.cta": "자세히 보기",

  // Download
  "dl.eyebrow": "Download · 설치 / 업그레이드",
  "dl.title": (
    <>
      데스크톱과 모바일을 아우르는
      <br />
      전 플랫폼 클라이언트
    </>
  ),
  "dl.lead":
    "Windows, macOS, Linux 데스크톱과 Android 모바일을 지원하며, 모든 플랫폼에서 동일한 기능을 제공합니다. 처음 사용하는 경우 설치 패키지를 내려받아 설치하면 되고, 이미 설치한 사용자는 최신 버전을 내려받아 덮어쓰기 설치만으로 업그레이드할 수 있습니다. 구버전을 제거할 필요는 없습니다.",
  "dl.note.desktop": "데스크톱",
  "dl.note.linuxX64": "데스크톱 · x86_64",
  "dl.note.mobile": "모바일",
  "dl.note.soon": "곧 제공 예정",
  "dl.upgradeNote":
    "GenePad가 이미 설치되어 있나요? 최신 설치 패키지를 내려받아 기존 버전 위에 설치하면 업그레이드가 완료됩니다. 구버전을 제거할 필요 없이, 새 사용자는 내려받은 뒤 안내에 따라 설치하면 됩니다.",
  "dl.cmdTitle.recommended": "명령줄 설치 / 업그레이드 (권장)",
  "dl.cmdTitle.plain": "명령줄 설치 / 업그레이드",
  "dl.cmd.brewLabel": "macOS · Homebrew",
  "dl.cmd.npmLabel": "Linux · npm",
  "dl.cmd.npmLabelMac": "macOS · npm",
  "dl.cmd.note": "위 명령을 복사해 터미널에 붙여 넣고 실행하세요.",
  "dl.cmd.scriptLabel": "Linux · 원클릭 설치 / 업그레이드 스크립트",
  "dl.cmd.scriptLabelMac": "macOS · 원클릭 설치 / 업그레이드 스크립트",
  "dl.cmdTab.script": "원클릭 스크립트",
  "dl.cmdTab.npm": "npm",
  "dl.cmd.recommendedTag": "권장",
  "dl.or.linux": "또는 설치 패키지를 직접 다운로드",
  "dl.ai.title": "AI 지원 설치 / 업그레이드",
  "dl.ai.desc":
    "macOS 설치 패키지는 서명되어 있지 않아 수동 설치 절차가 여러 단계입니다. 아래 프롬프트를 AI 어시스턴트(Kimi, ChatGPT 등)에 복사해 붙여 넣으면, 안내에 따라 단계별로 설치를 완료할 수 있습니다.",
  "dl.ai.prompt": `macOS에서 "GenePad"라는 애플리케이션 설치를 도와 주세요. 다음 방법을 순서대로 시도하고, 하나라도 성공하면 거기서 멈춰 주세요:
1. 권장: 공식 원클릭 설치 스크립트를 실행합니다(Homebrew를 자동 감지·설치하고 네트워크 상황에 따라 중국 내 미러로 전환합니다). 반드시 -q 옵션을 붙여 주세요. 스크립트는 기본적으로 종료 시 Enter 입력을 기다리는데, -q를 붙이면 이 대기를 건너뛰어 무인 실행에 적합합니다:
   curl -fsSL https://genepad.cn/release/install.sh | bash -s -- -q
   설치가 끝나면 open -a GenePad를 실행합니다.
2. 대안: Homebrew로 설치합니다(자동으로 '응용 프로그램'에 추가됨):
   brew install genepad/tap/genepad
   설치가 끝나면 open -a GenePad를 실행합니다. Homebrew가 설치되어 있지 않다면 먼저 설치합니다:
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
3. 세 번째 방법: npm으로 설치합니다(명령줄 실행 방식). 가능하다면 ~/Applications에도 복사해 '응용 프로그램'과 런치패드에 표시되게 합니다:
   npm install -g @genepad/app
   mkdir -p ~/Applications && cp -R "$(npm root -g)/@genepad/darwin-arm64/GenePad.app" ~/Applications/
   그다음 open -a GenePad를 실행합니다(또는 명령줄에서 genepad 실행).
4. 수동 방법(최후 수단): 이 앱은 서명되어 있지 않아 브라우저로 내려받은 파일은 Gatekeeper가 '손상됨'으로 표시하므로, curl로 내려받고 로컬에서 서명합니다. 먼저 https://genepad.cn/update.json 에서 최신 버전 번호를 읽고(VERSION이라고 부릅니다, 예: 0.7.1), 해당 버전의 .app.tar.gz를 내려받아 압축을 풀어 설치합니다:
   curl -L -o /tmp/gene-pad-app.tar.gz "https://genepad.cn/release/mac/GenePad_\${VERSION}_Darwin_arm64.app.tar.gz"
   mkdir -p /tmp/gene-pad-extract && tar -xzf /tmp/gene-pad-app.tar.gz -C /tmp/gene-pad-extract
   mv "/tmp/gene-pad-extract/GenePad.app" /Applications/
   xattr -cr "/Applications/GenePad.app"
   codesign --force --deep --sign - "/Applications/GenePad.app"
   open "/Applications/GenePad.app"

⚠️ 주의: 위 방법은 동작하지 않거나 오래되었을 수 있습니다. 어느 단계를 완료할 수 없다면, 스스로 다른 실행 가능한 방법(예: Gatekeeper를 우회하는 다른 방식, 또는 다른 압축 해제·서명 도구 사용)으로 바꾸어 시도하세요. 위 다운로드 링크에 접근할 수 없을 때에만 공식 사이트 https://genepad.cn을 방문하세요. 공식 사이트는 다른 다운로드 링크만 제공하며 설치 지원은 제공하지 않습니다.`,
  "dl.mac.other": "기타 설치 / 업그레이드 방법 (Homebrew / npm / AI 지원 / 설치 패키지 직접 다운로드)",
  "dl.mac.unsigned":
    "서명 미비 안내: 브라우저로 직접 내려받은 .dmg / .app 파일은 Gatekeeper가 '손상됨'으로 표시합니다. 우클릭 → '열기'로 실행하거나 xattr -cr을 실행해 격리 속성을 제거하세요. 위의 명령줄 설치 / 업그레이드 방식을 이용하는 것을 권장합니다.",
  "dl.copy": "복사",
  "dl.copied": "복사됨 ✓",
  "dl.filesTitle": "설치 패키지 직접 다운로드",
  "lb.close": "닫기",
  "lb.prev": "이전",
  "lb.next": "다음",
  "dl.source.direct": "직접 다운로드",
  "dl.source.gitee": "Gitee",
  "dl.source.github": "GitHub",
  "dl.giteeBadge": "중국 가속",
  "dl.arch.x64": "x86_64",
  "dl.arch.arm64": "ARM64",
  "dl.spark": "Spark Store",
  "dl.sparkNote": "중국산 Linux 배포판 사용자는 Spark Store를 통해서도 앱을 설치하거나 업그레이드할 수 있습니다",
  "dl.releases": "전체 버전 (GitHub Releases)",
  "dl.releasesGitee": "전체 버전 (Gitee 미러)",
  "dl.licenseTag": "LICENSE",
  "dl.license":
    "GenePad Free는 개인 평가와 학습에 무료이며, 일상적인 맵 열람, 편집, 저장을 포괄합니다. 상업적 이용은 추후 발표될 GenePad Pro 라이선스로 지원될 예정입니다.",
  "dl.license.academic":
    "학술 무료 라이선스: 2026년부터 2027년 12월 31일까지, 대학, 병원 연구실, iGEM 참가자, 연구자, 학생 등 학술 사용자는 이 프로그램을 내려받는 것만으로 자동으로 무료 사용 권한을 얻으며, 신청이나 GenePad 팀과의 연락이 필요 없습니다. 이 권한은 학술 연구 목적에 한정되며 상업적 이용에는 사용할 수 없습니다.",

  // Footer
  "ft.blurb":
    "일상적인 분자 클로닝을 위해 만들어진 가볍고 크로스 플랫폼 유전자 지도 편집기입니다. 문제와 제안을 보내 주신 모든 사용자에게 감사드립니다.",
  "ft.col.download": "다운로드",
  "ft.col.support": "피드백 및 지원",
  "ft.col.more": "더 보기",
  "ft.giteeMirror": "Gitee 미러",
  "ft.changelog": "변경 로그",
  "ft.docs": "개발자 문서",
  "ft.projects": "프로젝트",
  "ft.library": "유전자 파일 라이브러리",
  "ft.ngs": "NGS 데이터 뷰어",
  "ft.sponsor": "개발자 후원",
  "ft.copyright": "© 2026 GENEPAD — MADE FOR THE BENCH",

  // 하위 페이지 공용
  "sub.back": "홈으로 돌아가기",

  // 기술 지원 페이지
  "ts.eyebrow": "Developer Docs",
  "ts.title": "파일 형식 개발 문서",
  "ts.lead":
    "읽기, 변환, 가져오기 프로그램을 직접 개발하려는 개발자를 위한 문서입니다. GenePad가 사용하는 .gen, .gjson 형식과 SnapGene .dna 변환 방안은 별도 페이지로 나뉘어 있어 구현 세부 사항을 빠르게 찾을 수 있습니다.",
  "ts.group.formats": "파일 형식",
  "ts.group.formatsEn": "FILE FORMATS",
  "ts.group.code": "코드 예제",
  "ts.group.codeEn": "CODE SAMPLES",
  "ts.gen.title": ".gen 파일 정의",
  "ts.gen.desc":
    "SQLite 3 프로젝트 파일: 14개 테이블 정의 전체, 필드 의미, 좌표 규칙, 편집 이력 트리, 청킹과 실행 취소 메커니즘. 읽고 나면 .gen을 직접 읽고 쓸 수 있습니다.",
  "ts.gjson.title": ".gjson 파일 정의",
  "ts.gjson.desc":
    "JSON 교환 형식: 최상위 필드, 각 객체 정의, .gen과의 정합성 차이. 읽고 나면 .gjson을 파싱할 수 있습니다.",
  "ts.dna.title": ".dna 변환 방안",
  "ts.dna.desc":
    "SnapGene .dna 바이너리 패킷 구조, flags 비트, 필드 매핑, 0-based↔1-based 좌표 변환.",
  "ts.rust.title": "Rust 읽기 예제",
  "ts.rust.desc":
    "rusqlite로 .gen을, serde_json으로 .gjson을 읽는 최소 실행 구현. 의존성과 예상 출력 포함.",
  "ts.readDoc": "문서 읽기",
  "ts.feedback":
    "필요한 내용이 문서에 없다면 GitHub 또는 Gitee에서 Issue를 등록해 주세요. 보완하겠습니다.",

  // 프로젝트 페이지
  "pr.eyebrow": "Ecosystem Projects",
  "pr.title": "GenePad 생태계 프로젝트",
  "pr.lead":
    "분자 클로닝 툴체인을 중심으로 GenePad 조직은 GitHub에서 여러 독립 프로젝트를 관리합니다. 출처를 추적할 수 있는 플라스미드 공통 요소 라이브러리부터 조직 특이적 코돈 사용 통계 파이프라인까지, 각 프로젝트는 메인 프로그램과 독립적이며 따로 가져다 쓸 수 있습니다. 연구자와 개발자의 반복 작업을 줄이는 것이 목표입니다.",
  "pr.specs": "데이터 사양",
  "pr.cf.head": "플라스미드 공통 요소 라이브러리",
  "pr.cf.title": "플라스미드 구축용 공통 요소 서열 라이브러리",
  "pr.cf.desc":
    "NCBI 소스 참조 플라스미드에서 항목별로 정리하고 검증한 재사용 가능한 요소 서열 라이브러리입니다. 모든 요소에 NCBI 액세션 번호와 참조 플라스미드 이름이 기록되어 있어 각 서열의 출처를 항목 단위로 추적할 수 있습니다. 플라스미드 소프트웨어로 가져온 뒤 맵을 열면 이러한 공통 요소가 자동으로 인식됩니다.",
  "pr.cf.catsTitle": "20개 카테고리 커버",
  "pr.cf.usage":
    "genbank/ 아래의 .gb 파일을 SnapGene이나 Benchling의 common features 라이브러리로 가져오면, 어떤 플라스미드 맵을 열어도 이 요소들이 자동 주석됩니다. fasta/ 아래의 .fa 파일은 BLAST 비교에 바로 쓸 수 있습니다.",
  "pr.ca.head": "조직 특이적 코돈 지도",
  "pr.ca.title": "인간 조직 특이적 코돈 지도",
  "pr.ca.desc":
    "독자적으로 구현한 통계 파이프라인: 공개된 GTEx 유전자 발현과 GENCODE 주석을 입력으로 사용하고 조직 발현량으로 가중치를 부여해, 인체 조직마다 코돈 사용 표를 재구축합니다. 코돈 최적화와 이종 발현 설계를 위한 재현 가능하고 검증 가능한 조직 특이적 참조를 제공하며, 라이선스 제한이 있는 서드파티 완성표에 의존하지 않습니다.",
  "pr.ca.metricsTitle": "출력 지표",
  "pr.ca.usage":
    "python scripts/build_atlas.py가 GTEx / GENCODE 입력으로 모든 조직 표를 재구축하며, check_release.py와 package_release.py가 릴리스 전 검증과 패키징을 담당합니다.",
  "pr.org.text":
    "위 프로젝트는 GenePad 메인 프로젝트에서 시작되어 같은 기준으로 관리됩니다. 소스 코드와 진행 상황은 GitHub 조직 페이지에서 확인할 수 있으며, Issue 피드백을 환영합니다.",

  // 라이브러리 페이지 (유전자 파일 라이브러리 홍보 페이지)
  "lib.eyebrow": "Gene File Library",
  "lib.title": (
    <>
      플라스미드 파일의
      <br />
      통합 검색과 관리
    </>
  ),
  "lib.lead":
    "과제가 쌓이면서 플라스미드 파일은 여러 폴더, 디스크, 기기에 흩어지기 쉽고, 파일 이름과 플라스미드 속성 사이에는 대응 관계가 없습니다. 유전자 파일 라이브러리는 흩어진 플라스미드 파일을 검색 가능한 통합 색인으로 묶고, 프로젝트별, 저장 경로별, AI 생성 태그별 세 가지 관리 방식을 지원합니다. 구체적인 이름과 경로를 외울 필요 없이 한두 가지 속성 특징만으로 AI가 검색해 찾아 줍니다.",
  "lib.hero.shot": "LIBRARY — 331개 플라스미드 색인 완료, 오른쪽은 라이브러리 전체 태그 클라우드",

  "lib.pain.head": "흔한 문제",
  "lib.pain.headEn": "COMMON ISSUES",
  "lib.pain.title": "플라스미드 파일 관리의 흔한 어려움",
  "lib.pain.1.name": "끝없이 늘어나는 규모",
  "lib.pain.1.desc":
    "과제가 진행됨에 따라 플라스미드는 수십 개에서 수백 개로 불어나고 폴더 계층은 날이 갈수록 깊어져, 디렉터리 구조만으로는 대상 파일을 찾기 어렵습니다.",
  "lib.pain.2.name": "저장 위치를 떠올리기 어려움",
  "lib.pain.2.desc":
    "같은 플라스미드가 서로 다른 폴더, 디스크, 기기에 저장되어 있을 수 있습니다. 필요할 때 정확한 위치를 알 수 없는 경우가 많습니다.",
  "lib.pain.3.name": "파일 이름과 속성의 단절",
  "lib.pain.3.desc":
    "검색 의도는 보통 속성 묘사('특정 유전자를 운반하는 벡터')로 표현되지만, pLH-sgRNA1-Muc4-11 같은 파일 이름은 플라스미드의 성질을 반영하지 않아 둘 사이에 대응 관계가 없습니다.",

  "lib.ways.head": "세 가지 관리 방식",
  "lib.ways.headEn": "THREE WAYS TO ORGANIZE",
  "lib.ways.title": "프로젝트, 경로, 태그 — 세 가지 정리 차원",
  "lib.ways.1.name": "프로젝트별 분류",
  "lib.ways.1.desc":
    "새 프로젝트를 만들고 플라스미드를 끌어다 놓으면 분류가 끝납니다. 하나의 과제가 하나의 프로젝트에 대응하며, 프로젝트를 열면 해당 과제의 모든 플라스미드를 볼 수 있습니다.",
  "lib.ways.2.name": "저장 경로별",
  "lib.ways.2.desc":
    "아무 파일도 이동하거나 복사하지 않고 실제 저장 위치 그대로 탐색합니다. 파일 라이브러리는 색인일 뿐 원본 파일을 수정하지 않습니다.",
  "lib.ways.3.name": "플라스미드 태그별",
  "lib.ways.3.desc":
    "AI가 각 플라스미드의 서열과 주석을 읽어 lentiviral, sgRNA, ampicillin 같은 성질 태그를 자동 생성합니다. 태그를 클릭하면 관련 플라스미드를 모두 걸러 내며, 이름이 아닌 속성으로 찾을 수 있습니다.",

  "lib.tags.head": "AI 태그",
  "lib.tags.headEn": "AI TAGS",
  "lib.tags.title": "AI가 성질 태그를 자동 생성",
  "lib.tags.desc":
    "AI를 설정해 두면 플라스미드를 스캔하거나 열 때 프로그램이 자동으로 서열과 요소를 읽어 각 파일에 성질 태그 집합을 생성합니다. 표 헤더에서 일괄 새로 고침도 가능합니다. 누락된 태그만 채우거나 전체를 다시 생성할 수 있습니다. 오른쪽 태그 클라우드는 라이브러리 전체의 속성 분포를 보여 주며, 몇 가지 속성을 조합해 필터하면 대상 파일을 좁혀 찾을 수 있습니다.",
  "lib.tags.shot": "표 헤더 일괄 새로 고침 — 태그 없는 항목만 채우기, 또는 전체 재생성",

  "lib.ai.head": "AI 어시스턴트",
  "lib.ai.headEn": "AI ASSISTANT",
  "lib.ai.title": "AI 어시스턴트로 바로 검색",
  "lib.ai.desc":
    "AI 어시스턴트에게 바로 지시할 수 있습니다. 예: 'Type I CRISPR 플라스미드 찾아 줘' — 어시스턴트가 라이브러리 전체를 검색해 후보와 각 플라스미드의 성질, 추천 용도를 설명해 줍니다. '내 플라스미드 라이브러리 정리해 줘'라고 요청하면 어시스턴트가 먼저 라이브러리 현황을 분석한 뒤 정리 방안을 제시합니다.",
  "lib.ai.shot1": "AI ASSISTANT — '내 플라스미드 라이브러리 정리': 먼저 현황 분석, 그다음 방안 제시",
  "lib.ai.shot2": "AI ASSISTANT — 'Type I CRISPR 플라스미드 찾기': 후보와 성질을 함께 나열",

  "lib.setup.head": "빠른 시작",
  "lib.setup.headEn": "GETTING STARTED",
  "lib.setup.title": "초기 설정은 몇 분이면 끝납니다",
  "lib.setup.lead":
    "유전자 파일 라이브러리는 GenePad의 도구 상자에 있습니다. 열고 나서 다음 단계에 따라 설정하세요:",
  "lib.setup.1.name": "설정 입구 열기",
  "lib.setup.1.desc":
    "유전자 파일 라이브러리를 처음 열면 상단 배너의 'Configure AI'를 클릭합니다. 이후에는 언제든 오른쪽 위 AI 아이콘으로 설정에 들어갈 수 있습니다.",
  "lib.setup.1.shot": "첫 실행 — 상단 배너의 'Configure AI' 클릭",
  "lib.setup.2.name": "DeepSeek 프로파일 만들기",
  "lib.setup.2.desc":
    "'New profile'을 클릭하고 이름을 붙입니다. 공급자는 DeepSeek, 모델은 deepseek-v4-flash를 선택한 뒤, API Key 옆의 'Get'을 클릭합니다.",
  "lib.setup.2.shot": "AI 설정 — 새 프로파일 생성, DeepSeek 선택, 'Get' 클릭",
  "lib.setup.3.name": "DeepSeek API 키 발급",
  "lib.setup.3.desc":
    "브라우저가 DeepSeek 개방 플랫폼을 엽니다. 계정을 등록하고 크레딧을 충전한 뒤 'Create API key'를 클릭합니다. 키는 한 번만 표시되므로 생성 즉시 복사해 두세요.",
  "lib.setup.3.shot": "DEEPSEEK 개방 플랫폼 — API key를 만들고 즉시 복사",
  "lib.setup.4.name": "키 붙여 넣고 저장",
  "lib.setup.4.desc":
    "소프트웨어로 돌아와 키를 붙여 넣고 'Test connection'을 클릭합니다. 'Connected'가 표시되는 것을 확인한 뒤 'Save current config'를 클릭하면 AI 설정이 완료됩니다.",
  "lib.setup.4.shot": "연결 테스트 성공 — 현재 설정 저장",
  "lib.setup.5.name": "감시 폴더 설정",
  "lib.setup.5.desc":
    "'Watch folders'를 클릭하고 플라스미드가 보관된 폴더를 추가합니다. 이후 매번 시작 시 자동으로 스캔합니다. 새 플라스미드는 자동으로 라이브러리에 들어오고 삭제된 것은 자동으로 빠지므로 수동 관리가 필요 없습니다.",
  "lib.setup.5.shot": "감시 폴더 — 추가는 자동 편입, 삭제는 자동 제거로 동기화",
  "lib.setup.note":
    "AI를 설정하면 라이브러리에 들어온 플라스미드에 태그가 자동 생성됩니다. 당장 설정하지 않아도 라이브러리 기능에는 영향이 없으며, 태그와 AI 어시스턴트만 사용할 수 없습니다.",

  "lib.daily.head": "일상 워크플로",
  "lib.daily.headEn": "DAILY WORKFLOW",
  "lib.daily.title": "검색 결과를 바로 열어 사용",
  "lib.daily.1.name": "평소 쓰는 도구로 열기",
  "lib.daily.1.desc":
    "아무 플라스미드나 우클릭 → 'Open with'로 파일을 SnapGene(플라스미드 맵), VS Code(서열) 등의 도구에 넘겨 기존 워크플로와 통합할 수 있습니다.",
  "lib.daily.2.name": "태그 사용자 지정 지원",
  "lib.daily.2.desc":
    "상세 패널에서 언제든 태그를 편집할 수 있습니다. AI가 생성한 잘못된 태그를 삭제하고, '검증 완료' 같은 사용자 지정 태그를 추가하세요.",
  "lib.daily.shot":
    "우클릭 메뉴 — 열기, 폴더에서 열기, SnapGene / VS Code로 넘기기. 오른쪽 상세 패널에서 태그 추가·삭제",

  "lib.final.title": "유전자 파일 라이브러리는 GenePad의 내장 모듈이며 독립 소프트웨어가 아닙니다",
  "lib.final.desc":
    "유전자 파일 라이브러리는 GenePad 유전자 지도 편집기에 내장되어 있습니다. GenePad를 설치/업그레이드하면 도구 상자에서 바로 사용할 수 있습니다. 현재는 무료 공개 베타 단계로 전체 플랫폼을 지원합니다.",
  "lib.final.cta": "홈으로 돌아가기",
  "lib.final.cta2": "지금 다운로드",
  "lib.top.hint": "아래쪽 다운로드 영역으로 바로 가기",

  // 홈페이지 NGS 데이터 조회 추천 섹션
  "np.lead":
    "fastq.gz / fastq / fq.gz / fq 시퀀싱 파일을 바로 엽니다. 우클릭이나 드래그 앤 드롭으로 열고, 페어 엔드 파일은 자동으로 매칭·조립됩니다. 염기별 시퀀싱 품질 확인, 아미노산 단편 검색으로 가변 영역 위치 찾기, 앵커를 설정한 일괄 절단, 원클릭 라이브러리 풍도 리포트 생성까지 지원합니다.",
  "np.c1": "fastq.gz · fq.gz 압축 해제 불필요",
  "np.c2": "페어 엔드 자동 매칭·조립",
  "np.c3": "염기별 시퀀싱 품질",
  "np.c4": "앵커 절단 + 풍도 리포트",
  "np.cta": "자세히 보기",
  "np.safe": "GenePad 내장 기능 · 무료 공개 베타 · 전 플랫폼 지원",

  // NGS 데이터 조회 페이지
  "ngs.eyebrow": "NGS Data Viewer",
  "ngs.title": (
    <>
      차세대 시퀀싱(NGS) 데이터를 바로 열어
      <br />
      한 리드씩 조회·검색·통계
    </>
  ),
  "ngs.lead":
    "GenePad는 fastq.gz / fastq / fq.gz / fq 시퀀싱 파일을 바로 엽니다. 파일 탐색기에서 우클릭 'Open with'로 GenePad를 선택하거나 파일을 프로그램 창으로 끌어다 놓으세요. 페어 엔드 시퀀싱은 R1, R2 두 파일을 함께 끌어다 놓으면 페어 관계가 자동 인식됩니다. 연 뒤에는 리드를 한 줄씩 열람하고 염기별 시퀀싱 품질과 페어 조립 결과를 확인할 수 있으며, 아미노산 단편으로 검색해 목표 가변 영역을 찾고, 절단 앵커를 설정해 파일 전체를 일괄 절단한 다음, 원클릭으로 라이브러리 풍도 리포트를 생성할 수 있습니다.",
  "ngs.hero.shot":
    "FASTQ VIEWER — 페어 리드 자동 조립, 염기별 품질 색상, 오른쪽은 파일 통계",

  "ngs.open.head": "시퀀싱 파일 열기",
  "ngs.open.headEn": "OPENING FASTQ FILES",
  "ngs.open.title": "우클릭·드래그 앤 드롭으로 열기, 명령줄 불필요",
  "ngs.open.lead":
    "fastq.gz, fastq, fq.gz, fq 네 가지 확장자를 지원하며 gzip 압축 파일은 미리 풀 필요가 없습니다. GenePad를 설치/업그레이드한 뒤 두 가지 방법 중 하나를 고르세요:",
  "ngs.open.1.name": "우클릭 → 'Open with'",
  "ngs.open.1.desc":
    "파일 탐색기에서 시퀀싱 파일을 우클릭 → 'Open with': 하위 메뉴에서 바로 GenePad를 고르거나, '다른 앱 선택' 목록에서 GenePad를 선택해 기본 앱으로 지정하세요. 이후에는 시퀀싱 파일을 더블클릭만으로 바로 열 수 있습니다.",
  "ngs.open.2.name": "창으로 끌어다 놓기",
  "ngs.open.2.desc":
    "하나 이상의 시퀀싱 파일을 GenePad 창으로 바로 끌어다 놓습니다. 환영 화면과 작업 화면 모두 드래그 앤 드롭 열기를 지원합니다.",
  "ngs.open.1.shot": "우클릭 메뉴 — 'Open with' → GenePad",
  "ngs.open.1.shot2": "'다른 앱 선택' — 시스템 목록에서 GenePad 선택, 기본 앱으로 지정 가능",
  "ngs.open.2.shot": "드래그 앤 드롭 — 여러 시퀀싱 파일을 함께 끌어다 놓아도 열립니다",

  "ngs.pair.head": "페어 엔드",
  "ngs.pair.headEn": "PAIRED-END",
  "ngs.pair.title": "페어 파일 자동 인식, 자동 페어링",
  "ngs.pair.desc":
    "R1, R2 두 파일을 함께 창에 끌어다 놓으면 프로그램이 첫 리드의 ID로 페어 관계를 자동 인식합니다. 한 번에 여러 쌍을 끌어다 놓으면 페어 확인 대화상자가 뜨며, 그룹을 수동으로 조정하거나 'Auto-pair'를 클릭해 한 번에 페어링할 수 있습니다. 확인 후 각 쌍은 하나의 페어 엔드 데이터로 열립니다. 속성 패널에는 Paired-end가 표시되고 도구 모음에서 'Swap R1/R2'로 한 번에 맞바꿀 수 있습니다.",
  "ngs.pair.shot": "PAIR NGS FILES — 첫 리드 ID로 자동 페어링, 수동 조정도 가능",

  "ngs.reads.head": "한 리드씩 열람",
  "ngs.reads.headEn": "READS & QUALITY",
  "ngs.reads.title": "모든 리드의 품질과 조립 결과를 한눈에",
  "ngs.reads.lead":
    "메인 화면에는 시퀀싱된 모든 리드가 위에서 아래로 나열되고, 오른쪽 속성 패널에 파일 전체의 시퀀싱 통계가 정리됩니다:",
  "ngs.reads.1.name": "페어 엔드 자동 조립",
  "ngs.reads.1.desc":
    "페어 엔드 데이터는 한 줄씩 자동 조립(merge)되며, 각 리드에 겹침 길이와 일치도가 표시됩니다(예: Overlap 135bp · 99% identity). 조립 결과를 한눈에 판별할 수 있습니다.",
  "ngs.reads.2.name": "염기별 시퀀싱 품질",
  "ngs.reads.2.desc":
    "모든 염기는 Phred 품질에 따라 색칠됩니다. 30 이상은 초록, 20–29는 주황, 20 미만은 빨강이며, 저품질 영역이 품질 막대에서 한눈에 보입니다. 숫자를 일일이 볼 필요가 없습니다.",
  "ngs.reads.3.name": "파일 통계",
  "ngs.reads.3.desc":
    "속성 패널에는 리드 수, 염기 수, 리드 길이, 평균 품질, 품질 분포, GC 함량, 인코딩 형식이 정리되며 Overall / R1 / R2 그룹으로 볼 수 있습니다. 초대형 파일은 미리 보기 부분만 로드하되 통계와 분석은 파일 전체를 대상으로 합니다.",
  "ngs.reads.shot":
    "READS & QUALITY — 위에서 아래로 한 리드씩: 페어 조립, 염기별 품질 막대, 오른쪽 파일 통계",

  "ngs.aa.head": "아미노산 검색",
  "ngs.aa.headEn": "SEARCH BY AMINO ACIDS",
  "ngs.aa.title": "단백질 단편으로 관심 가변 영역 찾기",
  "ngs.aa.desc":
    "아래쪽 검색 상자를 'AA' 모드로 바꾸고 아미노산 서열(예: MATNNQ)을 입력하면, 프로그램이 조립된 리드를 단백질로 번역해 한 줄씩 비교하고 히트한 펩타드를 서열 속에서 바로 표시합니다. 라이브러리 시퀀싱은 양쪽 서열이 보존되고 가운데가 가변적입니다. 알려진 보존 단백질 단편을 질의로 쓰면 수천 개 리드에서 각자의 목표 가변 영역을 빠르게 찾을 수 있습니다.",
  "ngs.aa.shot": "AA SEARCH — 아미노산 단편 입력, 히트한 펩타드가 번역 결과에서 표시됨",

  "ngs.trim.head": "앵커 절단",
  "ngs.trim.headEn": "TRIM ANCHORS",
  "ngs.trim.title": "절단 앵커를 설정해 목표 구간을 정밀하게 잘라 내기",
  "ngs.trim.desc":
    "목표 구간 양쪽의 보존 서열을 좌우 절단 앵커(trim anchors)로 지정하고 'Trim'을 클릭하면 시퀀싱 파일 전체가 일괄 절단되어 두 앵커 사이의 가변 영역 서열만 남습니다. 속성 패널에는 통과 비율이 실시간 표시되고, 앵커 미적중이나 단편이 너무 짧은 등으로 제외된 수량도 알려 줍니다. 절단된 리드는 원클릭으로 내보낼 수 있어('Export processed reads') 후속 분석이나 제출에 쓸 수 있습니다.",
  "ngs.trim.shot": "TRIM ANCHORS — 좌우 앵커가 목표 창을 표시, 통과 비율 실시간 표시",

  "ngs.report.head": "라이브러리 풍도 분석",
  "ngs.report.headEn": "LIBRARY ANALYSIS",
  "ngs.report.title": "파일 전체를 원클릭으로 풍도 리포트로",
  "ngs.report.desc":
    "'Sequence analysis'를 클릭하면 절단 결과에 대한 통계를 실행합니다. 기본적으로 파일 전체를 분석하며(수천만 리드를 메모리에 모두 올릴 필요 없음), 고유한 서열마다 출현 횟수와 빈도를 집계하고 양쪽 앵커를 유지하거나 제거할지 선택할 수 있습니다. 분석이 끝나면 그림과 표로 이루어진 리포트가 생성됩니다. Top 서열 히스토그램(DNA / AA 두 기준)과 서열별 길이, 카운트, 빈도, +1 리딩 프레임 번역이 담기고, 전체 표는 CSV로 함께 내보내져 Excel에서 바로 열 수 있습니다. 간단한 라이브러리 풍도 리포트가 이것으로 완성됩니다.",
  "ngs.report.shot1": "SEQUENCE ANALYSIS — 기본은 파일 전체 분석, 앵커 유지 / 제거 선택 가능",
  "ngs.report.shot2": "ANALYSIS REPORT — Top 서열 히스토그램과 전체 풍도 표 (CSV)",

  "ngs.video.head": "비디오 튜토리얼",
  "ngs.video.headEn": "VIDEO TUTORIAL",
  "ngs.video.lead":
    "글과 그림만으로 부족하신가요? 전체 조작 과정을 담은 데모가 있습니다. 시퀀싱 파일 열기, 페어 엔드 페어링부터 앵커 절단, 풍도 리포트 생성까지 실제 데이터로 전 과정을 단계별로 진행하며 페이지 안에서 바로 재생할 수 있습니다.",
  "ngs.video.caption": "VIDEO TUTORIAL — 전체 과정 데모: 열기 → 페어링 → 열람 → 검색 → 절단 → 풍도 리포트",

  "ngs.final.title": "NGS 데이터 조회는 GenePad의 내장 기능이며 독립 소프트웨어가 아닙니다",
  "ngs.final.desc":
    "NGS 데이터 조회는 GenePad 유전자 지도 편집기에 내장되어 있습니다. 설치/업그레이드 후 바로 시퀀싱 파일을 열 수 있고, 맵 편집, Sanger 트레이스 비교 등의 기능과 같은 프로그램 안에서 함께 쓸 수 있습니다. 현재는 무료 공개 베타 단계로 전체 플랫폼을 지원합니다.",
  "ngs.final.cta": "홈으로 돌아가기",
  "ngs.final.cta2": "지금 다운로드",
  "ngs.top.hint": "아래쪽 다운로드 영역으로 바로 가기",

  // 튜토리얼 페이지 (튜토리얼 허브: 기능별 사용법을 지속 수록)
  "tut.eyebrow": "Tutorials",
  "tut.title": (
    <>
      설정부터 일상 분석까지,
      <br />
      단계별 그림 해설
    </>
  ),
  "tut.lead":
    "GenePad의 그림 튜토리얼을 한자리에 모았으며 앞으로도 새 편을 계속 추가할 예정입니다. DeepSeek를 연결해 AI 기능을 열고, 유전자 파일 라이브러리로 수백 개 플라스미드를 관리하고, fastq.gz부터 라이브러리 풍도 리포트까지 NGS 분석을 완주하는 것까지. 모든 단계에 실제 화면 스크린샷이 붙어 있으니 순서대로 따라 하면 됩니다.",
  "tut.toc.hint": "카드를 클릭하면 해당 튜토리얼로 이동합니다",
  "tut.card.view": "튜토리얼 보기",
  "tut.prev": "이전 편",
  "tut.next": "다음 편",
  "tut.backTo": "튜토리얼 목록으로",
  "tut.toc.ai.name": "AI 설정 (DeepSeek)",
  "tut.toc.ai.desc":
    "설정 열기, 프로파일 생성, API 키 발급 및 저장 — 다섯 단계로 DeepSeek를 연결해 AI 어시스턴트와 플라스미드 자동 태그를 엽니다.",
  "tut.toc.ai.en": "SET UP AI",
  "tut.toc.lib.name": "유전자 파일 라이브러리",
  "tut.toc.lib.desc":
    "감시 폴더가 자동으로 라이브러리에 수집하고, 프로젝트·경로·태그 세 가지 방식으로 검색하며, AI 어시스턴트가 속성으로 플라스미드를 찾아 줍니다.",
  "tut.toc.lib.en": "FILE LIBRARY",
  "tut.toc.ngs.name": "NGS 파일 분석",
  "tut.toc.ngs.desc":
    "fastq.gz를 끌어다 놓으면 시작합니다. 페어 엔드 페어링, 염기별 품질 검사, 아미노산 검색, 앵커 절단, 풍도 리포트.",
  "tut.toc.ngs.en": "NGS ANALYSIS",
  "tut.toc.lang.name": "원하는 언어로 사용",
  "tut.toc.lang.desc":
    "설정 → Language → AI Translate: 목표 언어를 입력하면 언어 팩이 자동 생성되어 인터페이스 전체가 프랑스어, 러시아어 등 원하는 언어로 바뀝니다.",
  "tut.toc.lang.en": "ANY LANGUAGE",

  // 튜토리얼 분류 (목록 페이지 섹션 + 사이드 내비게이션)
  "tut.toc.langpack.name": "UI 언어 설정",
  "tut.toc.langpack.desc":
    "설정 → Language 열기: 내장 중국어·영어는 한 번의 클릭으로 전환하고, 공식 언어 팩을 가져오면 독일어·러시아어·일본어·한국어·프랑스어 화면을 쓸 수 있습니다.",
  "tut.toc.langpack.en": "UI LANGUAGE",
  "tut.cat.gs.name": "빠른 시작",
  "tut.cat.gs.en": "GETTING STARTED",
  "tut.cat.gs.desc": "처음이라면 순서대로 진행하세요. 먼저 AI를 연결하고, 그다음 플라스미드 파일을 라이브러리로 관리합니다.",
  "tut.cat.analysis.name": "데이터 분석",
  "tut.cat.analysis.en": "DATA ANALYSIS",
  "tut.cat.analysis.desc": "시퀀싱 데이터의 열람, 검색, 정량 분석.",

  // 튜토리얼 1: AI 설정
  "tut.ai.head": "튜토리얼 1 · AI 설정",
  "tut.ai.headEn": "TUTORIAL 1 · SET UP DEEPSEEK",
  "tut.ai.title": "다섯 단계로 DeepSeek를 연결해 AI 어시스턴트와 자동 태그 열기",
  "tut.ai.lead":
    "AI 어시스턴트와 플라스미드 자동 태그는 대형 언어 모델이 구동하며 DeepSeek를 권장합니다. 아래 다섯 단계를 마치면 자연어로 서열과 주석을 다룰 수 있고, 플라스미드를 라이브러리에 넣거나 열 때도 성질 태그가 자동 생성됩니다.",
  "tut.ai.1.name": "설정 열기",
  "tut.ai.1.desc": "GenePad를 시작하고 환영 화면 오른쪽 위의 톱니바퀴 아이콘을 클릭해 설정 창을 엽니다.",
  "tut.ai.1.shot": "환영 화면 — 오른쪽 위 톱니바퀴 아이콘 클릭",
  "tut.ai.2.name": "AI 설정으로 들어가 새 프로파일 만들기",
  "tut.ai.2.desc": "설정 창 왼쪽에서 'AI Settings'를 선택한 뒤 'New config'를 클릭해 새 AI 프로파일을 만듭니다.",
  "tut.ai.2.shot": "AI 설정 — AI Settings 선택, New config 클릭",
  "tut.ai.3.name": "프로파일 채우기",
  "tut.ai.3.desc":
    "프로파일 이름을 정하고, 공급자는 DeepSeek, 모델은 deepseek-v4-flash를 선택하며, API URL은 기본값 그대로 둡니다. 그다음 API Key 옆의 'Get'을 클릭하면 브라우저가 DeepSeek 개방 플랫폼을 엽니다.",
  "tut.ai.3.shot": "이름과 모델 입력 — API Key 옆의 'Get' 클릭",
  "tut.ai.4.name": "DeepSeek API 키 발급",
  "tut.ai.4.desc":
    "DeepSeek 개방 플랫폼에서 계정을 등록하고 크레딧을 충전한 뒤 'Create API key'를 클릭하고 이름을 붙여 확인합니다. 키는 한 번만 표시되니 즉시 복사하세요.",
  "tut.ai.5.name": "키 붙여 넣고 저장",
  "tut.ai.5.desc":
    "GenePad로 돌아와 키를 붙여 넣고 'Test connection'을 클릭합니다. 연결 성공 메시지가 보이면 'Save current config'를 클릭해 저장합니다. 이것으로 AI 설정이 끝납니다.",
  "tut.ai.note":
    "한 번만 설정하면 계속 쓸 수 있고 키는 로컬에만 저장됩니다. 이후 환영 화면과 작업 화면의 AI 아이콘으로 바로 대화할 수 있으며, 열거나 라이브러리에 넣은 플라스미드에도 성질 태그가 자동 생성됩니다.",

  // 튜토리얼 2: 유전자 파일 라이브러리
  "tut.lib.head": "튜토리얼 2 · 유전자 파일 라이브러리",
  "tut.lib.headEn": "TUTORIAL 2 · GENE FILE LIBRARY",
  "tut.lib.title": "수백 개 플라스미드를 검색 가능한 하나의 라이브러리로",
  "tut.lib.lead":
    "유전자 파일 라이브러리는 도구 상자에 있습니다. 파일을 이동하거나 복사하지 않고 흩어진 플라스미드에 통합 색인만 만들어 줍니다. 아래 단계는 자동 수집부터 속성 한마디로 목표 플라스미드를 찾는 것까지 이어집니다.",
  "tut.lib.1.name": "감시 폴더 설정, 플라스미드 자동 수집",
  "tut.lib.1.desc":
    "유전자 파일 라이브러리 열기 → 'Watch folders' → 플라스미드가 보관된 폴더를 추가합니다. 이후 매번 시작 시 자동으로 스캔합니다. 새 플라스미드는 자동 편입, 삭제된 것은 자동 제거로 수동 관리가 필요 없습니다.",
  "tut.lib.2.name": "프로젝트, 경로, 태그로 검색",
  "tut.lib.2.desc":
    "새 프로젝트를 만들고 플라스미드를 끌어다 놓으면 분류가 끝납니다. 저장 경로 그대로 탐색할 수도 있습니다. AI를 설정하면 플라스미드마다 성질 태그가 붙어 태그 클릭만으로 관련 플라스미드를 모두 걸러 냅니다.",
  "tut.lib.3.name": "AI가 성질 태그 자동 생성",
  "tut.lib.3.desc":
    "튜토리얼 1의 설정을 마친 뒤에는 플라스미드를 스캔하거나 열 때 lentiviral, sgRNA, ampicillin 같은 태그가 자동 생성됩니다. 표 헤더에서 일괄 새로 고침할 수도 있습니다. 누락된 태그만 채우거나 전체를 다시 생성하세요.",
  "tut.lib.4.name": "AI 어시스턴트로 속성 검색",
  "tut.lib.4.desc":
    "AI 어시스턴트에게 바로 요구를 말하면 됩니다. 예: 'Type I CRISPR 플라스미드 찾아 줘' — 어시스턴트가 라이브러리 전체를 검색해 후보와 각 플라스미드의 성질, 추천 용도를 설명해 줍니다.",
  "tut.lib.5.name": "검색 결과 바로 활용",
  "tut.lib.5.desc":
    "아무 플라스미드나 우클릭 → 'Open with'로 SnapGene(플라스미드 맵), VS Code(서열) 등의 도구에 넘길 수 있습니다. 상세 패널에서 태그를 추가·삭제하거나 '검증 완료' 같은 사용자 지정 태그를 붙일 수도 있습니다.",
  "tut.lib.note":
    "파일 라이브러리는 색인일 뿐 원본 파일을 수정하지 않습니다. AI를 설정하지 않아도 수집과 열람에는 영향이 없으며 자동 태그와 AI 검색만 사용할 수 없습니다.",

  // 튜토리얼 3: NGS 파일 분석
  "tut.ngs.head": "튜토리얼 3 · NGS 파일 분석",
  "tut.ngs.headEn": "TUTORIAL 3 · NGS ANALYSIS",
  "tut.ngs.title": "fastq.gz부터 라이브러리 풍도 리포트까지",
  "tut.ngs.lead":
    "명령줄 없이 시퀀싱 파일을 창으로 끌어다 놓으면 시작됩니다. 아래 여섯 단계가 열기, 페어링, 품질 검사, 검색, 절단, 풍도 분석의 전 과정을 커버하며, 글 끝에는 전체 조작 비디오가 붙어 있습니다.",
  "tut.ngs.1.name": "시퀀싱 파일 열기",
  "tut.ngs.1.desc":
    "하나 이상의 시퀀싱 파일을 GenePad 창으로 바로 끌어다 놓습니다. 파일 탐색기에서 우클릭 'Open with'로 GenePad를 선택할 수도 있습니다. fastq.gz, fastq, fq.gz, fq를 지원하며 gzip 압축은 풀 필요가 없습니다.",
  "tut.ngs.2.name": "페어 엔드 파일 자동 페어링",
  "tut.ngs.2.desc":
    "R1, R2 두 파일을 함께 끌어다 놓으면 프로그램이 첫 리드의 ID로 페어를 자동 인식합니다. 여러 쌍을 한꺼번에 끌어다 놓으면 확인 대화상자가 뜨는데 'Auto-pair'로 한 번에 페어링할 수 있으며, 확인 후 각 쌍은 하나의 페어 엔드 데이터로 열립니다.",
  "tut.ngs.3.name": "한 줄씩 열람과 품질 검사",
  "tut.ngs.3.desc":
    "메인 화면에 리드가 한 줄씩 나열됩니다. 염기는 Phred 품질에 따라 색칠되고, 페어 엔드 데이터는 자동 조립되며 겹침 길이와 일치도가 표시됩니다. 오른쪽 속성 패널에는 리드 수, GC 함량 등 파일 통계가 정리됩니다.",
  "tut.ngs.4.name": "아미노산 검색으로 가변 영역 찾기",
  "tut.ngs.4.desc":
    "아래쪽 검색 상자를 'AA' 모드로 바꾸고 알려진 보존 단백질 단편(예: MATNNQ)을 입력합니다. 프로그램이 조립된 리드를 단백질로 번역해 한 줄씩 비교하고 히트한 펩타드를 바로 표시하며, 수천 개 리드에서 목표 가변 영역을 빠르게 찾습니다.",
  "tut.ngs.5.name": "앵커 설정 후 일괄 절단",
  "tut.ngs.5.desc":
    "목표 구간 양쪽의 보존 서열을 좌우 절단 앵커로 지정하고 'Trim'을 클릭하면 파일 전체가 일괄 절단되어 두 앵커 사이의 가변 영역만 남습니다. 속성 패널에 통과 비율이 실시간 표시되며 절단 결과는 원클릭으로 내보낼 수 있습니다.",
  "tut.ngs.6.name": "라이브러리 풍도 리포트 생성",
  "tut.ngs.6.desc":
    "'Sequence analysis'를 클릭합니다. 파일 전체에서 고유 서열마다 출현 횟수와 빈도를 집계하고 Top 서열 히스토그램과 항목별 상세를 생성하며, 전체 표는 CSV로 내보내 Excel에서 바로 열 수 있습니다. 간단한 라이브러리 풍도 리포트가 이것으로 완성됩니다.",

  // 튜토리얼 4: 원하는 언어 설정
  "tut.lang.head": "튜토리얼 4 · 원하는 언어 설정",
  "tut.lang.headEn": "TUTORIAL 4 · ANY LANGUAGE",
  "tut.lang.title": "AI 번역으로 인터페이스를 원하는 언어로",
  "tut.lang.lead":
    "GenePad는 중국어와 영어 인터페이스가 내장되어 있으며, 다른 언어는 공식 지원을 기다릴 필요가 없습니다. 설정 → Language를 열고 'AI Translate'를 클릭한 뒤 목표 언어를 입력하면 언어 팩이 자동 생성되어 적용됩니다. 먼저 튜토리얼 1로 AI 설정을 마쳐 주세요.",
  "tut.lang.1.name": "설정 열기",
  "tut.lang.1.desc": "튜토리얼 1과 같습니다. GenePad를 시작하고 환영 화면 오른쪽 위의 톱니바퀴 아이콘을 클릭해 설정 창을 엽니다.",
  "tut.lang.2.name": "Language 설정으로 들어가 AI Translate 클릭",
  "tut.lang.2.desc":
    "설정 왼쪽에서 'Language'를 선택하고 'AI Translate'를 클릭합니다. 이 화면에서는 언어 파일을 수동으로 가져오기 / 내보내기할 수도 있습니다.",
  "tut.lang.2.shot": "언어 설정 — Language 선택, AI Translate 클릭",
  "tut.lang.3.name": "목표 언어를 입력하고 번역 시작",
  "tut.lang.3.desc":
    "언어 이름과 코드(예: Français와 fr)를 입력하고 'Translate'를 클릭합니다. 프로그램이 설정된 AI로 내장 언어 파일을 번역합니다. 긴 텍스트는 자동으로 구간별로 처리하고 실패한 구간은 자동 재시도하며, 완료되면 자동으로 가져와 적용합니다.",
  "tut.lang.3.shot": "언어 이름과 코드 입력 — Translate 클릭",
  "tut.lang.4.name": "인터페이스 전체가 목표 언어로 전환",
  "tut.lang.4.desc":
    "번역이 끝나면 인터페이스가 곧바로 전체 전환됩니다. 프랑스어를 예로 들면 모든 메뉴, 설정, 메시지가 현지화됩니다.",
  "tut.lang.4.shot": "인터페이스가 프랑스어로 전환됨",
  "tut.lang.5.name": "같은 방법으로 언어 추가",
  "tut.lang.5.desc":
    "같은 방법으로 러시아어, 스페인어 등 원하는 언어를 더 만들 수 있습니다. 가져온 언어 팩은 Language 화면에서 선택, 관리, 삭제할 수 있습니다.",
  "tut.lang.5.shot": "같은 방법으로 추가한 러시아어 인터페이스",
  "tut.lang.note":
    "AI 번역은 내장 중국어 언어 파일을 원본으로 사용합니다. 일부 항목이 부정확하면 언어 파일을 내보내 수동으로 수정한 뒤 다시 가져올 수 있습니다.",

  // 튜토리얼 5: UI 언어 설정(내장 언어 전환 + 공식 언어 팩 가져오기)
  "tut.langpack.head": "튜토리얼 5 · UI 언어 설정",
  "tut.langpack.headEn": "TUTORIAL 5 · UI LANGUAGE",
  "tut.langpack.title": "두 단계로 익숙한 언어로",
  "tut.langpack.lead":
    "GenePad에는 중국어와 영어 화면이 내장되어 있습니다. 독일어·러시아어·일본어·한국어·프랑스어는 공식 언어 팩으로 제공됩니다 — 다운로드 후 설정에서 가져오기만 하면 되며 추가 설정이 필요 없습니다. AI 번역으로 만든 사용자 지정 언어 팩도 같은 절차로 사용할 수 있습니다.",
  "tut.langpack.1.name": "설정 열기",
  "tut.langpack.1.desc": "GenePad를 실행하고 환영 화면 오른쪽 위의 톱니바퀴 아이콘을 클릭해 설정 창을 엽니다.",
  "tut.langpack.1.shot": "환영 화면 — 오른쪽 위 톱니바퀴 아이콘 클릭",
  "tut.langpack.2.name": "Language 설정 열기",
  "tut.langpack.2.desc":
    "설정 창 왼쪽 사이드바에서 「Language」를 선택합니다: English 또는 中文을 클릭하면 내장 언어가 전환되고, 가져온 언어 팩도 같은 목록에 표시됩니다.",
  "tut.langpack.2.shot": "Language 설정 — 언어를 클릭하면 즉시 전환. 아래 버튼으로 언어 파일 가져오기 / 내보내기",
  "tut.langpack.3.name": "언어 팩 내려받아 가져오기",
  "tut.langpack.3.desc":
    "이 페이지 아래에서 필요한 언어의 .json 팩을 내려받고, 「Import Language File」을 클릭해 내려받은 파일을 선택합니다. 가져오기가 끝나면 목록에 언어가 나타나며 — 클릭하면 화면 전체가 전환되고, 오른쪽 휴지통 아이콘으로 삭제할 수 있습니다.",
  "tut.langpack.3.shot": "가져오기 완료 — 목록에 언어가 추가되며 클릭으로 전환",
  "tut.langpack.4.name": "화면 전체가 전환됩니다",
  "tut.langpack.4.desc":
    "언어를 선택하면 화면 전체가 즉시 전환됩니다: 모든 메뉴와 설정, 메시지가 현지화됩니다. 공식 5개 언어 팩의 실제 화면:",
  "tut.langpack.4.shot1": "프랑스어 화면",
  "tut.langpack.4.shot2": "한국어 화면",
  "tut.langpack.4.shot3": "러시아어 화면",
  "tut.langpack.4.shot4": "독일어 화면",
  "tut.langpack.4.shot5": "일본어 화면",
  "tut.langpack.dl.title": "공식 언어 팩 내려받기(.json)",
  "tut.langpack.dl.hint": "GenePad 0.7.x 호환. 압축 해제 불필요 — 단계 3과 같은 방식으로 파일을 바로 가져오면 됩니다.",
  "tut.langpack.dl.btn": "내려받기",
  "tut.langpack.note":
    "언어 팩에는 화면 텍스트만 들어 있으며 서열이나 파일 데이터는 포함되지 않습니다. 공식 팩은 버전마다 갱신되므로 새 파일을 다시 가져오면 최신 상태가 됩니다. 다른 언어가 필요하신가요? 튜토리얼 4에서 AI 번역으로 어떤 언어의 팩이든 만들 수 있습니다.",

  "tut.final.title": "튜토리얼의 기능은 모두 GenePad에 내장되어 있으며 별도 소프트웨어가 아닙니다",
  "tut.final.desc":
    "GenePad를 설치/업그레이드한 뒤 튜토리얼대로 진행하세요. AI 어시스턴트, 유전자 파일 라이브러리, NGS 데이터 조회가 같은 프로그램 안에서 함께 작동합니다. 현재는 무료 공개 베타 단계로 전체 플랫폼을 지원합니다.",
  "tut.final.cta": "홈으로 돌아가기",
  "tut.final.cta2": "지금 다운로드",
  "tut.top.hint": "아래쪽 다운로드 영역으로 바로 가기",

  // Stats 하위 페이지 (실시간 통계)
  "st.eyebrow": "Live Stats",
  "st.title": (
    <>
      실시간 설치 통계,
      <br />
      다음 주인공은 당신입니다
    </>
  ),
  "st.lead":
    "아래 숫자는 GenePad 앱 내부의 익명 사용 통계를 모아 만든 것입니다. 설치 인스턴스는 하나의 무작위 식별자로만 계수되며 서열, 파일, 개인 정보는 일절 포함하지 않습니다. 데이터는 보고할 때마다 자동으로 갱신되며 GenePad는 등록 없이 사용할 수 있습니다.",
  "st.k.installs": "총 설치 수",
  "st.k.active30": "최근 30일 활성",
  "st.k.active7": "최근 7일 활성",
  "st.k.hours": "누적 사용 시간",
  "st.k.hoursUnit": "시간",
  "st.chart.title": "주별 신규 설치",
  "st.chart.title.daily": "일별 신규 설치",
  "st.chart.caption": "WEEKLY NEW INSTALLS — 설치 인스턴스의 첫 실행 시각 기준 (월–일, UTC)",
  "st.chart.caption.daily": "DAILY NEW INSTALLS — 설치 인스턴스의 첫 실행 날짜 기준 (UTC 자연일)",
  "st.chart.note.daily": "마지막 막대는 오늘 진행 중인 미완성 집계로 수치는 계속 늘어납니다.",
  "st.chart.note.byos": "막대 안의 색은 운영체제를 구분하며, 막대 구간에 마우스를 올리면 각 시스템의 구체적 수치를 볼 수 있습니다.",
  "st.chart.total": "합계",
  "st.chart.legend.aria": "운영체제별 범례",
  "st.tab.aria": "통계 집계 단위",
  "st.tab.weekly": "주별",
  "st.tab.daily": "일별",
  "st.os.title": "설치 운영체제 분포",
  "st.os.other": "기타",
  "st.updated": "데이터 업데이트",
  "st.note": "집계 방식: 무작위 설치 식별자로 집계합니다. 통계를 끄거나 삭제하면 더 이상 계수하지 않습니다.",
  "st.error": "통계 데이터를 일시적으로 가져올 수 없습니다. 잠시 후 새로 고침해 다시 시도해 주세요.",
  "st.cta": "무료 다운로드 — 다음 사용자가 되어 주세요",
};

export default ko;
