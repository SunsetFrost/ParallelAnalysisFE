import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import {
  Row,
  Col,
  Icon,
  Card,
  Tabs,
  Table,
  Radio,
  DatePicker,
  Tooltip,
  Menu,
  Dropdown,
} from 'antd';
import {
  ChartCard,
  MiniArea,
  MiniBar,
  MiniProgress,
  Field,
  Bar,
  Pie,
  TimelineChart,
} from '@/components/Charts';
import Trend from '@/components/Trend';
import NumberInfo from '@/components/NumberInfo';
import numeral from 'numeral';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import Yuan from '@/utils/Yuan';
import { getTimeDistance } from '@/utils/utils';
import moment from 'moment';

import styles from './Home.less';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

// const rankingListData = [];
// for (let i = 0; i < 7; i += 1) {
//   rankingListData.push({
//     title: `工专路 ${i} 号店`,
//     total: 323234,
//   });
// }

const mockRightContent1 = [
  {
    title: 'IBIS',
    total: '834', 
  },
  {
    title: 'Biome-BGC',
    total: '421',
  },
  {
    title: 'LPJ',
    total: '127',
  },
  {
    title: 'WordCount',
    total: '12'
  }
];

const mockRightContent2 = [
  {
    title: 'data11071622',
    total: '14', 
  },
  {
    title: 'data11092033',
    total: '12',
  },
  {
    title: 'data11092038',
    total: '9',
  },
  {
    title: 'data11092042',
    total: '4'
  },
  {
    title: 'data11092206',
    total: '3'
  },
  {
    title: 'data11092246',
    total: '1'
  },
  {
    title: 'data11092314',
    total: '1'
  },
];

@connect(({ chart, loading }) => ({
  chart,
  loading: loading.effects['chart/fetch'],
}))
class Home extends Component {
  constructor(props) {
    super(props);
    // this.rankingListData1.push(...mockRightContent1);
    // this.rankingListData2.push(...mockRightContent2);
    // for (let i = 0; i < 7; i += 1) {
    //   this.rankingListData.push({
    //     title: formatMessage({ id: 'app.analysis.test' }, { no: i }),
    //     total: 323234,
    //   });
    // }
  }

