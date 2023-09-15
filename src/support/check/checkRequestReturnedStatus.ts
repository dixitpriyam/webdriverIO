import { HTTPMethod } from 'wdio-intercept-service';
import { expect } from 'expect-webdriverio';
import * as dotenv from 'dotenv';
import pause from '../action/pause.ts';
import { objectContains } from '../lib/checkIfObjectContains.ts';
import { objectIsSubset } from '../lib/checkIfObjectIsSubset.ts';
import { requestBodyFixtures } from '../../fixtures/index.ts';

dotenv.config(); // Load environment variables from .env file

/**
 * Intercept network requests and compare response status
 *
 * @param  {String}   httpVerb The httpVerb for the request to intercept
 * @param  {String}   url The URL intercept
 * @param  {string}   status The status of the response for intercepted request
 * @param  {string}   requestTimeout timeout for waiting for request to fire and return
 * @param  {string}   shouldCompareReqBody compare request body against expected partial object
 * @param  {string}   expectedPartialObjectName key name to get expected object from payloads map
 */
export default async (
  httpVerb: HTTPMethod,
  url: string,
  isAnyReplacement: string,
  commaSeparatedArgs: string,
  status: string,
  requestTimeout: string,
  shouldCompareReqBody: boolean,
  expectedPartialObjectName?: string,
) => {
  let modifiedUrl = url;
  if (isAnyReplacement) {
    const args = commaSeparatedArgs.split(',');
    const writeKeyArg = args[0];
    const dataplaneArg = args[1];

    const writeKey: any = process.env[writeKeyArg];
    const dataplane: any = process.env[dataplaneArg];

    modifiedUrl = url.replace('WRITEKEY', `${writeKey}`).replace('DATAPLANE', `${dataplane}`);
  }
  const intStatus = parseInt(status, 10);
  const intRequestTimeout = parseInt(requestTimeout, 10);
  const responseCheckInterval = intRequestTimeout / 5;
  let totalTimeToResponse = 0;
  let requestsArePending = true;

  // Set interceptor expectations
  browser.expectRequest(httpVerb, modifiedUrl, intStatus);
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

  // Assert partial request payload contents match if comparison is desired
  if (shouldCompareReqBody && expectedPartialObjectName) {
    // Get expected object value form fixtures
    const expectedRequestBody = requestBodyFixtures[expectedPartialObjectName];
    const interceptorConfigOptions = {
      orderBy: 'START',
      includePending: false,
    } as any;

    // Get all requests and filter for the one of interest
    const requests = await browser.getRequests(interceptorConfigOptions);
    const req = requests?.find((request) => request.url === modifiedUrl);

    // Assert request payload contents partial match
    expect(req).toBeDefined();
    expect(objectIsSubset(req?.body, expectedRequestBody)).toBeTruthy();
  }

  // Reset expectations before step ends
  await browser.resetExpectations();
};
