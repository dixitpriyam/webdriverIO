import { When } from '@cucumber/cucumber';

import clearInputField from '../support/action/clearInputField.ts';
import clickElement from '../support/action/clickElement.ts';
import allElementValueCheck from '../support/action/allElementValueCheck.ts';
import allElementValueCheckInDescendingOrder from '../support/action/allElementValueCheckInDescendingOrder.ts';
import closeLastOpenedWindow from '../support/action/closeLastOpenedWindow.ts';
import deleteCookies from '../support/action/deleteCookies.ts';
import clearSiteData from '../support/action/clearSiteData.ts';
import dragElement from '../support/action/dragElement.ts';
import focusLastOpenedWindow from '../support/action/focusLastOpenedWindow.ts';
import handleModal from '../support/action/handleModal.ts';
import moveTo from '../support/action/moveTo.ts';
import pause from '../support/action/pause.ts';
import executeJs from '../support/action/execute-js.ts';
import pressButton from '../support/action/pressButton.ts';
import scroll from '../support/action/scroll.ts';
import selectOption from '../support/action/selectOption.ts';
import selectOptionByIndex from '../support/action/selectOptionByIndex.ts';
import setCookie from '../support/action/setCookie.ts';
import setInputField from '../support/action/setInputField.ts';
import setPromptText from '../support/action/setPromptText.ts';
import makeRequest from '../support/action/makeApiRequest.ts';

When(/^I (click|doubleclick) on the (link|button|element) "([^"]*)?"$/, clickElement);

When(/^I check all elements "([^"]*)" have value less than "([^"]*)"$/, allElementValueCheck);

When(/^I check all elements "([^"]*)" have value in descending order$/, allElementValueCheckInDescendingOrder);

When(/^I (add|set) "([^"]*)?" to the inputfield "([^"]*)?"$/, setInputField);

When(/^I clear the inputfield "([^"]*)?"$/, clearInputField);

When(/^I drag element "([^"]*)?" to element "([^"]*)?"$/, dragElement);

When(/^I pause for (\d+)ms$/, pause);

When(/^I set a cookie "([^"]*)?" with the content "([^"]*)?"$/, setCookie);

When(/^I delete the cookie "([^"]*)?"$/, deleteCookies);

When(/^I clear site data$/, clearSiteData);

When(/^I press "([^"]*)?"$/, pressButton);

When(/^I (accept|dismiss) the (alertbox|confirmbox|prompt)$/, handleModal);

When(/^I enter "([^"]*)?" into the prompt$/, setPromptText);

When(/^I scroll to element "([^"]*)?"$/, scroll);

When(/^I close the last opened (window|tab)$/, closeLastOpenedWindow as never);

When(/^I focus the last opened (window|tab)$/, focusLastOpenedWindow as never);

When(
  /^I select the (\d+)(st|nd|rd|th) option for element "([^"]*)?"$/,
  selectOptionByIndex as never,
);

When(
  /^I select the option with the (name|value|text) "([^"]*)?" for element "([^"]*)?"$/,
  selectOption,
);

When(/^I move to element "([^"]*)?"(?: with an offset of (\d+),(\d+))*$/, moveTo);

When(/^I (.+) "([^"]*)" with (.+)$/, executeJs);

When(
  /^I make a (POST|GET) request to host "([^"]*)?" API endpoint "([^"]*)?"( and payload )*([^"]*)?$/,
  makeRequest,
);
