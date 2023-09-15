/* eslint-disable no-console */
import url from 'node:url';
import path from 'node:path';
import { config as sharedConfig } from './wdio.shared.conf.ts';

const dirname = url.fileURLToPath(new URL('..', import.meta.url));

export const config: WebdriverIO.Config = {
  ...sharedConfig,
  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': {
      args: [
        '--disable-infobars',
        '--window-size=1280,800',
        '--headless',
        '--no-sandbox',
        '--disable-gpu',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
      ],
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
    [
      'static-server',
      {
        port: 8080,
        folders: [
          { mount: '/', path: path.join(dirname, 'demo-app') },
        ],
      },
    ],
  ],
  path: '/',
  beforeFeature: async () => {
    /**
     * check if static website is up and cancel if not
     */
    await (browser as WebdriverIO.Browser).url('/');
    const pageTitle = await (browser as WebdriverIO.Browser).getTitle();
    if (pageTitle !== 'DEMO APP') {
      console.error(`Demo app is not up, found ${pageTitle}`);
      console.log(await (browser as WebdriverIO.Browser).getPageSource());
      process.exit(1);
    }
  },
  outputDir: process.env.CI ? path.join(dirname, 'logs') : sharedConfig.outputDir,
  specs: [
    '../src/examples/**/*.feature',
  ]
};
