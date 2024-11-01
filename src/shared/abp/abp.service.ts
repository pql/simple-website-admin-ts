import { AbpStore } from '@/store/modules/abp';

const abpStore = AbpStore.useStoreWithOut();
export class AbpService {
  get abp() {
    const storeAbp = abpStore.getApplication;
    return storeAbp;
  }
}

const abpService = new AbpService();
export default abpService;
