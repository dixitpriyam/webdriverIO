import url from 'node:url';
import path from 'node:path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { config as sharedConfig } from './wdio.shared.conf.ts';

const argv = yargs(hideBin(process.argv)).argv as any;

const dirname = url.fileURLToPath(new URL('../', import.meta.url));
const headless = argv.headless || false;
const headlessArgs = [
  '--headless',
  '--disable-gpu'
];
const browserArgs = [
  '--disable-infobars',
  '--window-size=1280,800',
  '--no-sandbox',
  '--disable-setuid-sandbox',
  '--disable-dev-shm-usage',
];
const chromeOptions = browserArgs.concat(headless ? headlessArgs : []);

export const config: WebdriverIO.Config = {
  ...sharedConfig,
  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': {
      args: chromeOptions,
    },
  }],
  port: 9516,
  services: [
    ...(sharedConfig.services ?? []),
    [
      'chromedriver',
      {
        chromeDriverArgs: ['--port=9516', '--url-base=\'/\''],
      },
    ],
  ],
  outputDir: process.env.CI ? path.join(dirname, 'logs') : sharedConfig.outputDir,
};
