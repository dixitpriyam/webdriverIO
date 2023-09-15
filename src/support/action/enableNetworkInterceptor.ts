import { browser } from '@wdio/globals';

/**
 * Enable Network Interceptor
 */
export default async () => {
  const interceptor = await browser.setupInterceptor();
  await browser.pause(300);
};
