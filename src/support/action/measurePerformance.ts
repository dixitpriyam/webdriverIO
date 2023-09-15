import CucumberJsJsonReporter from 'wdio-cucumberjs-json-reporter';
import { EnablePerformanceAuditsOptions } from '@wdio/devtools-service/build/types';

const generatePerformanceReportCSVContents = (
  performanceReportOutput: Record<string, any>,
): string => {
  let performanceReportCSVHeaders = '';
  let performanceReportCSVValues = '';

  Object.values({
    metrics: performanceReportOutput.metrics,
    lighthouseScore: performanceReportOutput.lighthouseScore,
    diagnostics: performanceReportOutput.diagnostics,
  }).forEach((categoryData) => {
    Object.keys(categoryData).forEach((headerKey) => {
      performanceReportCSVHeaders += `${headerKey},`;
      performanceReportCSVValues += `${categoryData[headerKey]},`;
    });
  });

  return `${performanceReportCSVHeaders}\r\n${performanceReportCSVValues}\r\n`;
};

const THROTTLE_CONFIG: EnablePerformanceAuditsOptions = {
  networkThrottling: 'Regular 4G',
  cpuThrottling: 4,
  cacheEnabled: false,
  formFactor: 'desktop',
};

const NON_THROTTLE_CONFIG: EnablePerformanceAuditsOptions = {
  networkThrottling: 'online',
  cpuThrottling: 0,
  cacheEnabled: false,
  formFactor: 'desktop',
};

/**
 * Open the given URL
 * @param  {String}   type Type of navigation (getUrl or site)
 * @param  {String}   page The URL to navigate to
 * @param  {boolean}  throttled if lighthouse should throttle network
 */
export default async (throttled: boolean, type: 'url' | 'site', page: string) => {
  await browser.enablePerformanceAudits(throttled ? THROTTLE_CONFIG : NON_THROTTLE_CONFIG);

  /**
   * The URL to navigate to
   * @type {String}
   */
  const url = type === 'url' ? page : browser.options.baseUrl + page;
  await browser.url(url);

  const metrics = await browser.getMetrics();
  const score = await browser.getPerformanceScore();
  const diagnostics = await browser.getDiagnostics();
  const mainThreadBreakdown = await browser.getMainThreadWorkBreakdown();
  const pageWeight = await browser.getPageWeight();

  const performanceReportOutput = {
    metrics,
    lighthouseScore: {
      score,
    },
    diagnostics,
    mainThreadBreakdown,
    pageWeight,
  };
  const performanceReportCSVOutput = generatePerformanceReportCSVContents(performanceReportOutput);

  await CucumberJsJsonReporter.attach(performanceReportOutput as any, 'application/json');
  await CucumberJsJsonReporter.attach(performanceReportCSVOutput, 'text/plain');

  await browser.disablePerformanceAudits();
};
