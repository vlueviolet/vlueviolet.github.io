# module

## module(export & import)의 이해
javascript에서 module export&import는 표준화되지 않은 실험적인 기능이다.
nodejs 기반으로 백엔드를 할때에는 많은 파일들이 필요하고, 모듈을 불러오고 의존성 관계를 정리할 필요가 있는데
많은 브라우저에서 받아들이지 않은 대기중인 상황이라고 보면됨
최신 브라우저에서는 동작되지만 완전하지는 않다.
웹팩 기반으로 빌드환경을 만들고, es5로 변환하는 작업이 필요하다.

babel-core
babel-loader
babel-preset-es2015