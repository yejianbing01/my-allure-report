import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import * as ECharts from "echarts";
import "./style.css";

Chart.propTypes = {
  renderer: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  notMerge: PropTypes.bool,
  lazyUpdate: PropTypes.bool,
  option: PropTypes.object,
};

/** ECharts图表 */
export default function Chart({
  renderer = "svg", // svg || canvas
  width = "auto",
  height = "auto",
  notMerge = false,
  lazyUpdate = false,
  option,
}) {
  const EChartRef = useRef();

  useEffect(() => {
    // 初始化图表
    const chart = ECharts.init(EChartRef.current, null, {
      renderer,
      width,
      height,
    });
    // 将传入的配置(包含数据)注入
    chart && chart.setOption(option, notMerge, lazyUpdate);
    // 监听屏幕缩放，重新绘制 echart 图表
    chart && window.addEventListener("resize", chart.resize());
    // 组件卸载前卸载图表
    return () => {
      chart && chart.dispose();
    };
  });

  return <div className="summary-EChart" ref={EChartRef}></div>;
}
