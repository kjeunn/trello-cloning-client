## Trello Cloning

프로젝트를 관리 하는 Trello App을 서버와 클라이언트 모두 직접 만들어 봤습니다.<br />
[ URL ]  http://trello-cloning-client-deploy.s3-website.ap-northeast-2.amazonaws.com/

## 사용 예제

1. 트렐로에서 사용하는 것처럼 보드/리스트/카드 를 생성/수정/추가/삭제 할 수 있습니다. 
2. 회원가입 및 로그인 / 회원 탈퇴가 가능합니다.
3. 내정보 (비밀번호)를 수정할 수 있습니다.


## 개발 환경 설정

1. git clone https://github.com/kjeunn/trello-cloning-client.git 로 현 저장소를 clone합니다.
2. cd trello-cloning-client 로 이동합니다.
3. ```npm install```로 개발환경을 설치한 후 이용합니다.


## 업데이트 내역

- Ver 0.5
  - 회원가입 시, email format checking 적용
- Ver 0.4
  - favicon & tabname 적용
- Ver 0.3
  - react-cookie 적용
  - setting-page 일부 수정
  - refactoring board-list-card
- Ver 0.2
  - bootstrap css 적용
- Ver 0.1
  - 첫 출시
