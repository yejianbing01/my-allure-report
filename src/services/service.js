import { post } from "../utils/request";

// TODO queryString
/**
 * 获取测试结果树
 * @param {Object} params
 */
export function findTestTreeList({ testTaskId }) {
  const query = `
        `;

  return post(`query {${query}}`).then((res) => res.data.findTestTreeList.dataList);
}

/**
 * 获取测试详情
 * @param {Object} params
 */
export function getTestItemDetail({ id }) {
  const query = `
          `;

  return post(`query {${query}}`).then((res) => res.data);
}

/**
 * 获取测试任务详情
 * @param {Object} params
 */
export function getTestTaskDetail({ testTaskId }) {
  const query = `
            `;

  return post(`query {${query}}`).then((res) => res.data.getTestTaskDetail.data);
}

/**
 * 查询测试任务执行列表
 * @param {Object} params
 * @param {String} params.testJobId 测试任务id
 */
export function findTestTaskList({ testJobId }) {
  const query = `
            `;

  return post(`query {${query}}`).then((res) => res.data.findTestTaskList.dataList);
}
