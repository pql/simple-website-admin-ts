import { OIDC_USER_INFO_KEY } from '@/enums/cacheEnum';
import { createLocalStorage } from '@/utils/cache';
import { User } from 'oidc-client-ts';
import { defineStore, Pinia } from 'pinia';
import { store } from '@/store';

interface OidcState {
  user: User;
}

const ls = createLocalStorage();
const defaultUser = {};
const lsOidcUser = (ls.get(OIDC_USER_INFO_KEY) || defaultUser) as User;

export class OidcUserStore {
  public static useStore(pinia?: Pinia) {
    const storeDefinition = defineStore({
      id: 'oidc-user',
      state: (): OidcState => ({
        user: lsOidcUser,
      }),
      getters: {
        getUser(state) {
          return state.user ?? defaultUser;
        },
      },
      actions: {
        setUser(user: User) {
          this.user = user;
          ls.set(OIDC_USER_INFO_KEY, user);
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
