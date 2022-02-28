import React from "react";
import PropTypes from "prop-types";
import Chart from "../../../../components/Chart";
import "./style.css";

Summary.propTypes = {
  title: PropTypes.string,
  time: PropTypes.string,
  totalTestCaseNum: PropTypes.number,
  totalNumList: PropTypes.array,
};
/** 汇总信息 */
export default function Summary(props) {
  const { title, time, totalTestCaseNum, totalNumList } = props;

  const option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      bottom: "1%",
      left: "center",
    },
    color: ["#97cc64", "#fd5a3e", "#aaa"],
    backgroundColor: "transparent",
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
          fontSize: "18",
          fontWeight: "bold",
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "22",
            fontWeight: "bold",
            backgroundColor: "#fff",
          },
        },
        labelLine: {
          show: false,
        },
        data: totalNumList.map((data) => {
          return { value: data.value, name: data.percent };
        }),
      },
    ],
  };

  return (
    <div className="summary-box">
      <div className="summary-stats">
        <div className="summary-stats_title">
          <h2>{title}</h2>
          <p>{time}</p>
        </div>
        <div className="summary-stats_total">
          <p>{totalTestCaseNum}</p>
          <p>测试用例</p>
        </div>
      </div>
      <div className="summary-graph">
        <Chart option={option} />
      </div>
    </div>
  );
}
