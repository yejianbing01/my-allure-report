import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { featuresAddStatus as addStatus, featuresSubStatus as subStatus, didTestCase } from "../../redux/actions";
import PageContainer from "../../components/PageContainer";
import Tree from "../../components/Tree";

Features.propTypes = {
  dataList: PropTypes.array,
  totalNumList: PropTypes.array,
  statusList: PropTypes.array,
  actions: PropTypes.object,
  addStatus: PropTypes.func,
  subStatus: PropTypes.func,
  didTestCase: PropTypes.func,
};
/** 分类页面 */
function Features({ dataList, totalNumList, statusList, addStatus, subStatus, didTestCase }) {
  useEffect(() => {
    return () => didTestCase();
  }, []);

  return (
    <PageContainer title="分类">
      <Tree {...{ dataList, totalNumList, statusList, addStatus, subStatus }} />
    </PageContainer>
  );
}

export default connect(
  ({ testTreeReducer: { sortTestItemList, featuresTotalNumList }, testStatusReducer: { statusList } }) => ({
    dataList: sortTestItemList,
    totalNumList: featuresTotalNumList,
    statusList,
  }),
  (dispatch) => bindActionCreators({ addStatus, subStatus, didTestCase }, dispatch)
)(Features);
