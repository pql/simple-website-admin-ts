import { Observable } from 'rxjs';
import { App, ComponentOptions } from 'vue';

/** 模态框的配置 */
export interface IModalOptions {
  /** Modal 完全关闭后的回调 - function */
  afterClose?: Function;
  /** Modal body 样式 -	object */
  bodyStyle?: Function;
  /** 垂直居中展示 Modal - boolean */
  centered?: boolean;
  /** 是否显示右上角的关闭按钮 - boolean */
  closable?: boolean;
  /** 自定义关闭图标 - boolean */
  closeIcon?: (() => VueNode) | VueNode;
  /** 确定按钮 loading - boolean */
  confirmLoading?: boolean;
  /** 关闭时销毁 Modal 里的子元素 - boolean */
  destroyOnClose?: boolean;
  /** 底部内容，当不需要默认底部按钮时，可以设为 :footer="null" - boolean */
  footer?: string | (() => VueNode);
  /** 强制渲染 Modal - boolean */
  forceRender?: boolean;
  /** 指定 Modal 挂载的 HTML 节点 - (instance): HTMLElement	*/
  getContainer?: () => HTMLElement;
  /** 是否支持键盘 esc 关闭 - boolean */
  keyboard?: boolean;
  /** 是否展示遮罩 - boolean */
  mask?: boolean;
  /** 点击蒙层是否允许关闭 - boolean */
  maskClosable?: boolean;
  /** 遮罩样式 - object */
  maskStyle?: object;
  /** 宽度 */
  width?: string | number;
  /** 设置 Modal 的 z-index */
  zIndex?: number;
  /** 可用于设置浮层的样式，调整浮层位置等	 */
  dialogStyle?: object;
  /** 可用于设置浮层的类名	 */
  dialogClass?: string;
  /** 是否显示 */
  open?: boolean;
  /** 弹窗大小 */
  size?: 'small' | 'default' | 'large' | 'full' | 'medium';
  // 函数
  /** 确认 */
  onOk?: (e: any) => void;
  /** 取消 */
  onCancel?: (e: any) => void;
}

export interface IModalService {
  _app: any;
  init(app: App): void;
  create(component: ComponentOptions | any, params?: any, options?: IModalOptions): Observable<any>;
}
