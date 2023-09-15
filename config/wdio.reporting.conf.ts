import { ReporterEntry } from '@wdio/types/build/Reporters';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import packageJson from '../package.json' assert { type: "json" };

const argv = yargs(hideBin(process.argv)).argv as any;
const distribution = argv.distribution || 'pd';
const architecture = argv.architecture || 'v1';

const reporters: ReporterEntry[] = [
  'spec',
  ['cucumberjs-json', {
    jsonFolder: './reports/cucumberJs/',
    language: 'en'
  }],
];

// for more options see https://github.com/wswebcreation/multiple-cucumber-html-reporter#options
const reportOptions = {
  jsonDir: './reports/cucumberJs/',
  reportPath: './reports/multiCucumberJs/',
  pageTitle: 'Sanity Suite Cross-browser test report',
  reportName: 'Sanity Suite',
  pageFooter: '<div class="col-md-12 col-sm-12 col-xs-12"><div class="x_panel"><p>PD</p></div></div>',
  displayDuration: true,
  customData: {
    title: 'Run info',
    data: [
      {label: 'Project', value: 'Sanity Suite'},
      {label: 'Architecture', value: architecture},
      {label: 'Distribution', value: distribution},
      {label: 'Version', value: packageJson.version},
      {label: 'Execution Start Time', value: Date().toLocaleString()},
    ]
  }
};

export {
  reporters,
  reportOptions
}
