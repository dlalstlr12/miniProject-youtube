### Mini Project Youtube API

## API 설계 내용

### 회원

- 로그인
- 회원 가입
- 회원 탈퇴

회원은 계정 1개당 채널 100개를 가질 수 있다..

### 채널

- 채널 생성
- 채널 수정
- 채널 삭제

### 로그인 페이지

1. 화면 생성 API X
2. 로그인 버튼 클릭 ⇒ **id,pwd 로그인 시켜줄 API**

### 회원 가입 페이지

1. 화면 생성 API X
2. 회원 가입 버튼 클릭 시, id, pwd, 이름 ⇒ **회원 가입 시켜줄 API**

### 마이 페이지

1. 화면 생성 ⇒ **회원 정보 조회 API**
2. 회원 탈퇴 버튼 클릭 시 ⇒ **회원 탈퇴 시켜줄 API**

### 회원 API 설계

회원

1. 로그인 : POST(body가 있기때문에 GET이 아니라 POST 사용) /login
    - req : body (id, pwd)
    - res : `${name}님 환영합니다` // 👉메인 페이지
2. 회원 가입 : POST /join
    - req : body (id, pwd, name)
    - res : `${name}님 환영합니다` // 👉 로그인 페이지
3. 회원 정보 조회(회원 개별 조회) : GET /users
    - req : body(userId)
    - res : id, name
4. 회원 탈퇴 : DELETE /users
    - req : body(userid)
    - res : `${name}님 다음에 또 뵙겠습니다.` or 메인 페이지
    

### 채널 API 설계(URL, http method/status, res/req)

채널

1. 채널 생성 : POST /channels
    - req : body (channelTitle, ****userId)
    - res 201 : `${channelTitle}님 채널을 응원합니다.`
2. 채널 수정 : PUT /channels/:id
    - req : URL (id), body (channelTitle)
    - res 200 : `채널명이 (기존)${channelTitle}에서 (바뀐)${channelTitle}로 변경되었습니다.`
3. 채널 삭제 : DELETE /channels/:id
    - req : URL (id)
    - res 200 : `${channelTitle}삭제 되었습니다.` ⇒메인 페이지..
4. 채널 전체 조회 : GET /channels
    - req : body(userId)
    - res 200 : 채널 전체 데이터 list, json array
5. 채널 개별 조회 : GET /channels/:id
    - req : URL (id)
    - res 200 : 채널 개별 데이터

### 채널 생성 페이지

1. 채널 생성 버튼 클릭 시 ⇒입력받은 채널명을 받아서 **채널 생성 API**

### 채널 관리 페이지

1. 화면 출력 ⇒ 이 회원이 소유한 **전체 채널 조회 API**
2. 삭제 버튼 클릭 시 ⇒ **개별 채널 삭제 API**

### 채널 수정 페이지

1. 기존 **채널 채널 정보 조회 API**
2. 수정 완료 버튼 클릭 시 ⇒ **개별 채널 수정 API**
