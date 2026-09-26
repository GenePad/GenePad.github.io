/* 한국어(kr.genepad.cn) 셸 페이지 head 메타데이터: scripts/gen-shells.mjs가 이 파일을
   읽어 app/en/*.html 템플릿을 app/kr/*.html로 재작성한다.
   pages.*.title은 src/lang/ko.tsx의 title.* 번역과 정확히 일치해야 하고,
   description은 en 셸 페이지 같은 페이지 meta description의 한국어 번역이다. */
export default {
  code: "ko",
  dir: "kr",
  host: "kr.genepad.cn",
  htmlLang: "ko-KR",
  ogLocale: "ko_KR",
  boot: {
    tagline: "GENE MAP EDITOR", // #boot 큰 제목 <small> 짧은 라벨
    desc: "일상적인 분자 클로닝을 위한 가볍고 크로스 플랫폼 유전자 지도 편집기입니다. 플라스미드 맵 열람·편집, 서열 주석 관리, 제한효소 부위 분석, Sanger 시퀀싱 트레이스 비교를 지원합니다.",
    loading: "불러오는 중", // 로딩 aria-label
  },
  // 11개 빌드 페이지의 <title>과 meta description(og/twitter 설명은 description 재사용)
  pages: {
    "index": {
      title: "GenePad - 가벼운 크로스 플랫폼 유전자 지도 편집기",
      description:
        "GenePad는 일상적인 분자 클로닝을 위한 가볍고 크로스 플랫폼 유전자 지도 편집기입니다. 플라스미드 맵 열람·편집, 서열 주석 관리, 제한효소 부위 분석, Sanger 시퀀싱 트레이스 비교를 지원합니다. GEN, GenBank, FASTA, SnapGene DNA(.dna), AB1, GJSON 형식을 지원합니다.",
    },
    "tech-support": {
      title: "개발자 문서 - GenePad",
      description:
        "GenePad 개발자 문서 허브: .gen 및 .gjson 파일 정의, Rust 읽기 예제, SnapGene .dna 변환 가이드.",
    },
    "projects": {
      title: "프로젝트 - GenePad | 플라스미드 파트 라이브러리 및 코돈 지도",
      description:
        "GenePad가 관리하는 생태계 프로젝트: NCBI로 출처를 추적할 수 있는 플라스미드 공통 파트 서열 라이브러리(20개 카테고리 266개 파트, MIT 라이선스)와 GTEx/GENCODE 기반 인간 조직 특이적 코돈 사용 지도(소스 코드 공개) — 연구자와 개발자를 위한 도구.",
    },
    "library": {
      title: "파일 라이브러리 - GenePad | 플라스미드 파일 검색 및 관리",
      description:
        "GenePad 내장 플라스미드 파일 라이브러리: 폴더곳곳에 흩어진 플라스미드 파일을 검색 가능한 하나의 색인으로 모아 프로젝트·저장 경로·AI 생성 태그별로 정리합니다. DeepSeek를 설정해 플라스미드에 자동 태그를 붙이고, AI 어시스턴트로 속성만으로 파일을 찾으세요. 파일 이름이나 위치를 외울 필요가 없습니다.",
    },
    "ngs": {
      title: "NGS 뷰어 - GenePad | FASTQ 데이터 조회 및 라이브러리 풍부도 분석",
      description:
        "GenePad 내장 NGS 데이터 뷰어: 우클릭 'Open With' 또는 드래그 앤 드롭으로 fastq.gz / fastq / fq.gz / fq 파일을 바로 엽니다. 페어 엔드 파일 자동 매칭·병합, 염기별 시퀀싱 품질, 아미노산 단편 검색으로 가변 영역 위치 찾기, 앵커 트리밍 일괄 캡처, 원클릭 라이브러리 풍부도 리포트.",
    },
    "tutorial": {
      title: "튜토리얼 - GenePad | AI 설정 · 파일 라이브러리 · NGS 분석",
      description:
        "GenePad 튜토리얼 목록: 그림으로 단계별 안내하는 가이드 — DeepSeek AI 설정, 유전자 파일 라이브러리 정리, NGS 데이터를 fastq.gz부터 라이브러리 풍부도 리포트까지. 한 편당 한 페이지로 계속 추가됩니다.",
    },
    "tutorial-ai": {
      title: "AI 설정 튜토리얼 - GenePad | DeepSeek API 키 발급 및 저장",
      description:
        "GenePad 단계별 튜토리얼: 다섯 단계로 DeepSeek 연결 — 설정 열기, 프로파일 생성, 모델 선택, DeepSeek 플랫폼에서 API 키 발급 및 복사, 붙여 넣고 연결 테스트 후 저장하여 AI 어시스턴트와 플라스미드 자동 태그를 엽니다. 모든 단계를 실제 스크린샷으로 그림 해설합니다.",
    },
    "tutorial-library": {
      title: "파일 라이브러리 튜토리얼 - GenePad | 플라스미드 가져오기, 검색 및 AI 태그",
      description:
        "GenePad 단계별 튜토리얼: 감시 폴더를 추가해 플라스미드가 저절로 수집되게 하고, 프로젝트·저장 경로·AI 태그별로 탐색하며, AI 어시스턴트로 플라스미드를 찾고, 원클릭으로 SnapGene / VS Code에 파일을 넘깁니다. 모든 단계를 실제 스크린샷으로 그림 해설합니다.",
    },
    "tutorial-ngs": {
      title: "NGS 분석 튜토리얼 - GenePad | fastq.gz 조회 및 풍부도 리포트",
      description:
        "GenePad 단계별 튜토리얼: 드래그 앤 드롭으로 fastq.gz 열기, 페어 엔드 자동 페어링, 염기별 품질 확인, 아미노산 검색, 앵커 트리밍, 라이브러리 풍부도 리포트 생성 — 전체 과정 비디오 포함. 모든 단계를 실제 스크린샷으로 그림 해설합니다.",
    },
    "tutorial-lang": {
      title: "원하는 언어 사용 튜토리얼 - GenePad | AI로 언어 팩 번역하기",
      description:
        "GenePad 단계별 튜토리얼: 설정 → Language → AI Translate를 열고 목표 언어(프랑스어, 러시아어 등)를 입력하면 설정된 AI가 언어 팩을 생성해 인터페이스 전체를 전환합니다. 긴 텍스트는 구간별 번역과 자동 재시도로 처리되며, 언어 팩은 내보내 수동 편집할 수도 있습니다. 모든 단계를 실제 스크린샷으로 그림 해설합니다.",
    },
    "tutorial-langpack": {
      title: "UI 언어 설정 튜토리얼 - GenePad | 내장 언어와 공식 언어 팩",
      description:
        "GenePad UI 언어 설정 튜토리얼: 설정 → Language를 열어 내장 중국어·영어를 전환하거나, 'Import Language File'로 공식 언어 팩(독일어·러시아어·일본어·한국어·프랑스어)을 가져오면 화면 전체가 즉시 전환됩니다. 추가 설정이 필요 없습니다. 실제 스크린숏이 있는 단계별 설명과 5개 공식 팩 다운로드 제공.",
    },
    "stats": {
      title: "실시간 통계 - GenePad | 공개 사용 통계",
      description:
        "GenePad 실시간 사용 통계: 총 설치 수, 최근 30일 활성 사용자, 누적 사용 시간, 주별 설치 추이. 앱 내 익명 텔레메트리로 자동 집계되며 공개되어 있습니다. 개인 정보는 포함되지 않습니다.",
    },
  },
};
