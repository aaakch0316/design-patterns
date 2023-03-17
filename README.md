# design-patterns

## Factory Pattern

> 객체를 생성하는 패턴 중 하나이다.

- new 키워드를 사용한 constructor 함수가 아닌 일반 하뭇에서 객체를 반환하는 것을 factory function이라 한다.
- 생성 시 매번 새로운 인스턴스를 반환해 준다.

```javascript
function makeCookie() {
  return {
    type: "cookie",
    price: "100",
    sult: "20",
  };
}

const cookie1 = makeCookie();
```

아래는 여러 팩토리 함수 조합하여 다른 팩토리 함수 만들기도 가능하다

```javascript
function startTeaTime() {
  let time = new Date();
  let hh = time.getHours();
  let mm = time.getMinutes();
  let ss = time.getSeconds();

  console.log(`${hh}:${mm}:${ss}, let's have tea!`);
}

function EarlgreyFactory(count) {
  const tea = {};

  tea.teabags = count;
  tea.name = "Earl grey";
  tea.caffeine = "strong";
  tea.milkAdded = true;
  tea.drink = function () {
    this.teabags -= 1;
    console.log(`${this.teabags} tea bags left`);
  };
  tea.start = startTeaTime;

  return tea;
}

const blackTea = EarlgreyFactory(10);
blackTea.drenk();
```

위에서는 startTeaTime이라는 메소드를 공유한다. startTeaTime가 여러개 쓰인다면, 여러 메소드를 공유할 것이다.
다른 더 간단하게 코드를 공유하는 패턴에는 Mixin 이 있다.

https://im-developer.tistory.com/141
