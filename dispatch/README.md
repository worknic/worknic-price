# WORKNIC THE DISPATCH v8 (GAS 백엔드 연동)

## ⚠️ 설정 필수 · 딱 한 줄만 바꾸세요

`partner_sales_v8.html` 파일을 **메모장** 이나 **VS Code** 같은 편집기로 열면
맨 위쪽에 아래와 같은 줄이 있습니다:

```
const GAS_URL = '여기에_GAS_URL을_붙여넣으세요';
```

이걸 본인이 배포하신 GAS URL로 교체하세요:

```
const GAS_URL = 'https://script.google.com/macros/s/AKfyc..../exec';
```

따옴표(' ')는 **반드시 유지**하세요.

## 파일 위치 찾기
해당 줄은 파일 앞부분(1000번째 줄 근처)에 `script` 태그 안에 있습니다.

검색 기능(Ctrl+F)으로 **`GAS_URL`** 을 찾으시면 빠릅니다.

## 폴더 구조
```
partner_sales_v8.html  ← 이 파일의 GAS_URL 교체
fonts/
assets/
  ├─ comma_dark.png
  └─ comma.png
```

## 관리자 비밀번호
`532968` (HTML 내 `ADMIN_PASSWORD` 상수)

## 주요 변경점 (v7 → v8)
- 모든 데이터 저장/조회가 Google Sheets로 이동
- 여러 기기에서 실시간 동기화 가능
- 로딩 스피너 추가 (네트워크 통신 중)
- 오프라인 배너 (서버 연결 안 될 때)
- 관리자 홈에 "데이터 새로고침" 버튼 추가
- 세션 확인 시 서버에 재검증 (거절된 파트너는 자동 로그아웃)

## 다음 단계
1. GAS_URL 교체 완료
2. 파일 저장
3. 브라우저에서 열어 "관리자 진입" 테스트
4. 가입 신청 → 승인 → 로그인 흐름 확인
