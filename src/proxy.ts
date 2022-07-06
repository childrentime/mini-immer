import { latest } from "./common";
import { DRAFT_STATE } from "./env";

export interface ProxyState {
  modified: boolean;
  base: any;
  copy: any;
}

const objectTraps: ProxyHandler<ProxyState> = {
  get(state, prop) {
    if (prop === DRAFT_STATE) {
      return state;
    }
    const source = latest(state);
    const value = source[prop];
    // 原始值直接返回
    if (typeof value !== "object") {
      return value;
    }
    // 获取的该对象是 base上的 还没有复制 应该对它进行复制
    if (state.base[prop] === value) {
      // 将base浅拷贝到copy中
      if (!state.copy) {
        state.copy = { ...state.base };
      }
      return (state.copy[prop as any] = createProxy(value));
    }
    return value;
  },
  set(state, prop, value) {
    // 如果没有修改过 则需要浅拷贝
    if (!state.modified) {
      // 将base浅拷贝到copy中
      if (!state.copy) {
        state.copy = { ...state.base };
      }
      // 将modified属性修改为true
      state.modified = true;
    }

    state.copy![prop] = value;
    return true;
  },
};

export function createProxy<T>(base: T) {
  const state: ProxyState = {
    modified: false,
    base: base,
    copy: null,
  };
  const proxy = new Proxy(state, objectTraps);
  return proxy;
}
