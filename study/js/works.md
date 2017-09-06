## 개발 업무 대응

### Dom Changed
#### [Plugin] jquery.domchanged
* dom 이 변경되었을 경우의 체크하는 [이벤트 플러그인](https://github.com/nasaorc/jquery-domchanged-plugin) (support Browser : ALL)

#### reInit() 제공
#### ajax 영역을 확인해서 ajax 아닌 영역 기준으로 이벤트 걸기

```javascript

<ul class="list_reply">
<li>
      <span class="class_img">
        <img src="img/@img_class.png" alt="">
      </span>
      <div class="info_box">
        <div class="nickname_box">
          <button type="button" class="usr_nickname">쥑쥑이</button>
          <div class="tooltip">
            <a href="#" class="view_posts">작성글 보기</a>
            <h2 class="blind">캐릭터 정보</h2>
            <ul class="caracter_lst">
            <li>
              <img src="img/icon_class_warlord.png" alt="클래스 아이콘" class="img_class">
              <span class="name">워로드</span>
              <strong class="level">LV 100</strong>
            </li>
            <li>
              <img src="img/icon_class_gunner.png" alt="클래스 아이콘" class="img_class">
              <span class="name">거너</span>
              <strong class="level">LV 100</strong>
            </li>
            <li>
              <img src="img/icon_class_sorcerer.png" alt="클래스 아이콘" class="img_class">
              <span class="name">소서러</span>
              <strong class="level">LV 100</strong>
            </li>
            <li>
              <img src="img/icon_class_assassin.png" alt="클래스 아이콘" class="img_class">
              <span class="name">어새신</span>
              <strong class="level">LV 100</strong>
            </li>
            <li>
              <img src="img/icon_class_mystic.png" alt="클래스 아이콘" class="img_class">
              <span class="name">미스틱</span>
              <strong class="level">LV 100</strong>
            </li>
            </ul>
          </div>
        </div>
        <div class="date_box">
          <button type="button" class="date"><span class="blind">작성일자</span>9분전</button>
          <div class="tooltip">2017.08.07 17시 10분<span class="blind">작성됨</span></div>
        </div>
      </div>
      <div class="write_txt">완전 굿굿~!!!!!!! 너무 너무 재밌어요ㅠㅠㅠ</div>
      <div class="reply_view_set">
        <div class="like_area">
          <span class="like_set like on">
            <input id="like_3" type="radio" name="like_set_3">
            <label for="like_3"><span class="txt"><span class="blind">덧글 추천하기, 추천 수</span><em class="num">46</em></span></label>
          </span>
          <span class="like_set hate">
            <input id="hate_3" type="radio" name="like_set_3">
            <label for="hate_3"><span class="txt"><span class="blind">덧글 반대하기, 반대 수</span><em class="num">20</em></span></label>
          </span>
        </div>
      </div>
      <div class="reply_set">
        <button type="button" class="btn_option">덧글 설정</button>
        <div class="layer_reply">
          <button type="button" class="btn btn_dec" data-layer-button="layer_dec" data-tooltip-name="tooltip_dec"><span class="txt">신고</span></button>
        </div>
      </div>
    </li>
    <li>
      <span class="class_img">
        <img src="img/@img_class.png" alt="">
      </span>
      <div class="info_box">
        <div class="nickname_box">
          <button type="button" class="usr_nickname">피치피치</button>
          <div class="tooltip">
            <a href="#" class="view_posts">작성글 보기</a>
            <h2 class="blind">캐릭터 정보</h2>
            <ul class="caracter_lst">
            <li>
              <img src="img/icon_class_warlord.png" alt="클래스 아이콘" class="img_class">
              <span class="name">워로드</span>
              <strong class="level">LV 100</strong>
            </li>
            <li>
              <img src="img/icon_class_gunner.png" alt="클래스 아이콘" class="img_class">
              <span class="name">거너</span>
              <strong class="level">LV 100</strong>
            </li>
            <li>
              <img src="img/icon_class_sorcerer.png" alt="클래스 아이콘" class="img_class">
              <span class="name">소서러</span>
              <strong class="level">LV 100</strong>
            </li>
            <li>
              <img src="img/icon_class_assassin.png" alt="클래스 아이콘" class="img_class">
              <span class="name">어새신</span>
              <strong class="level">LV 100</strong>
            </li>
            <li>
              <img src="img/icon_class_mystic.png" alt="클래스 아이콘" class="img_class">
              <span class="name">미스틱</span>
              <strong class="level">LV 100</strong>
            </li>
            </ul>
          </div>
        </div>
        <div class="date_box">
          <button type="button" class="date"><span class="blind">작성일자</span>9분전</button>
          <div class="tooltip">2017.08.07 17시 10분<span class="blind">작성됨</span></div>
        </div>
      </div>
      <div class="write_txt">완전 굿굿~!!!!!!! 너무 너무 재밌어요ㅠㅠㅠ</div>
      <div class="reply_view_set">
        <div class="like_area">
          <span class="like_set like">
            <input id="like_5" type="radio" name="like_set_5" checked="">
            <label for="like_5"><span class="txt"><span class="blind">덧글 추천하기, 추천 수</span><em class="num">46</em></span></label>
          </span>
          <span class="like_set hate on">
            <input id="hate_5" type="radio" name="like_set_5">
            <label for="hate_5"><span class="txt"><span class="blind">덧글 반대하기, 반대 수</span><em class="num">20</em></span></label>
          </span>
        </div>
      </div>
      <div class="reply_set">
        <button type="button" class="btn_option">덧글 설정</button>
        <div class="layer_reply">
          <button type="button" class="btn btn_dec" data-layer-button="layer_dec" data-tooltip-name="tooltip_dec"><span class="txt">신고</span></button>
        </div>
      </div>
    </li>
    //... 이하 생략
</ul>

$('.list_reply').on('click', '.btn_option', function (e) {
    var target = $(e.currentTarget); //.btn_option
    //이하 레이어 열리는 등 이벤트 실행
});

this.replyWrap.on('click', this.opts.replySetBtn, $.proxy(this.layerView, this));
```


