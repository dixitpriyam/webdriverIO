import { HTTPMethod } from 'wdio-intercept-service';
import { expect } from 'expect-webdriverio';
import pause from './pause.ts';
import { objectContains } from '../lib/checkIfObjectContains.ts';
import { requestBodyFixtures } from '../../fixtures/index.ts';

/**
 * Execute the Script and Validate the Retrun value
 *
 * @param  {String}   script 
 */
export default async (
  script: string,
) => {
      // Switch to the console tab
      // await browser.switchToWindow({ type: 'tab', index: 1 });

      // Perform any actions on the console tab
      // For example, execute a script and retrieve the result
      const result = await browser.execute("console.log('Hello, World!')");
      console.log(result); // Output: Hello, World!

      // Switch back to the default tab or any other tab as needed
      // await browser.switchToWindow({ type: 'tab', index: 0 });
      const element = await browser.$('#test-case-status-identify1');

// Click on the element using JavaScript
await browser.execute((el) => {
  el.click();
}, element);
};
