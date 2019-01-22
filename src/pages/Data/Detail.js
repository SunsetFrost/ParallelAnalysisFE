import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Button, Icon, Card, Table, Tooltip, Divider } from 'antd';
import moment from 'moment';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import DescriptionList from '@/components/DescriptionList';
import styles from './Detail.less';
import router from 'umi/router';

const ButtonGroup = Button.Group;
const Description = DescriptionList.Description;

const headerContent = detail => (
  <div>
    <DescriptionList className={styles.headerList} size="small" col="2">
      <Description term="Model">IBIS</Description>
      <Description term="Type">{detail.io}</Description>
      <Description term="Latitude Range">{`${detail.meta.spatial.lat.start}°, ${
        detail.meta.spatial.lat.end
      }°`}</Description>
      <Description term="Latitude Resolution">{`${
        detail.meta.spatial.lat.resolution
      }°`}</Description>
      <Description term="Longitude Range">{`${detail.meta.spatial.lon.start}°, ${
        detail.meta.spatial.lon.end
      }°`}</Description>
      <Description term="Longtitude Resolution">{`${
        detail.meta.spatial.lon.resolution
      }°`}</Description>
      <Description term="Start Time">{moment('1980-01-01').format('YYYY-MM-DD')}</Description>
      <Description term="End Time">{moment('2000-01-01').format('YYYY-MM-DD')}</Description>
    </DescriptionList>
    <DescriptionList className={styles.headerList} size="small" col="1">
      <Description term="Description" style={{ marginTop: '12px' }}>
        {detail.desc}
      </Description>
    </DescriptionList>
  </div>
);

@connect(({ modeldata }) => ({
  modeldata,
}))
export default class DataDetail extends PureComponent {
  onDownloadFile(id) {
    // const url = 'http://127.0.0.1:9315/data/download?msrId=test&eventId=test';
    // let aElem = document.createElement('a');
    // aElem.href = url;
    // aElem.download = id;
    // let evt = document.createEvent('MouseEvents');
    // evt.initEvent('click', true, true);
    // aElem.dispatchEvent(evt);
  }

  onToInstance() {
    router.push({
      pathname: '/cluster/instance-detail',
      query: {
        id: '5be5a44ebeacec46c0cf5099',
      },
    });
  }

  detail2sites(detail) {
    return detail.content.sites.map(item => {
      return {
        id: item.name,
        type: 'TXT',
        lat: `${item.lat}°`,
        lon: `${item.lon}°`,
        path: item.path,
      };
    });
  }

  render() {
    const {
      data: { detail, list },
    } = this.props;
    const newDetail = list.filter(item => {
      if (item._id == detail.id) {
        return true;
      } else {
        return false;
      }
    })[0];
    const sites = this.detail2sites(newDetail);

    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'FileType',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: 'Laititude',
        dataIndex: 'lat',
        key: 'lat',
      },
      {
        title: 'Longitude',
        dataIndex: 'lon',
        key: 'lon',
      },
      {
        title: 'Action',
        dataIndex: 'path',
        render: path => (
          <Fragment>
            <Tooltip title="download">
              <Button
                icon="cloud-download"
                onClick={() => {
                  this.onDownloadFile(path);
                }}
              />
            </Tooltip>
            <Divider type="vertical" />
            <Tooltip title="visualization">
              <Button icon="line-chart" />
            </Tooltip>
          </Fragment>
        ),
      },
    ];

    const action = (
      <Fragment>
        <Button onClick={() => this.onToInstance()}>Belong Instance</Button>
        <Button type="primary">Download DataSet</Button>
      </Fragment>
    );

    return !newDetail ? (
      <div>No data</div>
    ) : (
      <PageHeaderWrapper
        title={newDetail.name}
        logo={
          <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />
        }
        content={headerContent(newDetail)}
        action={action}
        hiddenBreadcrumb={true}
      >
        <Card title="Sites">
          <Table pagination={false} dataSource={sites} columns={columns} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}
