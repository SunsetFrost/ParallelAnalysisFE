import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import {
  List,
  Card,
  Row,
  Col,
  Radio,
  Input,
  Progress,
  Button,
  Icon,
  Dropdown,
  Menu,
  Avatar,
  Badge,
  Form,
  Select,
} from 'antd';

import TagSelect from '@/components/TagSelect';
import StandardFormRow from '@/components/StandardFormRow';

import styles from './List.less';
import router from 'umi/router';
import Link from 'umi/link'

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;
const FormItem = Form.Item;

@Form.create()
@connect(({ data, loading }) => ({
  data,
  loading: loading.effects['data/fetchData'],
}))
export default class DataList extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'data/fetchData',
    });
  }

  onToDetail = (id) => {
    router.push({
      pathname: '/data/detail',
      query: {
        id: id,
      }
    })
  }

  render() {
    const { data: { list }, loading, form } = this.props;
    const { getFieldDecorator } = form;

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    const extraContent = (
      <div className={styles.extraContent}>
        <Search
          className={styles.extraContentSearch}
          placeholder="Data name"
          onSearch={() => ({})}
        />
      </div>
    );

    const ListContent = ({ data: {meta: { temporal, spatial }} }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>Temporal Resolution</span>
          <p>{`${temporal.value} ${temporal.unit}`}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>Spatial Resolution</span>
          <p>{`${spatial.lat.resolution}*${spatial.lon.resolution}`}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>Begin Date</span>
          <p>{moment((temporal.start == '')?'1980-01-01':temporal.start).format('YYYY-MM-DD')}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>End Date</span>
          <p>{moment((temporal.end == '')?'2000-01-01':temporal.end).format('YYYY-MM-DD')}</p>
        </div>
        {/* <div className={styles.listContentItem}>
          <Button type="primary">Download</Button>
        </div> */}
      </div>
    );

    return (
      <div>
        <div className={styles.filterCardList}>
          <Card bordered={false}>
            <Form layout="inline">
              <StandardFormRow title="Model" block style={{ paddingBottom: 11 }}>
                <FormItem>
                  {getFieldDecorator('category')(
                    <TagSelect onChange={this.handleFormSubmit}>
                      <TagSelect.Option value="cat1">IBIS</TagSelect.Option>
                      <TagSelect.Option value="cat2">LPJ</TagSelect.Option>
                      <TagSelect.Option value="cat3">BIOME-BGC</TagSelect.Option>
                    </TagSelect>
                  )}
                </FormItem>
              </StandardFormRow>
              <StandardFormRow title="Option" grid last>
                <Row gutter={16}>
                  <Col lg={8} md={10} sm={10} xs={24}>
                      <FormItem {...formItemLayout} label="Sort">
                        {getFieldDecorator('sort', {})(
                          <Select
                            onChange={this.handleFormSubmit}
                            placeholder="All"
                            style={{ maxWidth: 200, width: '100%' }}
                          >
                            <Option value="cdate">Create Date</Option>
                            <Option value="name">Name</Option>
                          </Select>
                        )}
                      </FormItem>
                  </Col>
                  <Col lg={8} md={10} sm={10} xs={24}>
                    <FormItem {...formItemLayout} label="Type">
                      {getFieldDecorator('type', {})(
                        <Select
                          onChange={this.handleFormSubmit}
                          placeholder="All"
                          style={{ maxWidth: 200, width: '100%' }}
                        >
                          <Option value="input">Input</Option>
                          <Option value="output">Output</Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col lg={8} md={10} sm={10} xs={24}>
                    <FormItem {...formItemLayout} label="Resolution">
                      {getFieldDecorator('resolution', {})(
                        <Select
                          onChange={this.handleFormSubmit}
                          placeholder="All"
                          style={{ maxWidth: 200, width: '100%' }}
                        >
                          <Option value="hour">Hour</Option>
                          <Option value="day">Day</Option>
                          <Option value="month">Month</Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                </Row>
              </StandardFormRow>
            </Form>
          </Card>
        </div>
        <div className={styles.standardList}>
          <Card
            className={styles.listCard}
            bordered={false}
            title="Data"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >
            <List
              size="large"
              rowKey="id"
              loading={loading}
              dataSource={list}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png'}
                        shape="square"
                        size="large"
                      />
                    }
                    title={<Link to={`/data/detail?id=${item._id}`}>{item.name}</Link>}
                    description={(item.desc.length > 70)? `${item.desc.slice(0, 70)}...`:item.desc}
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </div>
    );
  }
}