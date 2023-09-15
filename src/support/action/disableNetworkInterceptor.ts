import { browser } from '@wdio/globals';

/**
 * Disable Network Interceptor
 */
export default async () => {
  await browser.disableInterceptor();
  await browser.pause(100);
};
