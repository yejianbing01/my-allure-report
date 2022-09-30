import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TestResult from "./TestResult";
import { didTestCase } from "../../redux/actions";
import "./style.css";

PageContainer.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element,
  testCaseId: PropTypes.string,
  didTestCase: PropTypes.func,
};

/** 页面容器 */
function PageContainer({ title, children, testCaseId, didTestCase }) {
  useEffect(() => {
    const dom = gutterRef.current;
    const parent = gutterRef.current.parentElement;
    const handleMouseMove = (e) => {
      const pageWidth = window.width || document.documentElement.clientWidth || document.body.offsetWidth;
      const parentLeft = gutterRef.current.parentElement.offsetLeft;
      const currentLeft = gutterRef.current.offsetLeft;
      const currentWidth = gutterRef.current.offsetWidth;

      const flex = (e.pageX - parentLeft) / (pageWidth - currentLeft - currentWidth);
      parent.firstChild.style.flex = flex.toFixed(2) * 2;
    };
    const handleMousedown = () => {
      dom.classList.add("gutter-resize");
      parent.classList.add("gutter-resize");
      document.addEventListener("mousemove", handleMouseMove);
    };
    const handleMouseup = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      dom.classList.remove("gutter-resize");
      parent.classList.remove("gutter-resize");
    };

    document.addEventListener("mouseup", handleMouseup);
    dom.addEventListener("mousedown", handleMousedown);

    return () => {
      document.removeEventListener("mouseup", handleMouseup);
      dom.removeEventListener("mousedown", handleMousedown);
    };
  }, []);

  const gutterRef = useRef();

  return (
    <div className="page-container">
      <div className="side-left">
        <div className="header">
          <h2>{title}</h2>
        </div>
        <div className="content">{children}</div>
      </div>
      <div className="gutter" ref={gutterRef}></div>
      <div className="side-right" style={{ height: testCaseId ? "100vh" : 0 }}>
        <TestResult />
        <div className="close-btn" onClick={didTestCase}>
          关闭
        </div>
      </div>
      {/* {testCaseId ? (
        <div className="side-right">
          <TestResult />
          <div className="close-btn" onClick={didTestCase}>
            关闭
          </div>
        </div>
      ) : (
        ""
      )} */}
    </div>
  );
}

export default connect(
  ({ testCaseReducer: { id } }) => ({
    testCaseId: id,
  }),
  {
    didTestCase,
  }
)(PageContainer);
