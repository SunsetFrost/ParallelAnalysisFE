import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Button, Row, Col } from 'antd';
import router from 'umi/router';
import Result from '@/components/Result';
import styles from './style.less';

@connect(({ creInstance }) => ({
  data: creInstance,
}))
export default class Step3 extends React.PureComponent {
  render() {
    const { data, dispatch } = this.props;
    const onFinish = () => {
      dispatch({
        type: 'creInstance/clearInstance',
      });
      router.push('/cluster/create/model-cfg');
    };
    const onBack = () => {
      dispatch({
        type: 'creInstance/clearInstance',
      });
      router.push('/cluster/instance');
    }
    const information = (
      <div className={styles.information}>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            Name:
          </Col>
          <Col xs={24} sm={16}>
            {data.name}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            User:
          </Col>
          <Col xs={24} sm={16}>
            {data.user.name}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            Model:
          </Col>
          <Col xs={24} sm={16}>
            {data.model}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            ParallelMode:
          </Col>
          <Col xs={24} sm={16}>
            {data.mode}
          </Col>
        </Row>
      </div>
    );
    const actions = (
      <Fragment>
        <Button type="primary" onClick={onFinish}>
          Create Another
        </Button>
        <Button onClick={onBack}>Back To Instance</Button>
      </Fragment>
    );
    return (
      <Result
        type="success"
        title="Create Success"
        description="The instance is being calculated in parallel"
        extra={information}
        actions={actions}
        className={styles.result}
      />
    );
  }
}
