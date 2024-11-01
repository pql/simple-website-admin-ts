import { defineStore, Pinia } from 'pinia';
import { store } from '@/store';

interface MapInfo {
  [key: string]: any;
}

interface EnumMapState {
  mapData: Nullable<MapInfo>;
}

export class EnumMapStore {
  public static useStore(pinia?: Pinia) {
    const storeDefinition = defineStore({
      id: 'enum-map',
      state: (): EnumMapState => ({
        mapData: null,
      }),
      getters: {
        getMapData(state): Nullable<MapInfo> {
          return state.mapData;
        },
      },
      actions: {
        setMapData(mapData) {
          this.mapData = mapData;
        },
      },
    });
    return storeDefinition(pinia);
  }
  // Need to be used outside the setup
  public static useStoreWithOut() {
    return this.useStore(store);
  }
}
