import { FC } from "react";
import { Button, Col, Form, Input, Row } from "antd";
import styles from "./loginForm.module.css";

interface MobileFormProp {
  onSubmit: (values: any) => void
}

const TokenForm: FC<MobileFormProp> = ({onSubmit}) => {
  return (
    <Form<any>
      className="tw-text-center"
      onFinish={onSubmit}
    >
      <div className="tw-mb-6">
        لطفا کد ارسالی را وارد نمایید
      </div>
      <Form.Item name="token" className="tw-mb-12">
        <Input className={styles.mobileInput} />
      </Form.Item>

      <Row gutter={15}>
        <Col span={12}>
          <Button htmlType="submit" type="primary" className="tw-rounded-full tw-bg-blue-500 tw-ml-5" block>ارسال کد</Button>
        </Col>
        <Col span={12}>
          <Button className="tw-rounded-full" block>بازگشت به آغازه</Button>
        </Col>
      </Row>
    </Form>
  )
};

export default TokenForm;