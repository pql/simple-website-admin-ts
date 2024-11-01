import { withInstall } from '@/utils';
import floorPlan from './floor-plan/floor-plan.vue';
import imagePlan from './image-plan/image-plan.vue';
import controlPanelTree from './control-panel-tree/control-panel-tree.vue';
import mapPlan from './map-plan/map-plan.vue';

// import ctrlViewLight from './ctrl-view-light/ctrl-view-light.vue';
import ctrlViewCamera from './ctrl-view-camera/ctrl-view-camera.vue';
// import ctrlViewDoor from './ctrl-view-door/ctrl-view-door.vue';
import cameraItemView from './camera-item-view/camera-item-view.vue';

export * from './camera-item-view/interfaces';

export * from './floor-plan/interfaces';
export * from './ctrl-views';
export const FloorPlan = withInstall(floorPlan);
export const ImagePlan = withInstall(imagePlan);
export const ControlPanelTree = withInstall(controlPanelTree);
export const MapPlan = withInstall(mapPlan);

// export const CtrlViewLight = withInstall(ctrlViewLight);
export const CtrlViewCamera = withInstall(ctrlViewCamera);
// export const CtrlViewDoor = withInstall(ctrlViewDoor);
export const CameraItemView = withInstall(cameraItemView);
