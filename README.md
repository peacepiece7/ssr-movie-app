# Move App Challenge

[결과물 보기](http://ec2-3-84-213-170.compute-1.amazonaws.com) (https적용 안했습니다!)

# 완성하지 못한 부분

### 1. webpack-dev-sever의 hot reload기능을 사용하지 못했습니다.

서버에서 EMS와 CJS를 같이 사용하기 때문에 번들링을 해줘야합니다.

그래서 프론트 서버 번들링, 리액트 앱 번들링 **총 두 번 번들링을 하게됩니다.**

[리엑트 팀에서도 번들링 전략을 어떻게 가저갈지 다양한 휴리스틱 전략을 연구 중으로 보임](https://github.com/reactjs/rfcs/blob/main/text/0188-server-components.md#drawbacks)

### 2. React 18의 Suspense를 사용하지 못했습니다.

React18의 Steaming SSR은 서버 컴포넌트의 랜더링이 비동기적으로 동작합니다.

이를 활용할 생각이였으나 해결하지 못한 부분이 있습니다.

/detail 페이지로 요청이 들어올 떄, 서버에서 OMDB로 API를 보냅니다. 

이떄 서버 컴포넌트는 로딩창(fallback)을 클라이언트에 제공하도록 만들고 싶었습니다. 

즉 streaming SSR로 특정 컴포넌트만 hydration을 늦게하고, api결과가 도착할때까지 해당 컴포넌트가 로딩화면을 보여주도록 하고싶었는데요.

서버에서 데이터 패칭시 원본을 클라이언트에 알릴 방법이 api 응답 결과를 문자열로 직렬화하여 html파일에 삽입하는 방식을 사용하고 있었기 때문에

서버는 useContext내에서 promise<pending>을 반환지 않게됩니다.

이렇게 서버에서 promise<pending>을 반환하지 않고 api 응답 결과를 기다렸다가 완성된 html파일을 보내는 방식은 로딩화면을 보여줄 수가 없습니다.


+ 내가 왜 RSC안해봤는지 까먹을까봐 적어놓는 글 
  
[이 데모처럼](https://github.com/reactjs/server-components-demo) *.server.js, *.client.js를 만들고, 서버 컴포넌트를 구분하는 방식을 적용해보고 싶었는데
개념만 이해하면 충분하고, nextjs 13번으로 RSC를 체험해보면 충분하다 생각했었습니다.


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

[heropy님의 실시간 이미지 리사이징 블로그(미적용)](https://heropy.blog/2019/07/21/resizing-images-cloudfrount-lambda/)
