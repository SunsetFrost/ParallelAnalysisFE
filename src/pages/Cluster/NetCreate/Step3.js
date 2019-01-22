import React, { Fragment, PureComponent } from 'react';
import { Button, Row, Col } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import Result from '@/components/Result';
import styles from './style.less';

@connect(({ net }) => ({
  create: net.create,
}))
class NetStep3 extends PureComponent {
  render() {
    const {
      create: { value, type: create_type },
      dispatch,
    } = this.props;

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

    const information_net = (
      <div className={styles.information}>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            您的秘钥:
          </Col>
          <Col xs={24} sm={16}>
            {value._id}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            网络名称:
          </Col>
          <Col xs={24} sm={16}>
            {value.name}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            网络类型:
          </Col>
          <Col xs={24} sm={16}>
            {value.type}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            网段范围:
          </Col>
          <Col xs={24} sm={16}>
            {value.ip}
          </Col>
        </Row>
      </div>
    );

    const information_pc = (
      <div className={styles.information}>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            您的秘钥:
          </Col>
          <Col xs={24} sm={16}>
            {value._id}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            主机名称:
          </Col>
          <Col xs={24} sm={16}>
            {value.hostname}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            处理器:
          </Col>
          <Col xs={24} sm={16}>
            {value.cpu}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            内存:
          </Col>
          <Col xs={24} sm={16}>
            {value.mem}
          </Col>
        </Row>
        {/* <Row>
          <Col xs={24} sm={8} className={styles.label}>
            所属网络:
          </Col>
          <Col xs={24} sm={16}>
            {value._id}
          </Col>
        </Row> */}
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
        title={create_type === 'join' ? '加入成功' : '创建成功'}
        description={
          create_type === 'join'
            ? '当前主机属于未认证状态，请您凭秘钥在您的本地一键安装并行服务器，服务器将自动认证'
            : '当前网络属于未认证状态，请您凭秘钥在您的本地一键安装并行服务器，服务器将自动认证'
        }
        extra={create_type === 'create' ? information_net : information_pc}
        actions={actions}
        className={styles.result}
      />
    );
  }
}

export default NetStep3;
