# 동기(sync) 비동기(async)의 개념에 대한 가장 직관적인 이해

- URL : [inflearn](https://www.inflearn.com/course/sync-async-%EA%B0%9C%EB%85%90-%EC%9D%B4%ED%95%B4)
- 강사 : 앨런(Allen)


## 쓰레드 개념

<image src="https://user-images.githubusercontent.com/26196090/74625048-1f445800-518e-11ea-8bd8-78087a5b8999.png" height="200">

## 동기(synchronous) vs 비동기 (asynchronous)

### 비동기
* task-1 작업을 다른 쓰레드로 보내고 작업이 완료되는지에 대해 기다리거나, 신경을 쓰지 않는다.  
task-2를 시작할 수 있다.
* 즉, 작업을 다른 쓰레드에서 하도록 시킨후,  
그 작업이 끝나길 기다리지않고, 다음 일을 진행한다.  
(기다리지 않아도, 다음 작업을 생성할 수 있다.)

* 주로 서버와의 통신에서 이 개념을 많이 사용한다.

<image src="https://user-images.githubusercontent.com/26196090/74624918-95948a80-518d-11ea-9c0f-1bb05d13a346.png" height="200">

### 동기
* 다른 쓰레드에 task-1를 보내고, task-1가 완료될 때까지 기다린다.  
* 내 쓰레드에서는 task-1이 완료될 때까지 다른 일을 하지 않는다.

* 즉, 작업을 다른 쓰레드에서 하도록 시킨 후,  
그 작업이 끝나길 기다렸다가 다음 일을 진행한다.  
(기다렸다가 다음 작업을 생성할 수 있다.)

<image src="https://user-images.githubusercontent.com/26196090/74624913-93323080-518d-11ea-9b6a-5417503799b2.png" height="200">



## 직렬 (serial) vs 동시 (concurrent)

### 직렬
* 다른 **하나의 쓰레드** 에서 task를 수행하는 것  
* 즉, 메인에서 분산처리 시킨 작업을 **다른 한개의 쓰레드** 에서 처리
* 순서가 중요한 작업을 처리할 때 사용

<image src="https://user-images.githubusercontent.com/26196090/74625269-1a33d880-518f-11ea-8d52-446d80c7ec35.png" height="200">

### 동시
* **여러 개의 쓰레드** 에서 task를 수행하는 것  
* 즉, 메인에서 분산처리 시킨 작업을 **다른 여러개의 쓰레드** 에서 처리
* 각자 독립적이지만, 유사한 여러개의 작업을 처리할 때 사용

<image src="https://user-images.githubusercontent.com/26196090/74625272-1c963280-518f-11ea-9437-22fcde09567d.png" height="200">

### 비동기와 동시란 말이 같은 말인가? 
- 작업 결과를 기다리는 여부에 따르는 개념이 동기, 비동기
- 작업을 다른 쓰레드로 보내느냐의 개념이 동시, 정렬


## 왜 동시성(concurrency) 프로그래밍이 필요할까?
- 이미지를 다운받는 작업을 쓰레드1에서만 시킨다면 화면이 버벅 거릴 것이다.
- 네트웍과 관련된 작업들은 다른 쓰레드에서 작업하도록 해야한다.
- 성능, 반응성 같은 최적화에 중요하다.
