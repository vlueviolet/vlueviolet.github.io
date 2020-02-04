# 현재 커서 위치 알아오기

## Selection

- 웹에서 텍스트를 조작하는 가령 마우스 드래그, 텍스트 더블 클릭을 하는 이벤트들을 javascript 영역에서 획득할 수 있는 Web API
- 사용자가 특정 텍스트 영역을 선택하거나, 삭제, 임의의 텍스트를 가져올 수 있음

## Selection 객체

window.getSelection()이나 다른 메소드의 호출로 생성되는 객체

### Selection의 주요 속성

#### Selection.anchorNode

시작 노드

#### Selection.anchorOffset

시작 노드에서 anchor 의 오프셋.<br>
anchorNode 가 텍스트 노드이면 anchor 이전의 문자열의 개수이고,<br>
anchorNode 가 엘리먼트일 경우엔 anchor 보다 앞에 있는 자식 노드의 개수를 의미한다.

#### Selection.focusNode

끝 노드, 현재 커서가 깜빡이는 위치의 노드

#### Selection.focusOffset

끝 노드에서 focus 의 오프셋.<br>
focusNode 가 텍스트 노드이면 focus 이전의 문자열의 개수이고,<br>
focusNode 가 엘리먼트일 경우엔 focus 보다 앞에 있는 자식 노드의 개수를 의미한다.

#### Selection.isCollapsed

셀렉션의 시작지점과 끝지점이 동일한지의 여부

#### Selection.rangeCount

셀렉션 내의 레인지 개수

### Range 객체

Range 객체는 문서에서 선택된 영역의 데이터를 추출하거나 조작할 때 <br>사용하는 객체, 문서의 특정 부분을 정의한다고 보면 됨

#### 인스턴트 생성

- Document.createRange()
- Document.craetRangeAtPoint()
- Selection.getRangeAt()
- Range() constructor

#### 속성

- Range.collapsed : range의 시작과 끝의 동일여부
- Range.commonAncestorContainer : 시작 컨테이너와 끝 컨테이너를 포함하는 공통의 (최초) 부모 노드
- Range.endContainer : range가 끝나는 지점의 노드
- Range.endOffset : endContainer에서의 offset
- Range.startContainer : range가 시작하는 지점의 노드
- Range.startOffset : startContainer에서의 offset

## Ref.

- [Web API](https://developer.mozilla.org/en-US/docs/Web/API)
- [Window.getSelection](https://developer.mozilla.org/ko/docs/Web/API/Window/getSelection)
- [Selection 과 Range 의 이해](https://ohgyun.com/547)
- [Range](http://ezcode.kr/study/view/224)
- [요소의 커서 포커스 위치와 변경
  ](http://frontend.diffthink.kr/2017/10/blog-post_12.html?m=0)
- [selection - 설명 잘 되어있음](http://mohwa.github.io/blog/javascript/2015/09/15/Selection/)
