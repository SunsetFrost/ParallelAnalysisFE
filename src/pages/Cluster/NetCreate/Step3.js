import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Row, Col } from 'antd';
import router from 'umi/router';
import Result from '@/components/Result';
import styles from './style.less';

@connect(({ net }) => ({
  data: net.create.form,
}))
class NetStep3 extends PureComponent {
  render() {
    const { data, dispatch } = this.props;

    const onFinish = () => {
      dispatch({
        type: 'net/clearCreate',
      });
      router.push('/cluster/net-create/net-cfg');
    };

    const onBack = () => {
      dispatch({
        type: 'net/clearCreate',
      });
      router.push('/cluster/net');
    };

    const information = (
      <div className={styles.information}>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            您的秘钥:
          </Col>
          <Col xs={24} sm={16}>
            {data._id}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            网络名称:
          </Col>
          <Col xs={24} sm={16}>
            {data.name}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            网络类型:
          </Col>
          <Col xs={24} sm={16}>
            {data.type}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            网段范围:
          </Col>
          <Col xs={24} sm={16}>
            {data.ip}
          </Col>
        </Row>
      </div>
    );

    const actions = (
      <Fragment>
        <Button type="primary" onClick={onFinish}>
          再次创建
        </Button>
        <Button onClick={onBack}>返回</Button>
      </Fragment>
    );

    return (
      <Result
        type="success"
        title="创建成功"
        description="当前网络属于未认证状态，请您凭秘钥在您的本地一键安装并行服务器，服务器将自动认证"
        extra={information}
        actions={actions}
        className={styles.result}
      />
    );
  }
}

export default NetStep3;
