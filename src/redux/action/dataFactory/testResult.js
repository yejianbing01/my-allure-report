import { PASSED, FAILURE, SKIP, TEST_SUITE, BLOCKER, CRITICAL, MINOR, TRIVIAL, NORMAL } from "../../../../config";
const _ = require("lodash");

/** 测试套件：suite */
class TestSuite {
  constructor() {
    this.id = null;
    this.title = null;
    this.type = TEST_SUITE;
    this.suitePath = "";
    this.testCaseSummary = new TestCaseSummary();
    this.hooks = [];
    this.tests = [];
    this.children = [];
  }
}

/** 测试项：hook/test */
class TestItem {
  constructor() {
    this.id = null;
    this.name = null;
    this.type = null;
    this.duration = null;
    this.level = null;
    this.flag = null;
    this.display = true;
  }

  create(params) {
    const { id, name, type, duration, flag, level } = params;
    this.id = id;
    this.name = name;
    this.type = type;
    this.duration = duration;
    this.level = level;
    this.flag = flag;
    return this;
  }
}

class TestCaseSummary {
  constructor() {
    this.total = 0;
    this[PASSED] = { num: 0, title: "通过" };
    this[FAILURE] = { num: 0, title: "失败" };
    this[SKIP] = { num: 0, title: "跳过" };
  }
}

class TestResult {
  constructor() {
    this.testTaskId = null;
    this.testSuiteList = [];
  }

  create({ testTaskId, suiteTreeList }) {
    this.testTaskId = testTaskId;
    const suiteList = this.getSuiteListWidthChildren({ suiteTreeList });
    suiteList?.forEach((suites) => {
      const _suiteList = suites.map((ele) => this.createTestSuite(ele));
      this.testSuiteList = this.testSuiteList.concat(_suiteList);
    });
    return this;
  }

  getSuiteListWidthChildren({ suiteTreeList }) {
    return _.cloneDeep(suiteTreeList).map((suiteTree) => {
      const dataList = Object.values(suiteTree);
      dataList.forEach((suite) => {
        this.replaceTitleToChildren({ suite });
      });
      return dataList;
    });
  }

  /** 将用例套件子集key替换为children字段，方便后续计算 */
  replaceTitleToChildren({ suite }) {
    suite.children = [];
    for (const [key, value] of Object.entries(suite)) {
      if (key.startsWith("suite_")) {
        this.replaceTitleToChildren({ suite: value });
        suite.children.push(value);
        delete suite[key];
      }
    }
    if (!suite.children.length) delete suite.children;
  }

  createTestSuite(suiteData) {
    const suite = new TestSuite();
    suite.suitePath = suiteData.suitePath;
    suite.id = suiteData.id;
    suite.title = suiteData.name;
    suite.hooks = suiteData.hooks.map((hook) => new TestItem().create(hook));
    suite.tests = suiteData.tests.map((test) => new TestItem().create(test));
    if (suiteData.children && suiteData.children.length) {
      suite.children = suiteData.children.map((ele) => {
        return this.createTestSuite(ele);
      });
    }
    return suite;
  }
}

export default new TestResult();

export function getTestSuiteWithSummary(testSuiteList) {
  return testSuiteList.map((testSuite) => {
    return calcTestCaseSummaryForSuite(testSuite, testSuite);
  });
}

export function getSortTestItemList(testSuiteList) {
  return sortTestSuite(testSuiteList);
}

function calcTestCaseSummaryForSuite(suite, orgSuite) {
  suite.hooks.forEach((hook) => _calc(hook, suite));
  suite.tests.forEach((test) => _calc(test, suite));
  suite.children.forEach((childrenSuite) => {
    calcTestCaseSummaryForSuite(childrenSuite, suite);
  });
  const suiteIdList = suite?.suitePath?.split(".") || [];
  const curSuiteIdIndex = suiteIdList.indexOf(suite.id);
  curSuiteIdIndex && suiteIdList.splice(curSuiteIdIndex, 1);
  calcTestCaseSummaryForParentSuite(orgSuite, suiteIdList, suite.testCaseSummary);
  return orgSuite;
}

function _calc(testItem, suite) {
  testItem.flag === FAILURE && (suite.testCaseSummary.FAILURE.num += 1);
  testItem.flag === PASSED && (suite.testCaseSummary.PASSED.num += 1);
  testItem.flag === SKIP && (suite.testCaseSummary.SKIP.num += 1);
  suite.testCaseSummary.total += 1;
}

function calcTestCaseSummaryForParentSuite(parentSuite, suiteIdList, testCaseSummary) {
  if (suiteIdList.includes(parentSuite.id)) {
    parentSuite.testCaseSummary.FAILURE.num += testCaseSummary.FAILURE.num;
    parentSuite.testCaseSummary.PASSED.num += testCaseSummary.PASSED.num;
    parentSuite.testCaseSummary.SKIP.num += testCaseSummary.SKIP.num;
    parentSuite.testCaseSummary.total += testCaseSummary.total;
  }
  parentSuite?.children?.forEach((suite) => {
    calcTestCaseSummaryForParentSuite(suite, suiteIdList, testCaseSummary);
  });
}

