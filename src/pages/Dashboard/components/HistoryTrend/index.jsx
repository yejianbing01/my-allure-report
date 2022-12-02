import React from "react";
import PropTypes from "prop-types";
import Chart from "../../../../components/Chart";
import "./style.css";

HistoryTrend.propTypes = {
  historyXAxis: PropTypes.array,
  passNumList: PropTypes.array,
  failedNumList: PropTypes.array,
  skipNumList: PropTypes.array,
};

/** 历史趋势 */
export default function HistoryTrend({ historyXAxis, passNumList, failedNumList, skipNumList }) {
  const option = {
    title: {
      text: "趋势",
      textStyle: {
        fontSize: "21px",
        fontWeight: 200,
      },
    },
    tooltip: {
      trigger: "axis",
      className: "historyToolTip",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    legend: {},
    toolbox: {},
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    color: ["#fd5a3e", "#aaa", "#97cc64"],
    yAxis: {
      type: "value",
      // 轴线
      axisLine: {
        show: true,
        // 没有箭头
        symbol: "none",
      },
      // 坐标轴刻度相关设置。
      axisTick: {
        show: true,
      },
      splitNumber: 10,
      minInterval: 1,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: historyXAxis,
    },
    series: [
      {
        name: "失败",
        type: "line",
        stack: "Total",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: failedNumList,
      },
      {
        name: "跳过",
        type: "line",
        stack: "Total",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: skipNumList,
      },
      {
        name: "成功",
        type: "line",
        stack: "Total",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: passNumList,
      },
    ],
  };

  return (
    <div className="historyTrend-box">
      <Chart option={option} />
    </div>
  );
}
