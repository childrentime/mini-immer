# MINI-IMMER

## Purpose

The purpose of this project is to create a minimal version of the immer library that illustrates the core principles of immer.

## Usage

Its usage is exactly the same as immer, but only supports object set and get operations

```ts
const baseState = {
      name: "张三",
      address: {
        street: "狮子山",
        city: "武汉",
      },
      property: {
        age: 20,
        height: 175,
      },
    };
const nextState = produce(baseState, (draftState) => {
    draftState.name = "李四";
    draftState.address.city = "咸宁";
});
expect(nextState).toEqual({
    name: "李四",
    address: {
    street: "狮子山",
    city: "咸宁",
    },
    property: {
    age: 20,
    height: 175,
    },
});
expect(nextState.property === baseState.property).toBeTruthy();
```
