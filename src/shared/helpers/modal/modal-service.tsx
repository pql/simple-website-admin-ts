import { App, ComponentOptions, h, render, toRefs } from 'vue';
import { IModalOptions } from './interfaces';
import { Observable } from 'rxjs';
import { ConfigProvider, Modal, Pagination } from 'ant-design-vue';
import { ModalClose } from '../../components/f-modal/modal-close';
import { useModalDragMove } from '@/shared/components/f-modal/src/useModalDrag';
import { useLocale } from '@/locales/useLocale';
// import '../../components/f-modal/src/modal.less';
import './index.less';

export interface ModalOptions extends IModalOptions {
  /** 是否全屏 */
  fullScreen?: boolean;
}

export class ModalService {
  private _app;
  public init(app: App) {
    this._app = app;
  }
  public create(
    component: ComponentOptions | any,
    params?: any,
    options?: ModalOptions,
  ): Observable<any> {
    // support Multi-language
    const { getAntdLocale } = useLocale();

    // 1.处理参数
    // 2.动态创建要渲染的组件X
    // 3.将组件X添加到动态创建的模态框中并渲染
    return new Observable<boolean | any>((o) => {
      // 初始化检查
      if (!this._app) {
        // 没有初始化，抛出异常
        throw '_app is undefined';
      }

      // 模态框容器
      const container = document.createElement('div');
      document.body.appendChild(container);

      // 输入参数
      params = params ? params : {};

      // 基本配置
      // options = options ? options : {};
      // options.open = true;
      // options.closable = params.closable === undefined ? true : params.closable;
      // options.width = params.width;
      // options.fullScreen = false;
      options = options ? options : {};
      options.open = true;
      options.closable = true;
      // options.fullScreen = false;

      Modal.destroyAll();

      // 模态框引用
      const modalRef = {
        instance: null,
        close(args: boolean | any) {
          (this.instance as any).component.props.open = false;

          // 输出结果
          o.next(args);
          o.complete();

          // 弹出框关闭时移除节点
          render(null, container);
          setTimeout(() => {
            document.body.removeChild(container);
          }, 1000);
        },
        unClose(args: boolean | any) {
          (this.instance as any).component.props.open = true;
          // 输出结果
          o.next(args);
        },
        fullScreen() {
          const vm = this.instance as any;
          const bodyClass = `model-${options?.size || 'default'} warp-modal-imp`;
          if (vm.component.props.wrapClassName == 'fullscreen-modal warp-modal-imp') {
            vm.component.props.wrapClassName = bodyClass;
          } else {
            vm.component.props.wrapClassName = 'fullscreen-modal warp-modal-imp';
          }
        },
        onChange: (pageIndex) => {
          console.log(pageIndex);
        },
        pageDataList: [],
      };

      const { pageDataList = [] } = params;
      modalRef.pageDataList = pageDataList;
      const aPagination =
        pageDataList.length > 1
          ? h(Pagination, {
              showSizeChanger: false,
              pageSize: 1,
              total: pageDataList.length,
              class: 'f-modal-pagination',
              size: 'small',
              onChange(page) {
                modalRef.onChange(page);
              },
            })
          : null;

      // 组件实例
      const componentInstance = h(
        component,
        {
          ...params,
          modalRef,
        },
        () => aPagination,
      );

      const provider = h(
        ConfigProvider,
        {
          locale: getAntdLocale.value,
        },
        () => componentInstance,
      );

      const closeIcon = h(ModalClose, {
        onCancel() {
          modalRef.close(false);
        },
        onFullscreen() {
          modalRef.fullScreen();
        },
      });

      // 模态框实例
      let wrapClass = '';
      const bodyClass = `model-${options?.size || 'default'}`;
      wrapClass +=
        options.fullScreen || options?.size == 'full'
          ? 'fullscreen-modal'
          : options.width
            ? ''
            : bodyClass;
      wrapClass += ' warp-modal-imp';
      const bodyStyle = {};
      const sizeWidth = {
        small: '500px',
        medium: '800px',
        default: '900px',
        large: '1200px',
        full: '1200px',
      };
      const modalWidth = options.width ? options.width : sizeWidth[options?.size || 'default'];
      const vm = h(
        Modal,
        {
          open: options.open,
          width: modalWidth,
          centered: true,
          mask: true,
          maskClosable: false,
          title: '',
          footer: '',
          bodyStyle: bodyStyle,
          wrapClassName: wrapClass,
          getContainer: () => container,
          closable: options.closable,
          closeIcon: closeIcon,
          onCancel: () => {
            modalRef.close(false);
          },
          onOk: () => {
            modalRef.close(true);
          },
        },
        // [closeIcon, provider],
        () => provider,
      );

      modalRef.instance = vm as any;

      // 这里很重要，关联app上下文
      vm.appContext = this._app._context;

      console.log(vm);
      render(vm, container);
      const { open } = toRefs(vm.component!.props);
      useModalDragMove({
        open: open as any,
        dragHandler: '.modal-header',
      });
    });
  }
  public getModalService(): ModalService {
    throw '请先实现getModalService方法';
  }
}

const modalHelper = new ModalService();
export default modalHelper;
