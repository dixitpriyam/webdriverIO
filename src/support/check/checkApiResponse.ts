import { expect } from 'expect-webdriverio';

/**
 * Check if the given element has the given class
 * @param  {Number}   status
 * @param  {String}   shouldCheckBody
 * @param  {any}      expectedResponseBody
 */
export default async function (
  status: number,
  shouldCheckBody?: string,
  expectedResponseBody?: any,
): Promise<void> {
  const response = await browser.sharedStore.get('apiResponse');
  expect(response.status).toBe(status);

  if (shouldCheckBody) {
    expect(response.text).toBe(expectedResponseBody);
  }
}
