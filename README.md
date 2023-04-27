# Move App Challenge

# 데모 보기

[DEMO](http://ec2-3-84-213-170.compute-1.amazonaws.com) (https적용 안했습니다!)

# ❗ 필수

- [x] 영화 제목으로 검색이 가능해야 합니다!
- [x] 검색된 결과의 영화 목록이 출력돼야 합니다!
- [x] 단일 영화의 상세정보(제목, 개봉연도, 평점, 장르, 감독, 배우, 줄거리, 포스터 등)를 볼 수 있어야 합니다!
- [x] 실제 서비스로 배포하고 접근 가능한 링크를 추가해야 합니다.

# 선택

- [x] 영화 개봉연도로 검색할 수 있도록 만들어보세요.
- [x] 영화 목록을 검색하는 동안 로딩 애니메이션이 보이도록 만들어보세요.
- [x] 무한 스크롤 기능을 추가해서 추가 영화 목록을 볼 수 있도록 만들어보세요.
- [x] 영화 포스터가 없을 경우 대체 이미지를 출력하도록 만들어보세요.
- [x] 차별화가 가능하도록 프로젝트를 최대한 예쁘게 만들어보세요.
- [x] API 기본 사용법

# 완성하지 못한 부분 (문제점)

### 1. webpack-dev-sever의 hot reload기능을 사용하지 못했습니다.

서버에서 EMS와 CJS를 같이 사용하기 때문에 번들링을 해줘야합니다.

그래서 프론트 서버 번들링, 리액트 앱 번들링 **총 두 번 번들링을 하게됩니다.**

여기서 해결하지 못한 부분이 있습니다.

1. webpack-dev-server는 번들링 결과를 캐싱하여 개발 서버를 제공해주는데
   webpack-dev-server로 서버를 번들링하여 결과물을 개발 서버를 제공해줄 수 있는 방법을 못찾았습니다.
2. 프론트 서버와 프론트 리액트 앱 번들링을 순차적으로 진행하야하는데 두 entry는 rules가 달라야합니다. entry마다 rules를 다르게 설정하여 번들링하는 방법을 찾지 못했습니다.

### 2. React 18의 Suspense를 사용하지 못했습니다.

React18의 Steaming SSR은 서버 컴포넌트의 랜더링이 비동기적으로 동작합니다.

이를 활용할 생각이였으나 해결하지 못한 부분이 있습니다.

1. /detail 페이지로 요청이 들어올 떄, 서버에서 OMDB로 API를 보냅니다. 이떄 서버 컴포넌트는 로딩창(fallback)을 클라이언트에 제공하도록 만들고 싶은데 데이터 패칭 전략을 어떻게 해야할지 잘 모르겠습니다.

그래서 nextjs12 버전에서 SSR하는 방식으로 대체 해놓은 상태입니다.

### 3. 실시간 이미지 리사이징

실시간 이미지 리사이징이 선택과제에 있었는데,

[heropy님의 실시간 이미지 리사이징 블로그](https://heropy.blog/2019/07/21/resizing-images-cloudfrount-lambda/)처럼 구현은 힘들 것 같아서

picture태그와 이미지 CDN의 쿼리 스트링을 변경하는 방식을 생각 중 입니다.

# Reference

[ReactDom.renderToString메소드를 사용한 SSR세팅](https://github.com/Octanium91/react-app-ssr)

[New Suspense SSR Architecture in React Discusstion](https://github.com/reactwg/react-18/discussions/37)

[react 18 Suspense알아보기 throw Promise](https://velog.io/@xiniha/React-Suspense-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0)

[React 18 New Suspense SSR Demo](https://codesandbox.io/s/kind-sammet-j56ro?file=/src/index.js:267-278)

[compression](https://velog.io/@onejaejae/Node-jsExpress-%EB%AF%B8%EB%93%A4%EC%9B%A8%EC%96%B4-%EC%82%AC%EC%9A%A9-body-paresr-compression)

[babel-register 참고, 외에도 많은 바벨 관련 정보가 많습니다.](https://jbee.io/etc/Everything-about-babel/)

[webpack-prefetch](https://velog.io/@minsu2344/Vue-router-%EC%84%A4%EC%A0%95%EC%9C%BC%EB%A1%9C-%ED%8E%98%EC%9D%B4%EC%A7%80-%EB%AF%B8%EB%A6%AC-cache%EC%97%90-%EB%8B%B4%EC%95%84%EB%91%90%EA%B8%B0webpackChunkName-webpackPrefetch)

[react-router-dom v6](https://velog.io/@soryeongk/ReactRouterDomV6)
[react-route-dom ssr guides](https://reactrouter.com/en/main/guides/ssr)

[css minimize webpack plugin](https://webpack.js.org/plugins/css-minimizer-webpack-plugin/)

[webpack hot reload(미적용)](https://webpack.kr/guides/hot-module-replacement/)