export function getTestResultSummary(testSuiteList) {
  const testCaseSummary = new TestCaseSummary();
  testSuiteList.forEach((suite) => {
    testCaseSummary.total += suite.testCaseSummary.total;
    testCaseSummary.PASSED.num += suite.testCaseSummary.PASSED.num;
    testCaseSummary.FAILURE.num += suite.testCaseSummary.FAILURE.num;
    testCaseSummary.SKIP.num += suite.testCaseSummary.SKIP.num;
  });
  return testCaseSummary;
}

/**
 * 用例分类
 */
function sortTestSuite(testSuiteList) {
  const testCaseSort = {
    FAILURE: {
      title: "失败用例",
      type: TEST_SUITE,
      hooks: [],
      tests: [],
      testCaseSummary: {
        total: 0,
        FAILURE: { num: 0, title: "失败" },
      },
      // BLOCKER, CRITICAL, MINOR, TRIVIAL, NORMAL
      children: [
        {
          title: "崩溃",
          level: BLOCKER,
          type: TEST_SUITE,
          hooks: [],
          tests: [],
          testCaseSummary: {
            total: 0,
            FAILURE: { num: 0, title: BLOCKER },
          },
        },
        {
          title: "严重",
          level: CRITICAL,
          type: TEST_SUITE,
          hooks: [],
          tests: [],
          testCaseSummary: {
            total: 0,
            FAILURE: { num: 0, title: CRITICAL },
          },
        },
        {
          title: "轻微",
          level: MINOR,
          type: TEST_SUITE,
          hooks: [],
          tests: [],
          testCaseSummary: {
            total: 0,
            FAILURE: { num: 0, title: "MINOR" },
          },
        },
        {
          title: "次要",
          level: TRIVIAL,
          type: TEST_SUITE,
          hooks: [],
          tests: [],
          testCaseSummary: {
            total: 0,
            FAILURE: { num: 0, title: TRIVIAL },
          },
        },
        {
          title: "普通",
          level: NORMAL,
          type: TEST_SUITE,
          hooks: [],
          tests: [],
          testCaseSummary: {
            total: 0,
            FAILURE: { num: 0, title: NORMAL },
          },
        },
      ],
    },
    SKIP: {
      title: "跳过用例",
      type: TEST_SUITE,
      hooks: [],
      tests: [],
      testCaseSummary: {
        total: 0,
        SKIP: { num: 0, title: "跳过" },
      },
    },
    PASSED: {
      title: "通过用例",
      type: TEST_SUITE,
      hooks: [],
      tests: [],
      testCaseSummary: {
        total: 0,
        PASSED: { num: 0, title: "通过" },
      },
    },
  };

  function sortTestItem(testSuite) {
    testSuite.hooks.forEach((hook) => sort(hook));
    testSuite.tests.forEach((test) => sort(test));
    testSuite.children?.forEach((child) => sortTestItem(child));
  }

  function sort(testItem) {
    let child;
    switch (testItem.flag) {
      case PASSED:
        testCaseSort.PASSED.tests.push(testItem);
        testCaseSort.PASSED.testCaseSummary.PASSED.num += 1;
        testCaseSort.PASSED.testCaseSummary.total += 1;
        break;
      case FAILURE:
        testCaseSort.FAILURE.testCaseSummary.FAILURE.num += 1;
        testCaseSort.FAILURE.testCaseSummary.total += 1;
        child = testCaseSort.FAILURE.children.find((ele) => ele.level === testItem.level);
        child.tests.push(testItem);
        child.testCaseSummary.FAILURE.num += 1;
        child.testCaseSummary.total += 1;
        break;
      case SKIP:
        testCaseSort.SKIP.tests.push(testItem);
        testCaseSort.SKIP.testCaseSummary.SKIP.num += 1;
        testCaseSort.SKIP.testCaseSummary.total += 1;
        break;
      default:
        break;
    }
  }
  testSuiteList.forEach((testSuite) => sortTestItem(testSuite));
  const sortTestItemList = Object.values(testCaseSort);
  handleDeleteEmptyCase(sortTestItemList);
  return sortTestItemList;
}

export function filterSelectedCase({ testSuiteList, statusList }) {
  handleFilterSelectedCase({
    dataList: testSuiteList,
    statusList,
  });
  handleDeleteEmptyCase(testSuiteList);
  return testSuiteList;
}

function handleFilterSelectedCase({ dataList, statusList }) {
  dataList.forEach((data) => {
    if (data.type === TEST_SUITE && data.children) {
      handleFilterSelectedCase({
        dataList: data.children,
        statusList,
      });
    }
    if (data.hooks) {
      for (let i = data.hooks.length - 1; i >= 0; i--) {
        const hook = data.hooks[i];
        !statusList.includes(hook.flag) && data.hooks.splice(i, 1);
      }
    }
    if (data.tests) {
      for (let i = data.tests.length - 1; i >= 0; i--) {
        const test = data.tests[i];
        !statusList.includes(test.flag) && data.tests.splice(i, 1);
      }
    }
  });
}

/** 删除没有用例的tree结构 */
function handleDeleteEmptyCase(dataList) {
  for (let i = dataList.length - 1; i >= 0; i--) {
    const data = dataList[i];
    if (data.children && data.children.length) {
      handleDeleteEmptyCase(data.children);
    }
    if (!data.children?.length && !data.hooks?.length && !data.tests?.length) {
      dataList.splice(i, 1);
    }
  }
}
