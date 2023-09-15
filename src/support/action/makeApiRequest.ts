import supertest, { CallbackHandler, Request, Response } from 'supertest';

export type HTTPVerb = 'POST' | 'GET';
export type SuperTestRequest = (url: string, callback?: CallbackHandler) => Request;

/**
 * Make a request to an API endpoint directly
 * @param  {HTTPVerb} httpVerb HTTP request verb
 * @param  {String}   host target host
 * @param  {String}   url target URL
 * @param  {Boolean}  hasPayload optional denote is HTTP request body exists
 * @param  {any}      payload optional request body
 */
export default async function (
  httpVerb: HTTPVerb,
  host: string,
  url: string,
  hasPayload?: boolean,
  payload?: any,
): Promise<void> {
  const requestFactory = supertest(host);
  const verb = httpVerb.toLowerCase();

  const request: SuperTestRequest = (requestFactory as any)[verb];
  let response: Response;

  if (hasPayload) {
    response = await request(url).send(payload).set('Accept', 'application/json').timeout(5000);
  } else {
    response = await request(url).timeout(5000);
  }

  // "this" is the Cucumber World object were we can persist values across all scenario steps
  // https://github.com/cucumber/cucumber-js/blob/main/docs/support_files/world.md
  // (this as World<any>).apiResponse = response;
  await browser.sharedStore.set('apiResponse', response);
}
