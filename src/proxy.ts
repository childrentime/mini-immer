import { latest } from "./common";
import { DRAFT_STATE } from "./env";

export interface ProxyState {
  modified: boolean;
  base: any;
  copy: any;
  parent?: ProxyState
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
    /* 如果没有下面这个判断 我们即使修改了对象，它的modified也为false
    因此返回的对象将和原对象地址相等！*/
    // 获取的该对象是 base上的 还没有复制 应该对它进行复制
    if (state.base[prop] === value) {
      // 将base浅拷贝到copy中
      if (!state.copy) {
        state.copy = { ...state.base };
      }
      return (state.copy[prop as any] = createProxy(value,state));
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
      // 将state的modified属性以及parent都修改为true
      markChanged(state)
    }

    state.copy![prop] = value;
    return true;
  },
};

export function createProxy<T>(base: T,parent?: ProxyState) {
  const state: ProxyState = {
    modified: false,
    base: base,
    copy: null,
    parent
  };
  const proxy = new Proxy(state, objectTraps);
  return proxy;
}

// 递归标记
function markChanged(state: ProxyState) {
	if (!state.modified) {
		state.modified = true
		if (state.parent) {
			markChanged(state.parent)
		}
	}
}
