# nvm
사내에서 프로젝트할때, 다양한 환경에 따라 node 버전의 영향을 받는다.  
최신 버전을 사용하면 좋겠지만, 오랫동안 이어왔거나 기존 작업자의 셋팅에 따라 하위 버전을 사용하기도 한다.  
이럴 때 사용하면 좋은 툴이 `nvm`이다. 
`nvm`은 다양한 node 버전을 사용할 수 있게 해주는 툴이다.  

## nvm 설치 방법
설치는 [nvm github](https://github.com/nvm-sh/nvm#install-script)에 나와있다.  

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

설치가 완료되면, nvm을 등록해야 한다.
현재 zsh 터미널을 사용하고 있어 zsh를 기준으로 아래를 실행한다.

```bash
vim ~/.zshrc
```

vim 편집기 안에 아래 구문을 추가한다.
```
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

입력한 내용을 실행해준다.

```bash
source ~/.zshrc
```

nvm이 잘 설치가 되었다면, .nvm 폴더로 접근 가능하다.

```bash
cd .nvm
```

nvm으로 설치가능한 node 목록을 확인할 수 있다.

```bash
nvm ls-remote
```
<img width="134" alt="스크린샷 2020-08-08 오후 3 51 25" src="https://user-images.githubusercontent.com/26196090/89704492-08d5c700-d98f-11ea-8bc4-5a4144765595.png">


## node 설치
nvm으로 node를 설치한다.  
이때 버전은 최신 버전으로 설치된다.

```bash
nvm install node
```

<img width="575" alt="스크린샷 2020-08-08 오후 3 49 58" src="https://user-images.githubusercontent.com/26196090/89704461-de840980-d98e-11ea-801a-68af046357ab.png">

## node 특정 버전 설치
특정 버전을 설치하려면 아래와 같이 하면 된다.

v10 같이 major 버전으로만 입력하면, v10에서 가장 최신 버전인 `v10.22.0`이 설치된다.  

v10.16.3같은 patch 버전까지 디테일한 버전으로 설치하면, `v10.16.3`이 설치됨을 알 수 있다.

```bash
nvm install v10
nvm install v10.16.3
```
<img width="560" alt="스크린샷 2020-08-08 오후 3 52 34" src="https://user-images.githubusercontent.com/26196090/89704512-3753a200-d98f-11ea-816e-ac763cf19422.png">

ls 명령어로 현재 설치되어있는 node 버전들을 확인 할 수 있다.

```bash
nvm ls
```

## node 버전 바꾸기
설치된 노드들은 아래 명령으로 바꿀 수 있다.

```bash
nvm use v10.16.3
node -v

nvm use v14.7.0
node -v
```

<img width="229" alt="스크린샷 2020-08-08 오후 3 59 58" src="https://user-images.githubusercontent.com/26196090/89704616-3b33f400-d990-11ea-9dc7-9c0b9d2d8351.png">
