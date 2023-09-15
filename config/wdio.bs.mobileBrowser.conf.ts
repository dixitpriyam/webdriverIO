import url from 'node:url';
import path from 'node:path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { RemoteCapability } from '@wdio/types/build/Capabilities';
import packageJson from '../package.json' assert { type: "json" };
import { config as sharedConfig } from './wdio.shared.conf.ts';

const argv = yargs(hideBin(process.argv)).argv as any;
const dirname = url.fileURLToPath(new URL('..', import.meta.url));

// https://www.browserstack.com/automate/capabilities
const getCapabilities = (): any[] => {
  const headless = argv.headless || false;
  const browser = argv.browser || null;
  const concurrent = argv.concurrent || 5;
  const distribution = argv.distribution || 'od';
  const architecture = argv.architecture || 'v1';
  const geoLocation = argv.geoLocation || 'IN';
  const timezone = argv.timezone || 'Kolkata';

  const bsOptions = {
    debug: true,
    consoleLogs: 'info',
    networkLogs: 'true',
    projectName: `Sanity Suite ${architecture} ${distribution}`,
    buildName: `Sanity Suite ${architecture} ${distribution} ${packageJson.version} ${Date.now().toString()}`,
    // TODO: Fix the geoLocation
    // geoLocation: geoLocation,
    timezone: timezone
  };

  const sharedCapabilityOptions: RemoteCapability = {
    maxInstances: concurrent,
  };

  const availableCapabilities: any[] = [
    {
      browserName: 'chrome',
      'bstack:options': {
        deviceOrientation: 'portrait',
        deviceName: 'OnePlus 9',
        osVersion: '11.0'
      }
    }
    ,
     {
      browserName: 'safari',
      'bstack:options': {
        deviceOrientation: 'portrait',
        deviceName: 'iPhone 14 Pro Max',
        osVersion: '16'
      }
    },
     {
      ...sharedCapabilityOptions,
      browserName: 'chrome',
        'goog:chromeOptions': headless ? {
        headless: true,
        'disable-gpu': true
      } : {},
      'bstack:options': {
        deviceOrientation: 'portrait',
        deviceName: 'Samsung Galaxy Note 20',
        osVersion: '10.0'
      }
    }
  ];

  if(browser) {
    return availableCapabilities.filter((capability: any) => capability.browserName === browser) || [];
  }

  return availableCapabilities;
};

// https://www.browserstack.com/automate/capabilities
export const config: WebdriverIO.Config = {
  ...sharedConfig,
  ...{
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    // https://webdriver.io/docs/browserstack-service/
    services:[
      ...(sharedConfig.services ?? []),
      'browserstack'
    ],
    capabilities: getCapabilities() as any[],
    outputDir: process.env.CI ? path.join(dirname, 'logs') : sharedConfig.outputDir,
  }
}
