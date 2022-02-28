import { post } from "../utils/request";
import testTree from "../../../node/graphql/MBT/queryString/testTree";
import testItem from "../../../node/graphql/MBT/queryString/testItem";
import testJob from "../../../node/graphql/MBT/queryString/testJob";

/**
 * 获取测试结果树
 * @param {Object} params
 */
export function findTestTreeList({ testTaskId }) {
  const query = testTree.findTestTreeList({
    search: { testTaskId },
    alias: "findTestTreeList",
    result: "id,suiteTree",
  });

  return post(`query {${query}}`).then((res) => res.data.findTestTreeList.data);
}

/**
 * 获取测试详情
 * @param {Object} params
 */
export function getTestItemDetail({ id }) {
  const query = testItem.getTestItemDetail({
    search: { id },
    alias: "getTestItemDetail",
    result: "id,name,type,flag,level,retries,duration,testResult{data},testStepList{name,content}",
  });

  return post(`query {${query}}`).then((res) => res.data);
}

/**
 * 获取测试任务详情
 * @param {Object} params
 */
export function getTestTaskDetail({ testTaskId }) {
  const query = testJob.getTestTaskDetail({
    search: { id: testTaskId },
    alias: "getTestTreeDetail",
    result: "id,env,duration,startTime,endTime,testJobId,statistics{blocker,critical,normal,minor,trivial}",
  });

  return post(`query {${query}}`).then((res) => res.data.getTestTreeDetail.data);
}

/**
 * 查询测试任务执行列表
 * @param {Object} params
 * @param {String} params.testJobId 测试任务id
 */
export function findTestTaskList({ testJobId }) {
  const query = testJob.findTestTaskList({
    search: { testJobId },
    alias: "findTestTaskList",
    sort: { execNo: "DESC" },
    result: "execNo,statistics{passes, pending, blocker, critical, normal, minor, trivial,total}",
  });

  return post(`query {${query}}`).then((res) => res.data.findTestTaskList.data);
}
