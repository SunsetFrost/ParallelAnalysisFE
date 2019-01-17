import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Select, Divider, DatePicker } from 'antd';
import router from 'umi/router';
import moment from 'moment';
import styles from './style.less';

const { Option } = Select;
const { RangePicker } = DatePicker;
const InputGroup = Input.Group;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@connect(({ creInstance }) => ({
  data: creInstance,
}))
@Form.create()
class Step1 extends React.PureComponent {
  render() {
    const { form, dispatch, data } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onValidateForm = () => {
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'creInstance/saveInstance',
            payload: values,
          });
          router.push('/cluster/create/parall-cfg');
        }
      });
    };

    return (
      <Fragment>
        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
          <Form.Item {...formItemLayout} label="Name">
            {getFieldDecorator('name', {
              initialValue: data.name,
              rules: [{ required: true, message: 'please input instance name' }],
            })(<Input placeholder="input instance name" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Model">
            {getFieldDecorator('model', {
              initialValue: data.model,
              rules: [{ required: true, message: 'please select model' }],
            })(
              <Select defaultValue="ibis">
                <Option value="ibis">IBIS</Option>
                <Option value="biome">Biome-BGC</Option>
                <Option value="lpj">LPJ</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Time">
            {getFieldDecorator('time', {
              initialValue: [
                moment(data.time[0], 'YYYY/MM/DD'),
                moment(data.time[1], 'YYYY/MM/DD'),
              ],
              rules: [{ required: true, message: 'please select time range' }],
            })(<RangePicker placeholder={['start date', 'end date']} style={{ width: '100%' }} />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Site">
            <InputGroup>
              {getFieldDecorator('siteStart', {
                initialValue: data.siteStart,
              })(<Input style={{ width: '50%' }} placeholder="input start site" />)}
              {getFieldDecorator('siteEnd', {
                initialValue: data.siteEnd,
              })(<Input style={{ width: '50%' }} placeholder="input end site" />)}
            </InputGroup>
          </Form.Item>
          <Form.Item {...formItemLayout} label="DataSet">
            {getFieldDecorator('dataset')(
              <Select defaultValue="Default" placeholder="choose dataset">
                <Option value="default">default</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="ParamsSet">
            {getFieldDecorator('paramsset')(
              <Select defaultValue="Default" placeholder="choose params set">
                <Option value="default">default</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: {
                span: formItemLayout.wrapperCol.span,
                offset: formItemLayout.labelCol.span,
              },
            }}
            label=""
          >
            <Button type="primary" onClick={onValidateForm}>
              Next
            </Button>
          </Form.Item>
        </Form>
        <Divider style={{ margin: '40px 0 24px' }} />
        <div className={styles.desc}>
          <h3>Instruction</h3>
          <h4>Choose Model</h4>
          <p>
            This is the detail explain of create function, This is the detail explain of create
            function, This is the detail explain of create function.
          </p>
          <h4>Choose calculate range</h4>
          <p>
            This is the detail explain of create function, This is the detail explain of create
            function, This is the detail explain of create function.
          </p>
        </div>
      </Fragment>
    );
  }
}

export default Step1;
