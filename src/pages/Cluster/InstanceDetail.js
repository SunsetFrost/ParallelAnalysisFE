import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {
    Button,
    Icon,
    Card,
} from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './InstanceDetail.less';

@connect(({ instance, loading }) => ({
    instance,
    loading: loading.effects['instance/fetchInstanceById'],
}))
export default class InstanceDetail extends PureComponent {
    render() {
        const { instance: { detail, list }, loading } = this.props;
        return (
            <PageHeaderWrapper
              title={detail.id}
              logo={
                <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />
              }
              hiddenBreadcrumb={true}
            >
              <Card title="Server">

              </Card>
              <Card title="Task">

              </Card>
            </PageHeaderWrapper>
        )
    }
}