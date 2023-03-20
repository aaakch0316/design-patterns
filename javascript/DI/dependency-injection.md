https://velog.io/@moongq/Dependency-Injection

# Dependency-indjection

## base module

```javascript
//users-service.js
const User = require("./User");
const UsersRepository = require("./users-repository");

async function getUsers() {
  return UsersRepository.findAll();
}

async function addUser(userData) {
  const user = new User(userData);

  return UsersRepository.addUser(user);
}

module.exports = {
  getUsers,
  addUser,
};
```

- users-service.js : 비지니스 로직을 책임
- UserRepository 데이터 책임

### [단점] service가 repository와 연결되어 있다.

- repository 변경 시 모두 다 변경해야한다. > 확장성이 떨어진다.
- 모듈 테스트(jest의 Mock나 Sinon)가 힘들다. getUser 확인 시 UsersRepository도 가짜 객체 만들어야한다. > 외부 라이브러리를 최소화 하는 것이 좋다.

```javascript
const UsersRepository = require("./users-repository");
const UsersService = require("./users");
const sinon = require("sinon");
const assert = require("assert");

describe("Users service", () => {
  it("gets users", async () => {
    const users = [
      {
        id: 1,
        firstname: "Joe",
        lastname: "Doe",
      },
    ];

    sinon.stub(UsersRepository, "findAll", () => {
      return Promise.resolve(users);
    });

    assert.deepEqual(await UsersService.getUsers(), users);
  });
});
```

## 의존성 주입

- users-service와 repository를 분리한다. 즉 인자로 받아서 한다.

```javascript
//users-service.js
const User = require("./User");

function UsersService(usersRepository) {
  // check here
  async function getUsers() {
    return usersRepository.findAll();
  }

  async function addUser(userData) {
    const user = new User(userData);

    return usersRepository.addUser(user);
  }

  return {
    getUsers,
    addUser,
  };
}

module.exports = UsersService;
```

##### 테스트

- sinon 같은 외부 라이브러리를 사용할 필요가 없어졌다.

```javascript
const UsersService = require("./users");
const assert = require("assert");

describe("Users service", () => {
  it("gets users", async () => {
    const users = [
      {
        id: 1,
        firstname: "Joe",
        lastname: "Doe",
      },
    ];

    const usersRepository = {
      findAll: async () => {
        return users;
      },
    };

    const usersService = new UsersService(usersRepository);

    assert.deepEqual(await usersService.getUsers(), users);
  });
});
```

## javascript Class DI

- 생성자(constructor) 사용
- class 사용 시 의좀성 주입이 더욱 쉽다.

```javascript
class UsersService {
  constructor({ usersRepository, mailer, logger }) {
    this.usersRepository = usersRepository;
    this.mailer = mailer;
    this.logger = logger;
  }

  async findAll() {
    return this.usersRepository.findAll();
  }

  async addUser(user) {
    await this.usersRepository.addUser(user);
    this.logger.info(`User created: ${user}`);
    await this.mailer.sendConfirmationLink(user);
    this.logger.info(`Confirmation link sent: ${user}`);
  }
}

module.exports = UsersService;

const usersService = new UsersService({
  usersRepository,
  mailer,
  logger,
});
```

## typescript Class DI

- js 보다 더 쉽다.

```javascript
type UsersDependencies = {			// Here is all dependencies.
  usersRepository: UserRepository
  mailer: Mailer
  logger: Logger
};

export class UserService {
  constructor(
  	private dependencies: UsersDependenceis			// looks better isnt it?
  ) {}

  async findAll() {
    return this.dependencies.usersRepository.findAll();
  }

  async addUser(user) {
    await this.dependencies.usersRepository.addUser(user);		// more easy to access dependencies
    this.dependencies.logger.info(`User created: ${user}`);
    await this.dependencies.mailer.sendConfirmationLink(user);	// more easy to access dependencies
    this.dependencies.logger.info(`Confirmation link sent: ${user}`);
  }
}

const usersService = new UserService({
  usersRepository,
  mailer,
  logger
});
```

## typescript Function DI

```javascript
type UsersDependencies = {
  usersRepository: UsersRepository
  mailer: Mailer
  logger: Logger
};

export const usersService = (dependencies: UsersDependencies) => {
  const findAll = () => dependencies.usersRepository.findAll();
  const addUser = user => {
    await dependencies.usersRepository.addUser(user)
    dependencies.logger.info(`User created: ${user}`)
    await dependencies.mailer.sendConfirmationLink(user)
    dependencies.logger.info(`Confirmation link sent: ${user}`)
  };

  return {
    findAll,
    addUser
  };
}

const service = usersService({
  usersRepository,
  mailer,
  logger
});

```
