/**
 * Configure and register global directives
 */
import type { App } from 'vue';
import { setupPermissionDirective } from './permission';
import { setupLoadingDirective } from './loading';
import { setupEllipsisDirective } from './ellipsis';
import { setupTrimDirective } from './trim'; /* 去除前后空格 */

export function setupGlobDirectives(app: App) {
  setupPermissionDirective(app);
  setupLoadingDirective(app);
  setupEllipsisDirective(app);
  setupTrimDirective(app);
}
