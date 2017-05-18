# 내컴퓨터 서버로 구축하기

### IIS 설정
1. [제어판] > [프로그램 삭제] > [윈도우 켜기/끄기] 클릭하여 아래 이미지에 표시된 항목을 모두 체크한다.<br>빨간색은 필수 체크, 파란색은 추천 체크이나 모두 체크해주는게 좋다.

![](https://raw.githubusercontent.com/vlueviolet/vlueviolet.github.io/master/iis_setting/img/img.png)
<br><br>
2. [윈도우] > IIS를 입력하여 'IIS(인터넷 정보 서비스) 관리자'를 실행한다.

### PHP 설치
1. IIS 관리자에서 '새 웹 플랫폼 구성 요소 가져오기' 클릭하면 '웹 플랫폼 설치 관리자' 메뉴가 생기게 된다.<br>
<br><br>
2. 관리자 실행후, [제품] 탭에서 아래 이미지의 프로그램들을 설치한다.<br>
  ![](https://raw.githubusercontent.com/vlueviolet/vlueviolet.github.io/master/iis_setting/img/img3.jpg)
<br><br>
3. 프로그램을 모두 설치하고나면, 아래와 같이 'PHP Manager'가 생성된 것을 볼 수 있다.<br>
  ![](https://raw.githubusercontent.com/vlueviolet/vlueviolet.github.io/master/iis_setting/img/img10.png)
   또한, 프로그램 폴더에 PHP폴더가 생성된다.<br>
  ![](https://raw.githubusercontent.com/vlueviolet/vlueviolet.github.io/master/iis_setting/img/img8.png)
<br><br>
4. php.ini 파일 수정
  php가 설치된 폴더로 들어가서 아래 2개의 파일 중 아무 파일을 복사해서 php.ini 파일로 만들어준다.
  주석(;)으로 되어있다면 ;를 삭제해서 주석을 풀어준다. 변경할 코드는 아래와 같다.
  ![](https://raw.githubusercontent.com/vlueviolet/vlueviolet.github.io/master/iis_setting/img/img12.png)

  + default_charser = "UTF-8"
  + date.timezone = "Asia/Seoul"
  + short_open_tag = On
  + extension_dir = ".\ext"
  + log_errors = On
  + cgi.force_redirect = 0 : 이걸 1로 해두면 IIS에서 PHP가 죽는다고 하니 0으로 설정 요망 
  + cgi_fix_pathinfo = 1 
  + fastcgi.impersonate = 1 
  + fastcgi.loggin = 0 : 이것도 설정해 두지 않으면, IIS에선 계속 HTTP500 에러가 난다고 한다.
  <br><br>

5. [Register new PHP version] 을 클릭해서 [php-cgi.exe]가 있는 폴더 경로를 넣어준다.<br>
  ![](https://raw.githubusercontent.com/vlueviolet/vlueviolet.github.io/master/iis_setting/img/img9.png)
<br><br>
6. [Check phpinfo()] 클릭해서 아래와 같이 php 정보 페이지가 뜬다면 잘 설치된 것이다.<br>
  ![](https://raw.githubusercontent.com/vlueviolet/vlueviolet.github.io/master/iis_setting/img/img11.png)

### 만약, 500 에러가 뜬다면?
프로젝트 로컬 경로에서 .php파일 호출여부를 확인해보자.<br>
일부 프로젝트에서는 외부 경로에서 다운받게끔 되어있어, 로컬에서는 불러올 php파일이 없는 경우가 있다.<br>
헤더, 푸터 등을 단순히 php를 활용해서 html에 include 하는 형태라면, 아래와 같이 [처리기 매핑]을 수정해야 한다.<br>
<br>
![](https://raw.githubusercontent.com/vlueviolet/vlueviolet.github.io/master/iis_setting/img/img13.png)
