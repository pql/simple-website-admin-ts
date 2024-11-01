import { defineStore, Pinia } from 'pinia';
import { store } from '@/store';
import { createLocalStorage } from '@/utils/cache';
import { TIME_ZONE_KEY } from '@/enums/cacheEnum';
import { guessTimezoneName, timezoneNames } from '@/utils/timezoneUtil';
import { TimezoneSetting } from '#/config';
import { timezoneSetting } from '@/settings/timezoneSetting';

const ls = createLocalStorage();

timezoneSetting.zone = guessTimezoneName();
timezoneSetting.names = timezoneNames;

const lsTimezoneSetting = (ls.get(TIME_ZONE_KEY) || timezoneSetting) as TimezoneSetting;

interface TimezoneState {
  timezoneInfo: TimezoneSetting;
}

export class TimezoneStore {
  public static useStore(pinia?: Pinia) {
    const storeDefinition = defineStore({
      id: 'app-timezone',
      state: (): TimezoneState => ({
        timezoneInfo: lsTimezoneSetting,
      }),
      getters: {
        getZone(state): string {
          return state.timezoneInfo?.zone;
        },
        getNames(state): string[] {
          return state.timezoneInfo?.names;
        },
        getShowTimezonePicker(state): boolean {
          return !!state.timezoneInfo.showPicker;
        },
        getOffset(state): string {
          return state.timezoneInfo?.offset;
        },
      },
      actions: {
        setZone(zone: string) {
          this.timezoneInfo.zone = zone;
          ls.set(TIME_ZONE_KEY, this.timezoneInfo);
        },
        setOffset(offset: string) {
          this.timezoneInfo.offset = offset;
          ls.set(TIME_ZONE_KEY, this.timezoneInfo);
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
