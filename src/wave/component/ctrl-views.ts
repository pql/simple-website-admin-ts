// import { CtrlViewLight, CtrlViewCamera, CtrlViewDoor } from './index';
/**
 * 控制视图字典。
 * camera/cardaccess/door/light
 */
const CTRL_VIEW_DICT: {
  [key: string]: {
    width: number;
    component: any;
  };
} = {};
// CTRL_VIEW_DICT['camera'] = {
//   width: 900,
//   component: CtrlViewCamera
// };
// CTRL_VIEW_DICT['button'] = {
//   width: 350,
//   component: CtrlViewDoor
// };
// CTRL_VIEW_DICT['door'] = {
//   width: 'auto',
//   component: CtrlViewDoor
// };
// CTRL_VIEW_DICT['firealarm'] = {
//   width: 350,
//   component: CtrlViewLight
// };

export { CTRL_VIEW_DICT };
