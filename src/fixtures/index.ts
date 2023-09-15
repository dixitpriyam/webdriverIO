import { dummyRequestBody } from './requestPayloads/dummyRequestBody.ts';
import { executeJs } from './javascript/executeJs.ts';

const requestBodyFixtures: Record<string, any> = {
  dummyRequestBody,
};
const JSFixtures: Record<string, any> = {
  executeJs,
};

export { requestBodyFixtures, JSFixtures };
