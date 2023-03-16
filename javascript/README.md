# Javascript

> 모듈 만드는 방법은 아래와 같이 다양하다.

The Module pattern
Object literal notation
AMD modules
CommonJS modules
ECMAScript Harmony modules

### Object Literal Pattern

> 객체 리터럴 패턴은, 가장 일반적이고 간단한 형태의 모듈로 변수에 중괄호와 함께 프로퍼티와 메소드를 등록한 객체이다.

```javascript
const ex = {
  text: "hanpy",
  writeText: function () {
    text = "hanpy";
  },
};
```

- 위와 같이 글로벌로 변수를 선언하면, 일반적으로 브라우저에서 사용자에게 직접 노출되기 때문에 보안에 취약하다.

### Module Pattern

> 모듈 패턴의 핵심은 구성 요소가 다른 요소들로 부터 독립적으로 유지하는것에 있다.

```javascript
(function () {
  // 비공개 변수, 함수 선언
  return {
    // 공개 변수, 함수 선언
  };
})();
```

- 클로저와 익명함수를 사용하여, 변수가 충돌하지 않도록 해야한다.
- 즉시 실행함수로 변수를 함수안에서 보호할 수 있지만, 즉시실행함수는 사용 시마다 실행함수를 실행시켜야한다.

```javascript
const ex = (function () {
  let text = "hanpy";
  return {
    getText: function () {
      console.log(text);
    },
  };
})();

ex.getText(); // hanpy
ex.text; // undefined
```

### Revealing Module Pattern

> 공개 모듈 패턴은 위의 모듈 패턴의 모듈화를 유지한다. 그리고 함수와 변수를 정의 후에 공개 하려는 기능의 포인터를 반환한다.

```javascript
const ex = (function () {
  let text = "hanpy";
  let getText: function () {
    console.log(text);
  },
  return {
    get: getText
  }
})();

ex.get(); // hanpy
ex.getText(); // Error
```

공개적으로 접근할 수 있는 함수, 변수의 명칭을 재지정하여 가독성이 좋다. 그러나 함수에 접근 할 방법이 없고, 공개 함수 수정에 어려움이 있다.
