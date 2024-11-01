import { EnumService } from '@/apis';
import { EnumMapStore } from '@/store/modules/enumMap';

const enumMapStore = EnumMapStore.useStoreWithOut();

export class EnumMapService {
  private map;

  getData(key: string) {
    return this.map[key];
  }

  async init() {
    const mapData = enumMapStore.getMapData;
    if (mapData === null) {
      const data = await EnumService.getApiEnumGetEnumMaps();
      enumMapStore.setMapData(data);
      this.map = data;
    } else {
      this.map = mapData;
    }
  }
}

const enumMapService = new EnumMapService();
export default enumMapService;
