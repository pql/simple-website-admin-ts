import { defineStore, Pinia } from 'pinia';
import { store } from '@/store';
import type { LockInfo } from '#/store';
import { Persistent } from '@/utils/cache/persistent';
import { LOCK_INFO_KEY } from '@/enums/cacheEnum';
import { UserStore } from '@/store/modules/user';

interface LockState {
  lockInfo: Nullable<LockInfo>;
}

export class LockStore {
  public static useStore(pinia?: Pinia) {
    const storeDefinition = defineStore({
      id: 'app-lock',
      state: (): LockState => ({
        lockInfo: Persistent.getLocal(LOCK_INFO_KEY),
      }),
      getters: {
        getLockInfo(state): Nullable<LockInfo> {
          return state.lockInfo;
        },
      },
      actions: {
        setLockInfo(info: LockInfo) {
          this.lockInfo = Object.assign({}, this.lockInfo, info);
          Persistent.setLocal(LOCK_INFO_KEY, this.lockInfo, true);
        },
        resetLockInfo() {
          Persistent.removeLocal(LOCK_INFO_KEY, true);
          this.lockInfo = null;
        },
        // Unlock
        async unLock(password?: string) {
          const userStore = UserStore.useStore();
          if (this.lockInfo?.pwd === password) {
            this.resetLockInfo();
            return true;
          }
          const tryLogin = async () => {
            try {
              const username = userStore.getUserInfo?.userName;
              // const res = await userStore.login({
              //   username,
              //   password: password!,
              //   goHome: false,
              //   mode: 'none',
              // });
              // if (res) {
              //   this.resetLockInfo();
              // }
              // return res;
            } catch (error) {
              return false;
            }
          };
          return await tryLogin();
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
