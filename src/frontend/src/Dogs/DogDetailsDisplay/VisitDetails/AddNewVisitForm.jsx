// StudentDrawerForm.js

import {
  Drawer,
  Input,
  Col,
  Select,
  Form,
  Row,
  Button,
  Spin,
  DatePicker,
} from "antd";
import { addNewEntry } from "../../../client";
import { LoadingOutlined } from "@ant-design/icons";
import { useState } from "react";
import {
  successNotification,
} from "../../../Notification";
import { isMobile } from "react-device-detect";

const { Option } = Select;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function AddNewVisitForm({ showDrawer, setShowDrawer, petId, fetchPetVisits }) {
  const onCLose = () => setShowDrawer(false);
  const [submitting, setSubmitting] = useState(false);

  const onFinish = (visit) => {
    setSubmitting(true);
    console.log(JSON.stringify(visit, null, 2));
    addNewEntry("visit", visit)
      .then(() => {
        onCLose();
        successNotification(
          "Visit successfully added",
          `${visit.name} was added to the system`
        );
        fetchPetVisits();
      })
      .catch((err) => {
        console.log(err);
        console.log("error addinng new visit");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const onFinishFailed = (errorInfo) => {
    alert(JSON.stringify(errorInfo, null, 2));
  };

  const onChangeDate = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <Drawer
      title="Add new visit"
      width={isMobile ? 300 : 720}
      onClose={onCLose}
      visible={showDrawer}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div
          style={{
            textAlign: "right",
          }}
        >
          <Button onClick={onCLose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
        </div>
      }
    >
      <Form
        layout="vertical"
        onFinishFailed={onFinishFailed}
        onFinish={onFinish}
        hideRequiredMark
        initialValues={(petId = { petId })} // to send the value of the dog id without being an input
      >
        {isMobile ? (
          <>
            {/*Mobile Organization of rows */}
            <Row>
              {/*passing the pet id to be stored in the object*/}
              {/* <Form.Item name="petId">
                <Input hidden="true" name="petId" value={petId} />
              </Form.Item> */}
              <Form.Item
                name="doctor"
                label="Doctor"
                rules={[{ required: true }]}
                className="w-full"
              >
                <Select
                  showSearch
                  placeholder="Select a doctor"
                  optionFilterProp="children"
                >
                  <Option value="rosa">Rosa</Option>
                  <Option value="Maria">Maria</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="date"
                label="Date"
                rules={[{ required: true, message: "Please enter visit date" }]}
                className="w-full"
              >
                <DatePicker onChange={onChangeDate} />
              </Form.Item>
              <Form.Item
                name="visitReason"
                label="Reason for the visit"
                rules={[
                  {
                    required: true,
                    message: "Please enter reason for the visit",
                  },
                ]}
                className="w-full"
              >
                <Input.TextArea placeholder="Please enter reason for the visit" />
              </Form.Item>
              <Form.Item
                name="symptoms"
                label="Symptoms"
                rules={[{ required: true, message: "Please enter symptoms" }]}
                className="w-full"
              >
                <Input.TextArea placeholder="Please enter symptoms" />
              </Form.Item>
              <Form.Item
                name="diagnostic"
                label="Diagnostic"
                rules={[{ required: true, message: "Please enter diagnostic" }]}
                className="w-full"
              >
                <Input.TextArea placeholder="Please enter diagnostic" />
              </Form.Item>
              <Form.Item
                name="clinicTreatment"
                label="On-site Treatment"
                rules={[
                  {
                    required: true,
                    message: "Please enter Onsite Treatment",
                  },
                ]}
                className="w-full"
              >
                <Input.TextArea placeholder="Please enter Onsite Treatment" />
              </Form.Item>
              <Form.Item
                name="atHomeTreatment"
                label="At Home Treatment"
                rules={[{ required: true, message: "At Home Treatment" }]}
                className="w-full"
              >
                <Input.TextArea placeholder="Please enter at home treatment" />
              </Form.Item>
              <Form.Item
                name="vaccines"
                label="Vaccines"
                rules={[
                  { required: true, message: "Please enter pet vaccines" },
                ]}
                className="w-full"
              >
                <Input.TextArea placeholder="Please enter pet vaccines" />
              </Form.Item>
              <Form.Item
                name="notes"
                label="Notes"
                rules={[{ message: "Please enter pet vaccines" }]}
                className="w-full"
              >
                <Input placeholder="Please enter pet vaccines" />
              </Form.Item>
              <Form.Item>
                <Button type="default" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
              <Row>{submitting && <Spin indicator={antIcon} />}</Row>
            </Row>
          </>
        ) : (
          <>
            {/*Desktop Organization of rows */}
            <Row gutter={16}>
              {/*passing the pet id to be stored in the object*/}
              <Form.Item name="petId">
                <Input hidden="true" name="petId" value={petId} />
              </Form.Item>
              <Col span={24}>
                <Form.Item
                  name="doctor"
                  label="Doctor"
                  rules={[{ required: true }]}
                >
                  <Select
                    showSearch
                    placeholder="Select a doctor"
                    optionFilterProp="children"
                  >
                    <Option value="rosa">Rosa</Option>
                    <Option value="Maria">Maria</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="date"
                  label="Date"
                  rules={[
                    { required: true, message: "Please enter visit date" },
                  ]}
                >
                  <DatePicker onChange={onChangeDate} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="visitReason"
                  label="Reason for the visit"
                  rules={[
                    {
                      required: true,
                      message: "Please enter reason for the visit",
                    },
                  ]}
                >
                  <Input placeholder="Please enter reason for the visit" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="symptoms"
                  label="Symptoms"
                  rules={[{ required: true, message: "Please enter symptoms" }]}
                >
                  <Input placeholder="Please enter symptoms" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="diagnostic"
                  label="Diagnostic"
                  rules={[
                    { required: true, message: "Please enter diagnostic" },
                  ]}
                >
                  <Input placeholder="Please enter diagnostic" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="clinicTreatment"
                  label="On-site Treatment"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Onsite Treatment",
                    },
                  ]}
                >
                  <Input placeholder="Please enter Onsite Treatment" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="atHomeTreatment"
                  label="At Home Treatment"
                  rules={[{ required: true, message: "At Home Treatment" }]}
                >
                  <Input placeholder="Please enter at home treatment" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="vaccines"
                  label="Vaccines"
                  rules={[
                    { required: true, message: "Please enter pet vaccines" },
                  ]}
                >
                  <Input placeholder="Please enter pet vaccines" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              name="notes"
              label="Notes"
              rules={[{ message: "Please enter pet vaccines" }]}
            >
              <Input placeholder="Please enter pet vaccines" />
            </Form.Item>
            <Row>
              <Col span={12}>
                <Form.Item>
                  <Button type="default" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Col>
            </Row>
            <Row>{submitting && <Spin indicator={antIcon} />}</Row>
          </>
        )}
      </Form>
    </Drawer>
  );
}

export default AddNewVisitForm;
