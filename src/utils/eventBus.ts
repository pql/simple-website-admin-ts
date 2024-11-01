// eventBus.ts
import mitt from 'mitt';

// 创建一个 mitt 实例
const emitter = mitt();

// 定义事件类型
type EventName = string | symbol;

// 定义事件处理函数类型
type EventHandler<T = any> = (event: T) => void;

// 定义事件总线接口
interface EventBus {
  on: (event: EventName, handler: EventHandler) => void;
  off: (event: EventName, handler: EventHandler) => void;
  emit: <T>(event: EventName, data: T) => void;
}

// 实现事件总线接口
const eventBus: EventBus = {
  on: <T>(event: EventName, handler: EventHandler<T>) => {
    emitter.on(event, handler as (event: any) => void);
  },
  off: <T>(event: EventName, handler: EventHandler<T>) => {
    emitter.off(event, handler as (event: any) => void);
  },
  emit: <T>(event: EventName, data: T) => {
    emitter.emit(event, data);
  },
};

export default eventBus;
