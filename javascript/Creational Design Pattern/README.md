# Creational Design Pattern

> https://refactoring.guru/design-patterns/creational-patterns 근본 개념
> 기존 코드의 유연성과 재사용을 증가시키는 다양한 객체를 제공한다.

## Prototype Pattern

> 프로토타입 instance를 사용하여 기존에 생성할 오브젝트의 종류를 지정하고 기존 오브젝트의 '뼈대(sdeleton)'에서 새 오브젝트를 생성하여 성능을 높이고 메모리 공간(footprints)를 최소화 한다.

- 기준이 되는 객체를 변경하면, Object.create로 생성한 나머지 객체도 변화하기 한다.

## Singleton Pattern ( =Strict Pattern )

> 클래스에 인스턴스가 하나만 있는지 확인 후 전역으로 access point를 제공한다. 여러개의 객체를 생성하여도 최조의 객체를 사용한다. 그리고 클로저를 사용하여 객체 공유를 한다.

- 다른 인스턴스를 만드려고 시도 시 이미 존재하는 refernce를 반환한다.
- 동일한 연결이 필요한 객체 생성이나, 단하나만 존재해야하는 객체 생성 시 유용하게 사용할 수 있다.
- [단점] 숨겨진 의존성, 의존성 분리, 다중 인스턴스 생성 시 어려움이 있다.

# Structural Design Patterns

> 클래스를 더 큰 구조로 조립하는 동시에, 구조를 유연하고 효율적으로 유지하는 방법을 설명한다.

# Behavioral Design Patterns

> 알고리즘 및 개체 간의 책임 할당과 관련이 있다.
