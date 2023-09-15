import { JSFixtures } from '../../fixtures/index.ts';
/**
 * executeJS execution for a given JS
 * @param  {String}   jsKey   JS to be executed
 */
export default async (jsKey: string, JSsnippet: string, snippetArgs: string) => {
  /**
   * Number of milliseconds
   * @type {Int}
   */
  // Execute provided JavaScript code in browser console
  const js = JSFixtures[jsKey](JSsnippet, snippetArgs);
  browser.execute(js);
};
