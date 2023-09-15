import url from 'node:url';
import path from 'node:path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { RemoteCapability } from '@wdio/types/build/Capabilities';
import packageJson from '../package.json' assert { type: "json" };
import { config as sharedConfig } from './wdio.shared.conf.ts';
import { config as browsersConfig } from './wdio.bs.browsers.conf.ts';
import { config as mobilebrowsersConfig } from './wdio.bs.mobileBrowser.conf.ts';

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

  const availablebrowsersConfigCapabilities: any[] = browsersConfig.capabilities as any[];
  const availablemobilebrowsersConfigCapabilities: any[] = mobilebrowsersConfig.capabilities as any[];

  const availableCapabilities = [...availablebrowsersConfigCapabilities, ...availablemobilebrowsersConfigCapabilities]

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
