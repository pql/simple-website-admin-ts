import CreateOrEditSite from '/@/wave/device-configuration/sites/create-or-edit-site/create-or-edit-site.vue';
import CreateOrEditBuilding from '/@/wave/device-configuration/buildings/create-or-edit-building/create-or-edit-building.vue';
import CreateOrEditDeviceType from '/@/wave/device-configuration/device-type/create-or-edit-device-type/create-or-edit-device-type.vue';
import CreateOrEditBuildingFloor from '/@/wave/device-configuration/building-floor/create-or-edit-building-floor/create-or-edit-building-floor.vue';
import CreateOrEditDevice from '/@/wave/device-configuration/device/create-or-edit-device/create-or-edit-device.vue';
import CreateOrEditDeviceCategory from '/@/wave/device-configuration/device-category/create-or-edit-device-category/create-or-edit-device-category.vue';
import CreateDevice from '/@/wave/device-configuration/device/create-device/create-device.vue';

/**
 * 控制视图字典。
 * camera/cardaccess/door/light
 */
const EDIT_VIEW_DICT: {
  [key: string]: {
    component: any;
    width?: number;
    style?: object;
    props?: object;
  };
} = {};
EDIT_VIEW_DICT['site'] = {
  component: CreateOrEditSite,
  width: 900,
  props: {
    _titleName: 'Unified.texts.EditSite',
  },
};
EDIT_VIEW_DICT['building'] = {
  component: CreateOrEditBuilding,
  width: 900,
  props: {
    _titleName: 'Unified.texts.EditBuilding',
    _types: '',
  },
};
EDIT_VIEW_DICT['floor'] = {
  component: CreateOrEditBuildingFloor,
  width: 900,
  props: {
    _titleName: 'Unified.texts.EditBuildingFloor',
    _types: '',
  },
};
EDIT_VIEW_DICT['deviceType'] = {
  component: CreateOrEditDeviceType,
  width: 900,
  props: {
    _titleName: 'Unified.texts.EditDeviceType',
    _types: '',
  },
};
EDIT_VIEW_DICT['deviceCategory'] = {
  component: CreateOrEditDeviceCategory,
  width: 900,
  props: {
    _titleName: 'Unified.texts.EditBuildingFloor',
    _types: '',
  },
};
EDIT_VIEW_DICT['device'] = {
  component: CreateOrEditDevice,
  width: 900,
  props: {
    _titleName: 'Unified.texts.EditBuildingFloor',
    _types: '',
  },
};
EDIT_VIEW_DICT['slaveDevice'] = {
  component: CreateOrEditDevice,
  width: 900,
  props: {
    _titleName: 'Unified.texts.EditBuildingFloor',
    _types: '',
  },
};
export { EDIT_VIEW_DICT };
