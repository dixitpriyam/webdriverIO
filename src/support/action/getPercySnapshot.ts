import percySnapshot from '@percy/webdriverio';

/**
 * Take a screenshot with Percy
 * @param  {String}   name snapshot name
 */
export default async function (name: string): Promise<void> {
  await percySnapshot(browser, name);
}
