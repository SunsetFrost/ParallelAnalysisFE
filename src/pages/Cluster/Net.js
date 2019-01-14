import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Card,
  Row,
  Col,
  Radio,
  Input,
  Avatar,
  Badge,
  Collapse,
} from 'antd';
import moment from 'moment';

import styles from './Net.less';

const Panel = Collapse.Panel;
const customPanelStyle = {
    background: '#f7f7f7',
    borderRadius: 4,
    marginBottom: 24,
    border: 0,
    overflow: 'hidden',
};

@connect(({ net, loading }) => ({
    net,
    loading: loading.effects['net/fetchNets'],
}))
class Net extends PureComponent {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'net/fetchNets',
        });
    }

    const Info = ({ title, value, bordered }) => (
        <div className={styles.headerInfo}>
          <span>{title}</span>
          <p>{value}</p>
          {bordered && <em />}
        </div>
      );
  
    const extraContent = (
        <div className={styles.extraContent}>
          <RadioGroup defaultValue="all" onChange={this.radioOnChange}>
            <RadioButton value="all">All</RadioButton>
            <RadioButton value="election">Election</RadioButton>
            <RadioButton value="master">Master</RadioButton>
            <RadioButton value="agent">Agent</RadioButton>
          </RadioGroup>
          <Search
            className={styles.extraContentSearch}
            placeholder="Server name or Ip"
            onSearch={() => ({})}
          />
        </div>
    );

    render() {
        const {
            net: { list },
            loading,
        } = this.props;

        return (
            <div>
              <Card bordered={false}>
                <Row>
                    <Col sm={8} xs={24}>
                    <Info title="公有云" value="1 Server" bordered />
                    </Col>
                    <Col sm={8} xs={24}>
                    <Info title="私有云" value="1 Server" bordered />
                    </Col>
                    <Col sm={8} xs={24}>
                    <Info title="混合云" value='4 Server' />
                    </Col>
                </Row>
              </Card>
              <Card>
                <Collapse>
                <Panel>
                    <p>test</p>
                </Panel>
                </Collapse>
              </Card>
            </div>

        )
    }
}

export default Net;