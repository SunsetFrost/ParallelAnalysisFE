import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, InputNumber, Button, Alert, Divider, Select, Switch } from 'antd';
import router from 'umi/router';
import { digitUppercase } from '@/utils/utils';
import styles from './style.less';

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@connect(({ creInstance, loading, user }) => ({
  submitting: loading.effects['creInstance/submitInstance'],
  data: creInstance,
  user: user.currentUser,
}))
@Form.create()
export default class Step2 extends React.PureComponent {
  render() {
    const { form, data, user, dispatch, submitting } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onPrev = () => {
      router.push('/cluster/create/model-cfg');
    };
    const onValidateForm = e => {
      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'creInstance/submitInstance',
            payload: {
              ...data,
              ...values,
              createTime: Date.now(),
              user,
            },
          });
        }
      });
    };
    return (
      <Fragment>
        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
          <Form.Item {...formItemLayout} label="Parallel Mode">
            {getFieldDecorator('mode', {
              initialValue: data.mode,
              rules: [{ required: true, message: 'please select parallel mode' }],
            })(
              <Select defaultValue="single">
                <Option value="single">Single</Option>
                <Option value="standalone">Standalone</Option>
                <Option value="mesos">Mesos</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="CPU">
            <Input.Group compact>
              <Select defaultValue="fix" style={{ width: 100 }}>
                <Option value="fix">Fix</Option>
                <Option value="min">Min</Option>
                <Option value="min">Max</Option>
              </Select>
              {getFieldDecorator('cpu', {
                initialValue: data.cpu,
                rules: [{ required: true, message: 'please input cpu num' }],
              })(<InputNumber style={{ width: 'calc(100% - 100px)' }} placeholder="cpu num" />)}
            </Input.Group>
          </Form.Item>
          <Form.Item {...formItemLayout} label="Memory">
            <Input.Group compact>
              <Select defaultValue="fix" style={{ width: 100 }}>
                <Option value="fix">Fix</Option>
                <Option value="min">Min</Option>
                <Option value="min">Max</Option>
              </Select>
              {getFieldDecorator('memory', {
                initialValue: data.mem,
                rules: [{ required: true, message: 'please input memory num' }],
              })(<InputNumber style={{ width: 'calc(100% - 100px)' }} placeholder="memory num" />)}
            </Input.Group>
          </Form.Item>
          <Form.Item {...formItemLayout} label="Advance">
            <Switch />
          </Form.Item>
          <Alert
            closable
            showIcon
            message="Advance Config not support yet"
            style={{ marginBottom: 24 }}
          />

          <Form.Item
            style={{ marginBottom: 8 }}
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: {
                span: formItemLayout.wrapperCol.span,
                offset: formItemLayout.labelCol.span,
              },
            }}
            label=""
          >
            <Button onClick={onPrev}>
              Prev
            </Button>
            <Button type="primary" style={{ marginLeft: 20 }} onClick={onValidateForm} loading={submitting}>
              Submit
            </Button>
          </Form.Item>
        </Form>
        <Divider style={{ margin: '40px 0 24px' }} />
        <div className={styles.desc}>
          <h3>Instruction</h3>
          <h4>Parallel Mode</h4>
          <p>
            This is the detail explain of create function, This is the detail explain of create
            function, This is the detail explain of create function.
          </p>
          <h4>Advance Config</h4>
          <p>
            This is the detail explain of create function, This is the detail explain of create
            function, This is the detail explain of create function.
          </p>
        </div>
      </Fragment>
    );
  }
}
