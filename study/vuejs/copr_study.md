# vuejs 스터디

## 1. vuejs를 이용한 데이터바인딩

gitlab 코드 : [http://bit.ly/2IZUnyg](http://bit.ly/2IZUnyg)

price, news 데이터 fetch, 값 비교를 통한 updated 알림

스크롤시, 리스트 개수 10개씩 추가 fetch

모달 팝업 테스트

[](./images/1.png)

[](./images/2.png)

[](./images/3.png)

[](./images/4.png)

## 2. 로그인

gitlab : [http://bit.ly/2IUDMw0](http://bit.ly/2IUDMw0)

로컬 db서버 셋팅을 통한 로그인 서버 구축 경험

로그인 유효성 검사, 로그인 완료후 홈까지 이동까지만 구현

공통 api 호출 함수를 활용한 get, post 처리

[](./images/5.png)

[](./images/6.png)

[](./images/7.png)

## 3. 타임라인

gitlab : [http://bit.ly/2IWMfPe](http://bit.ly/2IWMfPe)

BE팀에서 제공된 api 활용을 통한 비동기 데이터 바인딩

- 로그인

    id, password 입력시 버튼 활성화
    제공되는 api 활용한 로그인, 로그아웃 처리

[](./images/8.png)

- 대시보드
리스트 fetch, [vue-awesome-swiper](https://www.npmjs.com/package/vue-awesome-swiper) 적용

[](./images/9.png)

- 프로젝트
    - 리스트 fetch, 즐겨찾기 toggle
    - 프로젝트 생성/삭제, 제목 수정
    - vue-router > children을 활용한 프로젝트 상세 페이지 이동
    children으로 선언된 값을 props로 부모에게 전달 가능

        [localhost:](http://localhost:5050/projects)5050/projects       // 프로젝트 메인
        localhost:5050/projects/p/20  // 프로젝트 20번 상세 페이지

    - 공통 사용되는 filter를 전역으로 뺌
    - 컴포넌트간 event bus 활용 (진행중)

[](./images/10.png)

[](./images/11.png)

[](./images/12.png)

[](./images/13.png)
