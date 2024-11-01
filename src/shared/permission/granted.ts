import { isArray } from '@/utils/is';
import { PermissionStore } from '@/store/modules/permission';
import { intersection } from 'lodash-es';

const permissionStore = PermissionStore.useStoreWithOut();

/**
 * @description 判断是否匹配到任一权限位
 * @param value
 * @param def
 * @returns Boolean
 */
export const isGrantedAny = (value?: string | string[], def = true) => {
  // Visible by default
  if (!value) {
    return def;
  }
  if (!isArray(value)) {
    return permissionStore.getPermCodeList?.includes(value);
  }
  return intersection(value, permissionStore.getPermCodeList).length > 0;
};

/**
 * @description 判断是否匹配全部权限位
 * @param value
 * @param def
 * @returns Boolean
 */
export const isGrantedAll = (value?: string | string[], def = true) => {
  // Visible by default
  if (!value) {
    return def;
  }
  if (!isArray(value)) {
    return permissionStore.getPermCodeList?.includes(value);
  }
  return intersection(value, permissionStore.getPermCodeList).length === value.length;
};
