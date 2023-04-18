function Element(data, priority) {
  this.data = data;
  this.priority = priority;
}

function PriorityQueue() {
  this.array = [];
}

PriorityQueue.prototype.getBuffer = function () {
  return this.array.map((element) => element.data);
};

PriorityQueue.prototype.isEmpty = function () {
  return this.array.length === 0;
};

// check set
console.log(Object.getOwnPropertyDescriptors(Element.prototype));
console.log(Object.getOwnPropertyDescriptors(PriorityQueue.prototype));

// 데이터 추가
PriorityQueue.prototype.enqueue = function (data, priority) {
  let element = new Element(data, priority);
  let added = false;

  for (let i = 0; i < this.array.length; i++) {
    if (element.priority < this.array[i].priority) {
      this.array.splice(i, 0, element);
      added = true;
      break;
    }
  }

  if (!added) {
    this.array.push(element);
  }

  return this.array.length;
};

// 데이터 삭제
PriorityQueue.prototype.dequeue = function () {
  return this.array.shift();
};

// test
let pq = new PriorityQueue();
pq.enqueue("han", 1);
pq.enqueue("py", 2);
pq.enqueue("one", 1);
pq.enqueue("three", 3);
console.log(pq);
pq.dequeue();
console.log(pq);

// 첫데이터
PriorityQueue.prototype.front = function () {
  return this.array.length === 0 ? undefined : this.array[0].data;
};

// 사이즈
PriorityQueue.prototype.size = function () {
  return this.array.length;
};

// 데이터 초기화
PriorityQueue.prototype.clear = function () {
  this.array = [];
};

console.log(pq.getBuffer());
console.log(pq.front());
console.log(pq.size());
