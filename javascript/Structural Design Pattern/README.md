# Structural Design Patterns

https://velog.io/@wejaan/%EB%B2%88%EC%97%AD%EC%9A%94%EC%95%BD-JavaScript-Design-Patterns-Structural-Design-Patterns

> 클래스를 더 큰 구조로 조립하는 동시에, 구조를 유연하고 효율적으로 유지하는 방법을 설명한다.

## Adapter

> 기존 클래스의 인터페이스를 다른 인터페이스에서 사용할 수 있게 하는 디자인 패턴

#### 사용 시기

- 기존 구조를 새 구조로 유연하게 전환
- 새 구조를 기존 구조로 유연하게 전환
- ! 이전 API가 여전히 작동 할 수 있도록 리팩 시 사용

```javascript
class OldAdapter {
  request() {
    console.log("request");
  }
}

class NewAdapter {
  constructor(adapter) {
    this._adapter = adapter;
  }

  request() {
    this._login();
    this._adapter.request();
  }

  _login() {
    console.log("login");
  }
}

function run() {
  const oldAdapter = new OldAdapter();
  const newAdapter = new NewAdapter(oldAdapter);

  newAdapter.request();
}
```

## Bridge

> 추상화와 구현을 분리하여 두 개가 독립적으로 변할 수 있는 패턴으로, 이중 Adapter Pattern이라고도 한다.

#### 사용 시기

- Adapter는 두 클래스간의 종속성을 미리 예측하지 못하고 개발 시 필요 패턴이라면, Bridge는 각 클래스가 독립적으로 진화 할 수 있을 때 사용하는 패턴.

```javascript
class Printer {
  constructor(ink) {
    this.ink = ink;
  }
}

class APrinter extends Printer {
  constructor(ink) {
    super(ink);
  }

  print() {
    return `Printer: A, Ink: ${this.ink.get()}`;
  }
}

class BPrinter extends Printer {
  constructor(ink) {
    super(ink);
  }

  print() {
    return `Printer: B, Ink: ${this.ink.get()}`;
  }
}

class Ink {
  constructor(type) {
    this.type = type;
  }

  get() {
    return this.type;
  }
}

class AInk extends Ink {
  constructor() {
    super("A-based");
  }
}

class BInk extends Ink {
  constructor() {
    super("B-based");
  }
}

function run() {
  const aInk = new AInk();
  const bInk = new BInk();

  const aPrinter = new APrinter(aInk);
  // const aPrinter = new APrinter(bInk);

  const bPrinter = new BPrinter(bInk);
  // const bPrinter = new BPrinter(aInk);

  aPrinter.print();
  bPrinter.print();
}
```

## Facade Pattern

Facade : 건물의 정면

> 하나의 단순화된 인터페이스를 통해 시스템 안에 내표되어 있는 기능을, 프레임워크나 기타 서브 클래스 에서 쉽게 접근 할 수 있도록 하는 패턴이다.

- subSystems 또는 subclasses로 구성된 복잡함으로부터 쉽게 보호해준다. 쉽게 말하면, 음식점에 간 소비자는 음식만 받아서 먹으면 되지, 레시피나 내부 event는 몰라도 된다.
- 내부적으로는 복잡하게 기능을 구현하지만, 외부 사용자 기준으로는 메서드 하나로 사용하면 된다.

## Flyweight Pattern

> 세분화된 객체 간 효율적인 데이터 공유를 둔 페턴이다.

- 동일한 객체가 2번 인스턴스화 되면 객체가 재활용 된다.

## Proxy Pattern

> 대리자의 의미 그대로, 특정 객체에 과도한 압력을 피하기 위해 특정 객체에 대한 제어된 엑세스를 지원하는 간접적인 level을 추가한다.

- 많은 네트워크 요청이 들어올 때, 불필요한 중복 네트워크 요청을 피하고 싶을 떄 유용하게 사용가능하다.

// author test
