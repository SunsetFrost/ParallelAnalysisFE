import React, { PureComponent, Fragment } from 'react';
import { Card, Steps } from 'antd';
import styles from './index.less';

const { Step } = Steps;

class CreateNet extends PureComponent {
  getCurrentStep() {
    const {
      location: { pathname },
    } = this.props;
    const pathList = pathname.split('/');
    switch (pathList[pathList.length - 1]) {
      case 'net-cfg':
        return 0;
      case 'switch-cfg':
        return 1;
      case 'result':
        return 2;
      default:
        return 0;
    }
  }

  render() {
    const { location, children } = this.props;
    return (
      <Card bordered={false}>
        <Fragment>
          <Steps current={this.getCurrentStep()} className={styles.steps}>
            <Step title="专有网络配置" />
            <Step title="服务器配置" />
            <Step title="完成" />
          </Steps>
          {children}
        </Fragment>
      </Card>
    );
  }
}

export default CreateNet;
