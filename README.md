# SSR Movie APP

# 요구사항

필수 요구사항은 꼭 달성해야 하는 목표로, 수정/삭제는 불가하고 추가는 가능합니다.
선택 요구사항은 단순 예시로, 자유롭게 추가/수정/삭제해서 구현해보세요.
각 요구사항은 달성 후 마크다운에서 - [x]로 표시하세요.

# ❗ 필수

- [x] 영화 제목으로 검색이 가능해야 합니다!
- [x] 검색된 결과의 영화 목록이 출력돼야 합니다!
- [ ] 단일 영화의 상세정보(제목, 개봉연도, 평점, 장르, 감독, 배우, 줄거리, 포스터 등)를 볼 수 있어야 합니다!
- [ ] 실제 서비스로 배포하고 접근 가능한 링크를 추가해야 합니다.

# 선택

한 번의 검색으로 영화 목록이 20개 이상 검색되도록 만들어보세요.

- [x] 영화 개봉연도로 검색할 수 있도록 만들어보세요.
- [x] 영화 목록을 검색하는 동안 로딩 애니메이션이 보이도록 만들어보세요.
- [x] 무한 스크롤 기능을 추가해서 추가 영화 목록을 볼 수 있도록 만들어보세요.
- [ ] 영화 포스터가 없을 경우 대체 이미지를 출력하도록 만들어보세요.
- [ ] 영화 상세정보가 출력되기 전에 로딩 애니메이션이 보이도록 만들어보세요.
- [ ] 영화 상세정보 포스터를 고해상도로 출력해보세요. (실시간 이미지 리사이징)
- [ ] 차별화가 가능하도록 프로젝트를 최대한 예쁘게 만들어보세요.
- [ ] 영화와 관련된 기타 기능도 고려해보세요.
- [x] API 기본 사용법

# Todo

- [ ] https://webpack.kr/guides/hot-module-replacement/ 참고해서 front server, front app hot reload 구현 해보기

# Reference

[ReactDom.renderToString메소드를 사용한 SSR세팅](https://github.com/Octanium91/react-app-ssr)

[New Suspense SSR Architecture in React Discusstion](https://github.com/reactwg/react-18/discussions/37)

[React 18 New Suspense SSR Demo](https://codesandbox.io/s/kind-sammet-j56ro?file=/src/index.js:267-278)

[compression](https://velog.io/@onejaejae/Node-jsExpress-%EB%AF%B8%EB%93%A4%EC%9B%A8%EC%96%B4-%EC%82%AC%EC%9A%A9-body-paresr-compression)

[babel-register 참고, 외에도 많은 바벨 관련 정보가 많습니다.](https://jbee.io/etc/Everything-about-babel/)

[webpack-prefetch](https://velog.io/@minsu2344/Vue-router-%EC%84%A4%EC%A0%95%EC%9C%BC%EB%A1%9C-%ED%8E%98%EC%9D%B4%EC%A7%80-%EB%AF%B8%EB%A6%AC-cache%EC%97%90-%EB%8B%B4%EC%95%84%EB%91%90%EA%B8%B0webpackChunkName-webpackPrefetch)

[react-router-dom v6](https://velog.io/@soryeongk/ReactRouterDomV6)
[react-route-dom ssr guides](https://reactrouter.com/en/main/guides/ssr)

[css minimize webpack plugin](https://webpack.js.org/plugins/css-minimizer-webpack-plugin/)
