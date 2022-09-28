import React, { useEffect } from "react";
import { connect } from "react-redux";
import { addStatus, subStatus, didTestCase } from "../../redux/actions";
import PropTypes from "prop-types";
import PageContainer from "../../components/PageContainer";
import Tree from "../../components/Tree";

TestSuite.propTypes = {
  totalNumList: PropTypes.array,
  dataList: PropTypes.array,
  statusList: PropTypes.array,
  addStatus: PropTypes.func,
  subStatus: PropTypes.func,
  didTestCase: PropTypes.func,
};
/** 测试套页面 */
function TestSuite({ totalNumList, dataList, statusList, addStatus, subStatus, didTestCase }) {
  useEffect(() => {
    return () => didTestCase();
  }, []);

  return (
    <PageContainer title="测试套">
      <Tree {...{ totalNumList, dataList, statusList, addStatus, subStatus }} />
    </PageContainer>
  );
}

export default connect(
  ({ testTreeReducer: { totalNumList, dataList, statusList } }) => ({
    totalNumList,
    dataList,
    statusList,
  }),
  { addStatus, subStatus, didTestCase }
)(TestSuite);
