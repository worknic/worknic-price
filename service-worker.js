// WORKNIC Price App — Service Worker
// 버전이 바뀔 때마다 CACHE_NAME의 날짜를 변경하면 팀원들이 자동으로 최신 버전으로 업데이트됩니다.
// 예: 가격표 업데이트 후 → CACHE_NAME = 'worknic-price-2026-05-01'

const CACHE_NAME = 'worknic-price-2026-04-17';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// 설치 단계 - 핵심 파일들 캐싱
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// 활성화 - 이전 버전 캐시 삭제
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// 요청 - 캐시 우선, 없으면 네트워크 (오프라인에서도 작동)
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // 같은 도메인 리소스만 캐시 (폰트 CDN 등 외부 제외)
        if (response.ok && event.request.url.startsWith(self.location.origin)) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        // 오프라인 + 캐시 미스 시 index.html 반환
        return caches.match('./index.html');
      });
    })
  );
});
