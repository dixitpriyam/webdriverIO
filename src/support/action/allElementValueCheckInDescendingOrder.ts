import type { Selector } from 'webdriverio';

import checkIfElementExists from '../lib/checkIfElementExists.js';

/**
 * Perform an click action on the given element
 * @param  {String}   action  The action to perform (click or doubleClick)
 * @param  {String}   type    Type of the element (link or selector)
 * @param  {String}   selector Element selector
 */
export default async (
  selector: string
) => {
    const h5Elements = await $$(selector);
  // Extract and parse the values from the elements
  const values = [];
  for (const element of h5Elements) {
    const textValue = await element.getText();
    const numericValue = parseFloat(textValue);
    values.push(numericValue);
  }

  for (let i = 1; i < values.length; i++) {
    if (values[i] > values[i - 1]) {
      return false; 
    }
  }
  return true; 
};
