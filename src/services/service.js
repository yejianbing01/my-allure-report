import { post } from "../utils/request";

// TODO queryString
/**
 * 获取测试结果树
 * @param {Object} params
 */
export function findTestTreeList({ testTaskId }) {
  const query = `
            findTestTreeList: findTestTreeList(
                search: {testTaskId:"${testTaskId}"}
            ){
                success
                message
                dataList {
                    id,
                    suiteTree
                }
            }
        `;

  return post(`query {${query}}`).then((res) => res.data.findTestTreeList.dataList);
}

/**
 * 获取测试详情
 * @param {Object} params
 */
export function getTestItemDetail({ id }) {
  const query = `
          getTestItemDetail:getTestItemDetail(
                  search:{id:"${id}"},
              ){
                  success
                  message
                  data {
                    id,name,type,flag,level,retries,duration,testResult{data},testStepList{name,content}
                  }
              }
          `;

  return post(`query {${query}}`).then((res) => res.data);
}

/**
 * 获取测试任务详情
 * @param {Object} params
 */
export function getTestTaskDetail({ testTaskId }) {
  const query = `
            getTestTreeDetail:getTestTaskDetail(
                search:{id:"${testTaskId}"},
                ){
                    success
                    message
                    data {
                      id,env,duration,startTime,endTime,testJobId,statistics{blocker,critical,normal,minor,trivial}
                    }
                }
            `;

  return post(`query {${query}}`).then((res) => res.data.getTestTreeDetail.data);
}

/**
 * 查询测试任务执行列表
 * @param {Object} params
 * @param {String} params.testJobId 测试任务id
 */
export function findTestTaskList({ testJobId }) {
  const query = `
            findTestTaskList:findTestTaskList(
                search:{testJobId:"${testJobId}"},
                sort:{execNo:DESC}
                ){
                    success
                    message
                    dataList {
                      execNo,statistics{passes, pending, blocker, critical, normal, minor, trivial,total}
                    }
                }
            `;

  return post(`query {${query}}`).then((res) => res.data.findTestTaskList.dataList);
}
