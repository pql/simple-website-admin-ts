/** 视图元素ref */
export interface IViewRef {
  el?: HTMLElement;
  myExplorer?: HTMLDivElement;
  myToolbar?: HTMLDivElement;
  myInspector?: HTMLDivElement;
  myViewer?: HTMLDivElement;
  myCanvas?: HTMLCanvasElement;
  myNavCubeCanvas?: HTMLCanvasElement;
}

export interface IBimMarkConfig {}

export interface IBimMarkDef {
  id: string;
  worldPos: number[];
  faIconClass: string;
  title: string;
  description: string;
  markerBGColor: string;
  markerType: string;
  visible: boolean;
  commandMode: string;
  onClick?: (e: any) => void;
}

export interface IMarkClickEventArgs {
  boundBuildingId: string;
  commandMode: string;
  graphicPanelId: string;
  id: string;
  markerType: string;
  title: string;
  position: {
    left: number;
    top: number;
    'z-index': string;
  };
}
export interface IBimClickMenuItem {
  getTitle: (context: any) => any;
  getEnabled?: (context: any) => any;
  doAction: (context: any) => void;
}

export const RightClickMenuItem: IBimClickMenuItem[] = [
  {
    getTitle: (context) => {
      return context.viewer.localeService.translate('objectContextMenu.hide') || 'Hide';
    },
    getEnabled: (context) => {
      return context.entity.visible;
    },
    doAction: (context) => {
      context.entity.visible = false;
    },
  },
  {
    getTitle: (context) => {
      return (
        context.viewer.localeService.translate('objectContextMenu.hideOthers') || 'Hide Others'
      );
    },
    doAction: (context) => {
      const viewer = context.viewer;
      const scene = viewer.scene;
      const entity = context.entity;
      const metaObject = viewer.metaScene.metaObjects[entity.id];
      if (!metaObject) {
        return;
      }
      scene.setObjectsVisible(scene.visibleObjectIds, false);
      metaObject.withMetaObjectsInSubtree((metaObject) => {
        const entity = scene.objects[metaObject.id];
        if (entity) {
          entity.visible = true;
        }
      });
    },
  },
  {
    getTitle: (context) => {
      return context.viewer.localeService.translate('objectContextMenu.hideAll') || 'Hide All';
    },
    getEnabled: (context) => {
      return context.viewer.scene.numVisibleObjects > 0;
    },
    doAction: (context) => {
      context.viewer.scene.setObjectsVisible(context.viewer.scene.visibleObjectIds, false);
    },
  },
  {
    getTitle: (context) => {
      return context.viewer.localeService.translate('objectContextMenu.showAll') || 'Show All';
    },
    getEnabled: (context) => {
      const scene = context.viewer.scene;
      return (
        scene.numVisibleObjects < scene.numObjects || context.viewer.scene.numXRayedObjects > 0
      );
    },
    doAction: (context) => {
      const scene = context.viewer.scene;
      scene.setObjectsVisible(scene.objectIds, true);
      scene.setObjectsPickable(scene.xrayedObjectIds, true);
      scene.setObjectsXRayed(scene.xrayedObjectIds, false);
    },
  },
  {
    getTitle: (context) => {
      return (
        context.viewer.localeService.translate('objectContextMenu.showInTree') || 'Show in Explorer'
      );
    },
    doAction: (context) => {
      const objectId = context.entity.id;
      context.showObjectInExplorers(objectId);
    },
  },
];
