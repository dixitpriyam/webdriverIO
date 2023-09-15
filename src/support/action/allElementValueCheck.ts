import type { Selector } from 'webdriverio';

import checkIfElementExists from '../lib/checkIfElementExists.js';

/**
 * Perform an click action on the given element
 * @param  {String}   action  The action to perform (click or doubleClick)
 * @param  {String}   type    Type of the element (link or selector)
 * @param  {String}   selector Element selector
 */
export default async (
  selector: string,
  value: string
) => {
 // Find all <h5> elements with class 'sc-eDvSVe dwCrSh'
 const h5Elements = await $$(selector);

 // Iterate through the found elements
 for (const h5Element of h5Elements) {
   // Get the text value of the element
   const textValue = await h5Element.getText();

   const numericValue = parseFloat(textValue);

   const intvalue = parseInt(value, 10);

   if (isNaN(numericValue) || numericValue >= intvalue) {
     return false;
   }
 }

 // If all elements have values less than 399, return true
 return true;
};
