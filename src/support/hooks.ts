import { generate } from 'multiple-cucumber-html-reporter';
import fs from 'fs-extra';
import {
  DesiredCapabilities,
  RemoteCapabilities,
  RemoteCapability,
} from '@wdio/types/build/Capabilities';
import { Testrunner as TestrunnerOptions } from '@wdio/types/build/Options';
import { ITestCaseHookParameter } from '@cucumber/cucumber';
import { Frameworks } from '@wdio/types';
import { HookFunctions } from '@wdio/types/build/Services';
import { Feature, Pickle, PickleStep } from '@wdio/browserstack-service/build/cucumber-types';
import { Suite, Test, TestResult } from '@wdio/types/build/Frameworks';
import { HookFunctionExtension } from '@wdio/cucumber-framework/build/types';
import { reportOptions } from '../../config/wdio.reporting.conf.ts';

export interface WdioCucumberHookFunctions extends HookFunctions, HookFunctionExtension {}

//
// =====
// Hooks
// =====
// WebdriverIO provides a several hooks you can use to interfere the test process in order to enhance
// it and build services around it. You can either apply a single function to it or an array of
// methods. If one of them returns with a promise, WebdriverIO will wait until that promise is
// resolved to continue.
//
const hooks: WdioCucumberHookFunctions = {
  /**
   * Gets executed once before all workers get launched.
   * @param {object} config wdio configuration object
   * @param {Array.<Record<string, any> | null>} capabilities list of capabilities details
   */
  onPrepare(config: TestrunnerOptions, capabilities: RemoteCapabilities) {
    // Remove the `.tmp/` folder that holds the json and report files
    fs.removeSync(reportOptions.jsonDir);
  },
  /**
   * Gets executed before a worker process is spawned and can be used to initialize specific service
   * for that worker as well as modify runtime environments in an async fashion.
   * @param  {string} cid      capability id (e.g 0-0)
   * @param  {object} caps     object containing capabilities for session that will be spawn in the worker
   * @param  {object} specs    specs to be run in the worker process
   * @param  {object} args     object that will be merged with the main configuration once worker is initialized
   * @param  {object} execArgv list of string arguments passed to the worker process
   */
  onWorkerStart(
    cid: string,
    caps: DesiredCapabilities,
    specs: string[],
    args: TestrunnerOptions,
    execArgv: string[],
  ) {},
  /**
   * Gets executed after a worker process has exited.
   * @param  {string} cid      capability id (e.g 0-0)
   * @param  {number} exitCode 0 - success, 1 - fail
   * @param  {object} specs    specs to be run in the worker process
   * @param  {number} retries  number of retries used
   */
  onWorkerEnd(cid: string, exitCode: number, specs: string[], retries: number) {},
  /**
   * Gets executed before initializing the webdriver session and test framework. It allows you
   * to manipulate configurations depending on the capability or spec.
   * @param {object} config wdio configuration object
   * @param {Array.<Record<string, any> | null>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that are to be run
   */
  beforeSession(
    config: Omit<TestrunnerOptions, 'capabilities'>,
    capabilities: RemoteCapability,
    specs: string[],
    cid: string,
  ) {},
  /**
   * Gets executed before test execution begins. At this point you can access to all global
   * variables like `browser`. It is the perfect place to define custom commands.
   * @param {Array.<Record<string, any> | null>} capabilities list of capabilities details
   * @param {Array.<String>} specs        List of spec file paths that are to be run
   * @param {object}         browser      instance of created browser/device session
  //  */
  before(capabilities: RemoteCapability, specs: string[], browser: any) {},
  /**
   * Gets executed before the suite starts.
   * @param {object} suite suite details
   */
  beforeSuite(suite: Suite) {},
  /**
   * This hook gets executed _before_ every hook within the suite starts.
   * (For example, this runs before calling `before`, `beforeEach`, `after`, `afterEach` in Mocha.). In Cucumber `context` is the World object.
   *
   */
  beforeHook(test: any, context: any) {},
  /**
   * Hook that gets executed _after_ every hook within the suite ends.
   * (For example, this runs after calling `before`, `beforeEach`, `after`, `afterEach` in Mocha.). In Cucumber `context` is the World object.
   */
  afterHook(test: Test, context: any, result: TestResult) {},
  /**
   * Function to be executed before a test (in Mocha/Jasmine only)
   * @param {object} test    test object
   * @param {object} context scope object the test was executed with
   */
  beforeTest(test: Test, context: any) {},
  /**
   * Runs before a WebdriverIO command is executed.
   * @param {string} commandName hook command name
   * @param {Array} args arguments that the command would receive
   */
  beforeCommand(commandName: string, args: any[]) {},
  /**
   * Runs after a WebdriverIO command gets executed
   * @param {string} commandName hook command name
   * @param {Array} args arguments that command would receive
   * @param {number} result 0 - command success, 1 - command error
   * @param {object} error error object, if any
   */
  afterCommand(commandName: string, args: any[], result: any, error?: Error) {},
  /**
   * Function to be executed after a test (in Mocha/Jasmine only)
   * @param {object}  test             test object
   * @param {object}  context          scope object the test was executed with
   * @param {Error}   result.error     error object in case the test fails, otherwise `undefined`
   * @param {*}       result.result    return object of test function
   * @param {number}  result.duration  duration of test
   * @param {boolean} result.passed    true if test has passed, otherwise false
   * @param {object}  result.retries   information to spec related retries, e.g. `{ attempts: 0, limit: 0 }`
   */
  afterTest(test: Test, context: any, result: TestResult) {},
  /**
   * Hook that gets executed after the suite has ended.
   * @param {object} suite suite details
   */
  afterSuite(suite: Suite) {},
  /**
   * Gets executed after all tests are done. You still have access to all global variables from
   * the test.
   * @param {number} result 0 - test pass, 1 - test fail
   * @param {Array.<Record<string, any> | null>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  after(result: number, capabilities: RemoteCapability, specs: string[]) {},
  /**
   * Gets executed right after terminating the webdriver session.
   * @param {object} config wdio configuration object
   * @param {Array.<Record<string, any> | null>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  afterSession(config: TestrunnerOptions, capabilities: RemoteCapability, specs: string[]) {},
  /**
   * Gets executed after all workers have shut down and the process is about to exit.
   * An error thrown in the `onComplete` hook will result in the test run failing.
   * @param {object} exitCode 0 - success, 1 - fail
   * @param {object} config wdio configuration object
   * @param {Array.<Record<string, any> | null>} capabilities list of capabilities details
   * @param {<Record<string, any> | null>} results object containing test results
   */
  onComplete(
    exitCode: number,
    config: Omit<TestrunnerOptions, 'capabilities'>,
    capabilities: RemoteCapabilities,
    results: any,
  ) {
    // Generate the report when it all tests are done
    generate(reportOptions);
  },
  /**
   * Gets executed when a refresh happens.
   * @param {string} oldSessionId session ID of the old session
   * @param {string} newSessionId session ID of the new session
   */
  onReload(oldSessionId: string, newSessionId: string) {},
  /**
   * Cucumber Hooks
   *
   * Runs before a Cucumber Feature.
   * @param {string}                   uri      path to feature file
   * @param {GherkinDocument.IFeature} feature  Cucumber feature object
   */
  beforeFeature(uri: string, feature: Feature) {},
  /**
   *
   * Runs before a Cucumber Scenario.
   * @param {ITestCaseHookParameter} world    world object containing information on pickle and test step
   * @param {object}                 context  Cucumber World object
   */
  beforeScenario(world: ITestCaseHookParameter, context: Record<string, any> | null) {
    // browser.setupInterceptor();
  },
  /**
   *
   * Runs before a Cucumber Step.
   * @param {Pickle.IPickleStep} step     step data
   * @param {IPickle}            scenario scenario pickle
   * @param {object}             context  Cucumber World object
   */
  beforeStep(step: PickleStep, scenario: Pickle, context: Record<string, any> | null) {},
  /**
   *
   * Runs after a Cucumber Step.
   * @param {Pickle.IPickleStep} step             step data
   * @param {IPickle}            scenario         scenario pickle
   * @param {object}             result           results object containing scenario results
   * @param {boolean}            result.passed    true if scenario has passed
   * @param {string}             result.error     error stack if scenario failed
   * @param {number}             result.duration  duration of scenario in milliseconds
   * @param {object}             context          Cucumber World object
   */
  afterStep(
    step: PickleStep,
    scenario: Pickle,
    result: Frameworks.PickleResult,
    context: Record<string, any> | null,
  ) {},
  /**
   *
   * Runs after a Cucumber Scenario.
   * @param {ITestCaseHookParameter} world            world object containing information on pickle and test step
   * @param {object}                 result           results object containing scenario results `{passed: boolean, error: string, duration: number}`
   * @param {boolean}                result.passed    true if scenario has passed
   * @param {string}                 result.error     error stack if scenario failed
   * @param {number}                 result.duration  duration of scenario in milliseconds
   * @param {object}                 context          Cucumber World object
   */
  afterScenario(
    world: ITestCaseHookParameter,
    result: Frameworks.PickleResult,
    context: Record<string, any> | null,
  ) {
    // browser.disableInterceptor();
  },
  /**
   *
   * Runs after a Cucumber Feature.
   * @param {string}                   uri      path to feature file
   * @param {GherkinDocument.IFeature} feature  Cucumber feature object
   */
  afterFeature(uri: string, feature: Feature) {},
};

export { hooks };
