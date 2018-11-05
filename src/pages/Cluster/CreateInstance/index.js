import React, { PureComponent, Fragment } from 'react';
import { Card, Steps } from 'antd';
import styles from './style-index.less';

const { Step } = Steps;

export default class CreateInstance extends PureComponent {
  getCurrentStep() {
    const { location } = this.props;
    const { pathname } = location;
    const pathList = pathname.split('/');
    switch (pathList[pathList.length - 1]) {
      case 'model-cfg':
        return 0;
      case 'parall-cfg':
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
                <Step title="Instance Config" />
                <Step title="Parallel Config" />
                <Step title="Complete" />
            </Steps>
            {children}
            </Fragment>
        </Card>
    );
  }
}
