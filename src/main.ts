import 'uno.css';
import '@/design/index.less';
import '@/components/VxeTable/src/css/index.scss';
import 'ant-design-vue/dist/reset.css';
// Register icon sprite
import 'virtual:svg-icons-register';

import { createApp } from 'vue';

import { registerGlobComp } from '@/components/registerGlobComp';
import { registerSharedComp } from '@/shared/components/registeSharedComp';
import { setupGlobDirectives } from '@/directives';
import { setupI18n } from '@/locales/setupI18n';
import { setupErrorHandle } from '@/logics/error-handle';
import { initAbpConfigStore, initAppConfigStore } from '@/logics/initAppConfig';
import { router, setupRouter } from '@/router';
import { setupRouterGuard } from '@/router/guard';
import { setupStore } from '@/store';
import { ModalHelper } from './shared/helpers';
import { registerServices } from '@/services';
import App from './App.vue';
import { AppPreBootstrap } from './app-pre-bootstrap';
import { setupAntd } from './shared/antd/import-antd';

// 注册服务
registerServices();

async function bootstrap() {
  const app = createApp(App);

  // 模态窗注册
  (ModalHelper.getModalService() as any).init(app);

  // 按需注册antd
  setupAntd(app);

  // Configure store
  // 配置 store
  setupStore(app);

  // Initialize internal system configuration
  // 初始化内部系统配置
  initAppConfigStore();

  // Register global components
  // 注册全局组件
  registerGlobComp(app);
  // 注册自定义组件
  registerSharedComp(app);

  // Multilingual configuration
  // 多语言配置
  // Asynchronous case: language files may be obtained from the server side
  // 异步案例：语言文件可能从服务器端获取
  await setupI18n(app);

  // Configure routing
  // 配置路由
  setupRouter(app);

  // router-guard
  // 路由守卫
  setupRouterGuard(router);

  // Register global directive
  // 注册全局指令
  setupGlobDirectives(app);

  // Configure global error handling
  // 配置全局错误处理
  setupErrorHandle(app);

  await initAbpConfigStore();

  // https://next.router.vuejs.org/api/#isready
  // await router.isReady();

  app.mount('#app');
}

// bootstrap();

AppPreBootstrap.run(bootstrap);
