import React, { useEffect, useRef, useState } from "react";
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
function Chart({
  renderer = "canvas", // svg || canvas
  width = "auto",
  height = "auto",
  notMerge = false,
  lazyUpdate = false,
  option,
}) {
  const EChartRef = useRef();
  const [chart, setChart] = useState(null);

  useEffect(() => {
    // 初始化图表
    const chart = ECharts.init(EChartRef.current, null, {
      renderer,
      width,
      height,
    });
    setChart(chart);
    // 监听屏幕缩放，重新绘制 echart 图表
    window.addEventListener("resize", chart.resize);
    return () => {
      chart.dispose();
      window.removeEventListener("resize", chart.resize);
    };
  }, []);

  useEffect(() => {
    // 将传入的配置(包含数据)注入
    chart && chart.setOption(option, notMerge, lazyUpdate);
  });

  return <div className="summary-EChart" ref={EChartRef}></div>;
}

export default React.memo(Chart);
