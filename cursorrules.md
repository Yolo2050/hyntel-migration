# Cursor AI 설정 문서

이 문서는 `.cursorrules` 파일의 각 설정 항목에 대한 설명을 제공합니다.

## 파서 설정

- `parser`: "babel-eslint" - ESLint 파서 설정
- `parserOptions`:
  - `ecmaVersion`: 2020 - ECMAScript 버전 설정
  - `sourceType`: "module" - 모듈 소스 타입 설정

## 코드 스타일 설정

- `tabWidth`: 2 - 들여쓰기 간격을 2칸으로 설정
- `useTabs`: false - 들여쓰기에 탭 대신 스페이스 사용
- `semi`: false - 문장 끝 세미콜론 생략
- `singleQuote`: true - 문자열에 작은따옴표 사용
- `trailingComma`: "all" - 객체/배열의 마지막 항목에도 쉼표 사용
- `bracketSpacing`: true - 객체 리터럴의 중괄호 내부에 공백 추가
- `arrow-parens`: "avoid" - 화살표 함수의 매개변수가 하나일 때 괄호 생략
- `printWidth`: 80 - 한 줄의 최대 길이를 80자로 제한
- `endOfLine`: "auto" - 운영체제에 맞는 줄바꿈 문자 사용

## Vue.js 관련 설정

- `vueIndentScriptAndStyle`: true - Vue 파일의 script와 style 태그 내부 들여쓰기 적용

## 모던 JavaScript 기능 설정

- `preferConst`: true - 가능한 경우 let 대신 const 사용
- `arrowFunctions`: true - 전통적인 함수 대신 화살표 함수 사용
- `templateLiterals`: true - 문자열 연결 시 템플릿 리터럴 사용
- `destructuring`: true - 객체와 배열의 구조 분해 할당 사용
- `modules`: true - ES 모듈 시스템 사용
