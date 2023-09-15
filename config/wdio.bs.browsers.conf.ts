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
  const distribution = argv.distribution || 'pd';
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
      ...sharedCapabilityOptions,
      browserName: 'chrome',
      browserVersion: 'latest',
      platformName: 'Windows 11',
      'goog:chromeOptions': headless ? {
        headless: true,
        'disable-gpu': true
      } : {},
      'bstack:options': bsOptions,
      'cjson:metadata': {
        browser: {
          name: 'chrome',
          version: 'latest',
        },
        // for an app
        // app: {
        //   name: 'name.of.app.ipa',
        //   version: '1.2.3',
        // },
        device: 'Desktop',
        platform: {
          name: 'Windows',
          version: '11'
        }
      },
    },
    {
      ...sharedCapabilityOptions,
      browserName: 'firefox',
      browserVersion: 'latest',
      platformName: 'Windows 11',
      'moz:firefoxOptions': headless ? {
        // flag to activate Firefox headless mode
        // (see https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities for more details about moz:firefoxOptions)
        args: ['-headless']
      } : {},
      'bstack:options': bsOptions,
      'cjson:metadata': {
        browser: {
          name: 'firefox',
          version: 'latest',
        },
        device: 'Desktop',
        platform: {
          name: 'Windows',
          version: '11'
        }
      },
    },
    {
      ...sharedCapabilityOptions,
      browserName : 'Edge',
      browserVersion: 'latest',
      platformName: 'Windows 11',
      'bstack:options': bsOptions,
      'cjson:metadata': {
        browser: {
          name: 'Edge',
          version: 'latest',
        },
        device: 'Desktop',
        platform: {
          name: 'Windows',
          version: '11'
        }
      },
    },
    {
      ...sharedCapabilityOptions,
      browserName : 'IE',
      browserVersion: '11.0',
      platformName: 'Windows 10',
      'bstack:options': bsOptions,
      'cjson:metadata': {
        browser: {
          name: 'IE',
          version: '11.0',
        },
        device: 'Desktop',
        platform: {
          name: 'Windows',
          version: '10'
        }
      },
    },
    {
      ...sharedCapabilityOptions,
      browserName : 'IE',
      browserVersion: 'latest',
      platformName: 'Windows 8',
      'bstack:options': bsOptions,
      'cjson:metadata': {
        browser: {
          name: 'IE',
          version: '10.0',
        },
        device: 'Desktop',
        platform: {
          name: 'Windows',
          version: '8'
        }
      },
    },
    {
      ...sharedCapabilityOptions,
      browserName : 'Safari',
      browserVersion: '16.0',
      platformName: 'OS X Ventura',
      os : 'OS X',
      osVersion : 'Ventura',
      // TODO: when custom cucumberJS metadata or browserstack options is added to OSX it breaks the run
      // 'bstack:options': {
      //   'debug': true,
      //   'consoleLogs': 'info',
      //   'networkLogs': 'true',
      // },
      // 'cjson:metadata': {
      //   browser: {
      //     name: 'Safari',
      //     version: '16.0',
      //   },
      //   device: 'Desktop',
      //   platform: {
      //     name: 'OS X',
      //     version: 'Ventura'
      //   }
      // },
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
