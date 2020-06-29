import { ReducersMapObject, AnyAction, StateFromReducersMapObject } from "@reduxjs/toolkit";

/**
 * 如果你还不知道combineReducers是什么, 可以先参考官方文档: 
 * `https://redux.js.org/api/combinereducers`
 * 或 `https://redux.js.org/faq/reducers#how-do-i-share-state-between-two-reducers-do-i-have-to-use-combinereducers`
 * 
 * 这个示例提供的是一个简化的版本, 去掉了很多的校验逻辑, 想看完整版的话去这里
 * `https://github.com/reduxjs/redux/blob/master/src/combineReducers.ts`
 * 
 * combineReducers 顾名思义, 其作用就是合并多个reducer, 并返回一个新的reducer, 大体的流程如下:
 * 
 * 1. 通过key-value(键值对, 以后简称kv)的形式将需要合并的reducer传入
 * 2. 当dispatch了相关的action后逐一执行参数中传入的reducer
 * 3. 返回最终执行的结果(结果可能改变或未改变)
 * 
 * @param reducers 
 */
function combineReducers<S, A extends AnyAction>(reducers: ReducersMapObject) {
  // 获取所有reducer的key
  const reducerKeys = Object.keys(reducers);

  // 将所有合法的reducer存入finalReducers中, 用于后续接收到action时进行遍历
  const finalReducers: ReducersMapObject = {};
  for (let i = 0, len = reducerKeys.length; i < len; i++) {
    const key = reducerKeys[i];

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }

  const finalReducerKeys = Object.keys(finalReducers);

  return function combination(
    state: StateFromReducersMapObject<typeof reducers> = {},
    action: AnyAction,
  ) {
    // 用于记录计算的结果是否发生了改变
    let hasChange = false;

    // 存储本次计算的结果
    const nextState: StateFromReducersMapObject<typeof reducers> = {};

    for (let i = 0, len = finalReducerKeys.length; i < len; i++) {
      const key = finalReducerKeys[i];
      const reducer = finalReducers[key];

      // 获取当前reducer上一次计算出的state
      const prevStateForKey = state[key];
      // 将之前的state和action使用reducer重新计算
      const nextStateForKey = reducer(prevStateForKey, action);
      // 保存本次计算的结果
      nextState[key] = nextStateForKey;

      // 如果前后两次结果不一致, 则将标志位置为true
      // 注意! 这里是浅比较! 浅比较! 浅比较!
      // 
      // 我当初在看了下面这几行的源码的时候豁然开朗
      // 为什么reducer在不应该改变状态时直接返回state, 而不是结构后重新组合的值!
      if (nextStateForKey !== prevStateForKey) {
        hasChange = true;
      }
    }

    hasChange = hasChange || finalReducerKeys.length !== Object.keys(state).length;

    return hasChange ? nextState : state;
  }
}

export default combineReducers;