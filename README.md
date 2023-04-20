# SSR Movie APP

# Reference

[ReactDom.renderToString메소드를 사용한 SSR세팅](https://github.com/Octanium91/react-app-ssr)

[New Suspense SSR Architecture in React Discusstion](https://github.com/reactwg/react-18/discussions/37)

[React 18 New Suspense SSR Demo](https://codesandbox.io/s/kind-sammet-j56ro?file=/src/index.js:267-278)

# scripts

### start:sever:dev

- .ssr-server-cache/server.js 실행 및 감시

### bundler:server:dev|prod

server를 다시 빌드함
todo :

1. bulild파일이 변경될 경우 다시 빌드해야함

### bundler:fe:dev

fe를 ./src를 번들링 하여 ./build에 결과를 출력함 ./src가 변경될 경우 재빌드 함

### start:sever:dev|prod

server.js를 실행함
dev모드시 ./build파일이 변경되면 재빌드
