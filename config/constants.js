// 通过
export const PASSED = "PASSED";
// 失败
export const FAILURE = "FAILURE";
// 跳过
export const SKIP = "SKIP";

// 中断缺陷（客户端程序无响应，无法执行下一步操作）
export const BLOCKER = "BLOCKER";
// 临界缺陷（功能点缺失
export const CRITICAL = "CRITICAL";
// 次要缺陷（界面错误与UI需求不符）
export const MINOR = "MINOR";
// 轻微缺陷（必输项无提示，或者提示不规范）
export const TRIVIAL = "TRIVIAL";
// 正常(默认)
export const NORMAL = "NORMAL";

// 测试套件
export const TEST_SUITE = "TEST_SUITE";
// 测试用例
export const TEST_CASE = "TEST_CASE";
