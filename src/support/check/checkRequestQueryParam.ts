import { HTTPMethod } from 'wdio-intercept-service';
import { expect } from 'expect-webdriverio';
import pause from '../action/pause.ts';
import { objectContains } from '../lib/checkIfObjectContains.ts';
import { requestBodyFixtures } from '../../fixtures/index.ts';

/**
 * Intercept network requests and compare response status
 *
 * @param  {String}   httpVerb The httpVerb for the request to intercept
 * @param  {String}   url The URL intercept
 * @param  {string}   status The status of the response for intercepted request
 * @param  {string}   requestTimeout timeout for waiting for request to fire and return
 * @param  {string}   shouldCompare compare request body against expected partial object
 * @param  {string}   expectedQueryParam key name to get expected object from payloads map
 */
export default async (
  shouldValidate: string,
  httpVerb: HTTPMethod,
  url: string,
  status: string,
  requestTimeout: string,
  shouldCompare: string,
  expectedQueryParam: string,
) => {
  const intStatus = parseInt(status, 10);
  const intRequestTimeout = parseInt(requestTimeout, 10);
  const responseCheckInterval = intRequestTimeout / 5;
  let totalTimeToResponse = 0;
  let requestsArePending = true;

  // Set interceptor expectations
  const expectations = await browser.getExpectations();

  // Poll until timeout until all requests get response
  while (totalTimeToResponse < intRequestTimeout && requestsArePending) {
    await pause(requestTimeout);

    requestsArePending = await browser.hasPendingRequests();
    totalTimeToResponse += responseCheckInterval;
  }

  // Check if timeout has been excited
  if (requestsArePending) {
    await browser.resetExpectations();
    throw Error(
      `Expected requests ${expectations[0]} were not fired or response was not within expected timeout of ${requestTimeout}`,
    );
  }

  // Assert the expect request statuses
  await browser.assertExpectedRequestsOnly();
  // Get expected object value form fixtures
  const interceptorConfigOptions = {
    orderBy: 'START',
    includePending: false,
  } as any;

  // Get all requests and filter for the one of interest
  const requests = await browser.getRequests(interceptorConfigOptions);
  // const req = requests.find((request) => request.url === url);
  const req = requests.find((request) => request.url.startsWith(url));
  // expect(req?.).toEqual(intStatus)
  browser.expectRequest(httpVerb, req?.url as any, intStatus);
  // Assert request payload contents partial match
  if (shouldValidate !== "do not") {
    expect(req).toBeDefined();
  }
  else{
    expect(req).not.toBeDefined();
  }

  // Assert Query Param content
  if (shouldCompare !== "not" && shouldValidate !== "do not") {
    expect(req?.url).toContain(expectedQueryParam)
  }
  if (shouldCompare === "not" && shouldValidate !== "do not"){
    expect(req?.url).not.toContain(expectedQueryParam)
  }
  
  // Reset expectations before step ends
  await browser.resetExpectations();
};