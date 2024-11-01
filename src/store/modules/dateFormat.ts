import { defineStore, Pinia } from 'pinia';
import { store } from '@/store';
import { createLocalStorage } from '@/utils/cache';
import { DATE_FORMAT_KEY, USE_12_HOURS_KEY } from '@/enums/cacheEnum';
import { DateFormatSetting } from '#/config';
import { dateFormatSetting } from '@/settings/dateFormatSetting';

const ls = createLocalStorage();

const lsDateFormatSetting = (ls.get(DATE_FORMAT_KEY) || dateFormatSetting.dateFormat) as string;
const lsUse12Hours = ls.get(USE_12_HOURS_KEY) || false;

export class DateFormatStore {
  public static useStore(pinia?: Pinia) {
    const storeDefinition = defineStore({
      id: 'date-format',
      state: (): DateFormatSetting => ({
        dateFormat: lsDateFormatSetting,
        use12Hours: lsUse12Hours,
      }),
      getters: {
        getDateFormat(state) {
          return state.dateFormat;
        },
        getUse12Hours(state) {
          return state.use12Hours;
        },
      },
      actions: {
        setDateFormat(dateFormat: string) {
          this.dateFormat = dateFormat;
          ls.set(DATE_FORMAT_KEY, dateFormat);
        },
        setUse12Hours(use12Hours: boolean) {
          this.use12Hours = use12Hours;
          ls.set(USE_12_HOURS_KEY, use12Hours);
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
