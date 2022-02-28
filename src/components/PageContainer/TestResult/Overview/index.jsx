import React from "react";
import PropTypes from "prop-types";
import FailedInfo from "../FailedInfo";
import Collapse from "../../../../components/Collapse";
import { FAILURE } from "../../../../../config";
import { durationToString } from "../../../../utils/utils";
import "./style.css";

Overview.propTypes = {
  // 状态
  status: PropTypes.string,
  // 类别
  product: PropTypes.string,
  // 优先级
  level: PropTypes.string,
  // 耗时
  duration: PropTypes.number,
  // 接口请求步骤
  testStepList: PropTypes.array,
  // 接口请求步骤
  testResult: PropTypes.object,
};

/** 断言失败信息 */
export default function Overview(props) {
  const { status, product, duration, level, testStepList, testResult } = props;
  return (
    <div className="overview">
      {status === FAILURE ? <FailedInfo message={testResult.data.error} trace={testResult.data.error} /> : ""}
      <div className="overview-tags">
        {status === FAILURE ? (
          <div className="pane_section">
            {/* <p>类别: {product}</p> */}
            <p>错误类别: {level}</p>
          </div>
        ) : (
          ""
        )}
        <div className="pane_section">
          {/* <p>优先级: {level}</p> */}
          {product ? <p>优先级: {product}</p> : ""}
        </div>
        <div className="pane_section">
          <p>耗时: {durationToString(duration)}</p>
        </div>
      </div>
      <div className="overview-execution">
        <h3 className="overview-execution_title">执行</h3>
        <div className="overview-execution_content">
          {testStepList.length ? (
            <Collapse title="测试步骤">
              {testStepList.map((testStep, index) => (
                <Collapse key={index} title={testStep.name} duration={testStep.duration}>
                  {JSON.stringify(testStep.content)
                    .split("%n")
                    .map((ele, index) => {
                      return <p key={index}>{ele}</p>;
                    })}
                </Collapse>
              ))}
            </Collapse>
          ) : (
            <div>没有测试步骤</div>
          )}
        </div>
      </div>
    </div>
  );
}
