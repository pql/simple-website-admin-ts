import CreateOrEditSite from '/@/wave/device-configuration/sites/create-or-edit-site/create-or-edit-site.vue';
import CreateOrEditBuilding from '/@/wave/device-configuration/buildings/create-or-edit-building/create-or-edit-building.vue';
import CreateOrEditBuildingFloor from '/@/wave/device-configuration/building-floor/create-or-edit-building-floor/create-or-edit-building-floor.vue';
import CreateDevice from '/@/wave/device-configuration/device/create-device/create-device.vue';

/**
 * 控制视图字典。
 * camera/cardaccess/door/light
 */
const Add_VIEW_DICT: {
  [key: string]: {
    component: any;
    width?: number;
    style?: object;
    props?: object;
  };
} = {};
Add_VIEW_DICT[''] = {
  component: CreateOrEditSite,
  width: 900,
  props: {
    _titleName: 'Unified.texts.CreateNewSite',
    _types: '',
  },
};
Add_VIEW_DICT['site'] = {
  component: CreateOrEditBuilding,
  width: 900,
  props: {
    _titleName: 'Unified.texts.CreateNewBuilding',
    _types: '',
  },
};
Add_VIEW_DICT['building'] = {
  component: CreateOrEditBuildingFloor,
  width: 900,
  props: {
    _titleName: 'Unified.texts.CreateNewBuildingFloor',
    _types: '',
  },
};
Add_VIEW_DICT['floor'] = {
  component: CreateDevice,
  width: 450,
  props: {
    _titleName: '',
    _types: '',
  },
};
Add_VIEW_DICT['deviceType'] = {
  component: CreateDevice,
  width: 450,
  props: {
    _titleName: '',
    _types: '',
  },
};
Add_VIEW_DICT['deviceCategory'] = {
  component: CreateDevice,
  width: 450,
  props: {
    _titleName: '',
    _types: '',
  },
};
Add_VIEW_DICT['device'] = {
  component: CreateDevice,
  width: 450,
  props: {
    _titleName: '',
    _types: '',
  },
};
Add_VIEW_DICT['slaveDevice'] = {
  component: CreateDevice,
  width: 450,
  props: {
    _titleName: '',
    _types: '',
  },
};
export { Add_VIEW_DICT };
