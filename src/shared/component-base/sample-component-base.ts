import { defineComponent } from 'vue';
import { isGrantedAny, isGrantedAll } from '@/shared/permission/granted';

import { defHttp } from '@/utils/http/axios';
import BasicConfigInstance from '../config/basic-config';
import { l } from '@/shared/i18n';
import abpService from '@/shared/abp/abp.service';

/**
 * 组件基类
 */
const SampleComponentBase = defineComponent({
  data() {
    return {
      /** 加载状态 */
      loading: false,
    };
  },
  computed: {
    /** abp对象 */
    abp() {
      return abpService.abp;
    },
    /** 权限服务 */
    permission() {
      return abpService.abp.auth;
    },
    /** 服务端api根地址 */
    $apiUrl() {
      return BasicConfigInstance.remoteServiceBaseUrl;
    },
    /** 服务端api http-client 实例 */
    $api() {
      // API 的 http 实例
      return defHttp;
    },
    /** app常量 */
    appConsts() {
      return BasicConfigInstance;
    },
  },
  methods: {
    /**
     * 导出 l 属性（vue-i18n $t属性 更名而来），方便依赖注入
     * @description 本地化
     * @param key 本地化键
     * @param args 本地化参数
     * @returns String
     */
    l: l,

    /**
     * @description 判断是否匹配到任一权限位
     * @param value
     * @param def
     * @returns Boolean
     */
    isGrantedAny,

    /**
     * @description 判断是否匹配全部权限位
     * @param value
     * @param def
     * @returns Boolean
     */
    isGrantedAll,
  },
});

export default SampleComponentBase;
