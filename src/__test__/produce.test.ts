import produce from "..";

describe("mini-immer", () => {
  it("can update readonly state via standard api", () => {
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
      draftState.address.city = "咸宁";
    });
    expect(nextState).toEqual({
      name: "张三",
      address: {
        street: "狮子山",
        city: "咸宁",
      },
      property: {
        age: 20,
        height: 175,
      },
    });
    expect(nextState !== baseState).toBeTruthy();
    expect(nextState.property === baseState.property).toBeTruthy();
    expect(nextState.name === baseState.name).toBeTruthy();
  });

  it("can update readonly state via standard api2", () => {
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
    const nextState = produce(baseState, () => {});
    expect(nextState).toEqual({
      name: "张三",
      address: {
        street: "狮子山",
        city: "武汉",
      },
      property: {
        age: 20,
        height: 175,
      },
    });
    expect(baseState === nextState).toBeTruthy();
    expect(nextState.property === baseState.property).toBeTruthy();
  });
});
