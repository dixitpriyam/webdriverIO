import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const executeJs = (JSsnippet: string, commaSeparatedArgs: string): string => {
  const args = commaSeparatedArgs.split(',');
  const writeKeyArg = args[0];
  const dataplaneArg = args[1];

  const writeKey: any = process.env[writeKeyArg];
  const dataplane: any = process.env[dataplaneArg];

  const finalJSsnippet: string = JSsnippet.replace('WRITEKEY', `'${writeKey}'`).replace(
    'DATAPLANE',
    `'${dataplane}'`,
  );

  return finalJSsnippet;
};

export { executeJs };