  state = {
    salesType: 'all',
    currentTabKey: '',
    rangePickerValue: getTimeDistance('year'),
    loading: true,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'chart/fetch',
      });
      this.timeoutId = setTimeout(() => {
        this.setState({
          loading: false,
        });
      }, 600);
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
    cancelAnimationFrame(this.reqRef);
    clearTimeout(this.timeoutId);
  }

  handleChangeSalesType = e => {
    this.setState({
      salesType: e.target.value,
    });
  };

  handleTabChange = key => {
    this.setState({
      currentTabKey: key,
    });
  };

  handleRangePickerChange = rangePickerValue => {
    const { dispatch } = this.props;
    this.setState({
      rangePickerValue,
    });

    dispatch({
      type: 'chart/fetchSalesData',
    });
  };

  selectDate = type => {
    const { dispatch } = this.props;
    this.setState({
      rangePickerValue: getTimeDistance(type),
    });

    dispatch({
      type: 'chart/fetchSalesData',
    });
  };

  isActive(type) {
    const { rangePickerValue } = this.state;
    const value = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return '';
    }
    if (
      rangePickerValue[0].isSame(value[0], 'day') &&
      rangePickerValue[1].isSame(value[1], 'day')
    ) {
      return styles.currentDate;
    }
    return '';
  }

  render() {
    const { rangePickerValue, salesType, loading: propsLoding, currentTabKey } = this.state;
    const { chart, loading: stateLoading } = this.props;
    const {
      visitData,
      visitData2,
      visitData3, 
      visitData4,
      visitData5,
      salesData,
      salesData2,
      searchData,
      offlineData,
      offlineChartData,
      salesTypeData,
      salesTypeDataOnline,
      salesTypeDataOffline,
    } = chart;
    const loading = propsLoding || stateLoading;
    let salesPieData;
    if (salesType === 'all') {
      salesPieData = salesTypeData;
    } else {
      salesPieData = salesType === 'online' ? salesTypeDataOnline : salesTypeDataOffline;
    }
    const menu = (
      <Menu>
        <Menu.Item>操作一</Menu.Item>
        <Menu.Item>操作二</Menu.Item>
      </Menu>
    );

    const iconGroup = (
      <span className={styles.iconGroup}>
        <Dropdown overlay={menu} placement="bottomRight">
          <Icon type="ellipsis" />
        </Dropdown>
      </span>
    );

    const salesExtra = (
      <div className={styles.salesExtraWrap}>
        {/* <div className={styles.salesExtra}>
          <a className={this.isActive('today')} onClick={() => this.selectDate('today')}>
            <FormattedMessage id="app.analysis.all-day" defaultMessage="All Day" />
          </a>
          <a className={this.isActive('week')} onClick={() => this.selectDate('week')}>
            <FormattedMessage id="app.analysis.all-week" defaultMessage="All Week" />
          </a>
          <a className={this.isActive('month')} onClick={() => this.selectDate('month')}>
            <FormattedMessage id="app.analysis.all-month" defaultMessage="All Month" />
          </a>
          <a className={this.isActive('year')} onClick={() => this.selectDate('year')}>
            <FormattedMessage id="app.analysis.all-year" defaultMessage="All Year" />
          </a>
        </div> */}
        <RangePicker
          defaultValue={[moment('2018/11/01', 'YYYY/MM/DD'), moment('2018/11/15', 'YYYY/MM/DD')]}
          onChange={this.handleRangePickerChange}
          style={{ width: 256 }}
        />
      </div>
    );

    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
      style: { marginBottom: 24 },
    };

    return (
      <GridContent>
        <Row gutter={24}>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="Server"
              action={
                <Tooltip title="Instruct">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={'5 / 5'}
              footer={<Field label="Server Amount" value={numeral(5).format('0,0')} />}
              contentHeight={40}
            >
              <MiniArea color="#ffec3d" data={visitData3} />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
                bordered={false}
                title="CPU"
                action={
                  <Tooltip title="Instruct">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
                total={'1.2GHz/6GHz'}
                footer={<Field label="Cpu Amount" value={numeral(6).format('0,0')} />}
                contentHeight={40}
              >
                <MiniArea color="#bae637" data={visitData4} />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
                bordered={false}
                title="Mem"
                action={
                  <Tooltip title="Instruct">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
                total={'2.5GB/10GB'}
                footer={<Field label="Mem Amount" value={numeral(10).format('0,0')} />}
                contentHeight={40}
              >
                <MiniArea color="#5cdbd3" data={visitData} />
              </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
                bordered={false}
                title="Disk"
                action={
                  <Tooltip title="Instruct">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
                total={'0GB/128.8GB'}
                footer={<Field label="Disk Amount" value={numeral(28.8).format('0,0')} />}
                contentHeight={40}
              >
                <MiniArea color="#975FE4" data={visitData5} />
              </ChartCard>
          </Col>
        </Row>

        <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
          <div className={styles.salesCard}>
            <Tabs tabBarExtraContent={salesExtra} size="large" tabBarStyle={{ marginBottom: 24 }}>
              <TabPane
                tab="Instance"
                key="sales"
              >
                <Row>
                  <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesBar}>
                      <Bar
                        height={295}
                        title="Total Task Statistic"
                        data={salesData}
                      />
                    </div>
                  </Col>
                  <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesRank}>
                      <h4 className={styles.rankingTitle}>
                        Model Ranking
                      </h4>
                      <ul className={styles.rankingList}>
                        {mockRightContent1.map((item, i) => (
                          <li key={item.title}>
                            <span
                              className={`${styles.rankingItemNumber} ${
                                i < 3 ? styles.active : ''
                              }`}
                            >
                              {i + 1}
                            </span>
                            <span className={styles.rankingItemTitle} title={item.title}>
                              {item.title}
                            </span>
                            <span className={styles.rankingItemValue}>
                              {numeral(item.total).format('0,0')}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Col>
                </Row>
              </TabPane>
              <TabPane
                tab="Data"
                key="views"
              >
                <Row>
                  <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesBar}>
                      <Bar
                        height={292}
                        title="Data Download Statistic"
                        data={salesData2}
                      />
                    </div>
                  </Col>
                  <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesRank}>
                      <h4 className={styles.rankingTitle}>
                        {/* <FormattedMessage
                          id="app.analysis.visits-ranking"
                          defaultMessage="Data Ranking"
                        /> */}
                        Download Ranking
                      </h4>
                      <ul className={styles.rankingList}>
                        {mockRightContent2.map((item, i) => (
                          <li key={item.title}>
                            <span
                              className={`${styles.rankingItemNumber} ${
                                i < 3 ? styles.active : ''
                              }`}
                            >
                              {i + 1}
                            </span>
                            <span className={styles.rankingItemTitle} title={item.title}>
                              {item.title}
                            </span>
                            <span>{numeral(item.total).format('0,0')}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </div>
        </Card>
      </GridContent>
    );
  }
}

export default Home;
