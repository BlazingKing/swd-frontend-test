"use client";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import styles from "./page.module.scss";
import {
  Table,
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  Radio,
  Row,
  Col,
  Checkbox,
} from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addPerson,
  deleteMultiplePersons,
  deletePerson,
  editPerson,
  Person,
  setSelectedIds,
} from "@/store/personSlice";
import moment from "moment";
import { RootState } from "@/store/store";

export default function FormPage() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.person.persons);
  const selectedIds = useSelector(
    (state: RootState) => state.person.selectedIds
  );

  console.log(selectedIds);
  

  const onFinish = (values: Person) => {
    if (values.id) {
      dispatch(
        editPerson({
          ...values,
          fullname: `${values.firstname} ${values.lastname}`,
        })
      );
    } else {
      dispatch(
        addPerson({
          ...values,
          id: uuidv4(),
          fullname: `${values.firstname} ${values.lastname}`,
        })
      );
    }
    form.resetFields();
  };

  const handleEdit = (record: Person) => {
    form.setFieldsValue({
      ...record,
      birthday: record.birthday ? moment(record.birthday) : null,
    });
  };

  const handleDelete = (id: string) => {
    dispatch(deletePerson(id));
  };

  const handleDeleteMultiple = () => {
    dispatch(deleteMultiplePersons(selectedIds));
    dispatch(setSelectedIds([]));
  };

  const rowSelection = {
    selectedRowKeys: selectedIds, // ใช้ค่าจาก Redux แทน
    onChange: (keys: React.Key[]) => {
      dispatch(setSelectedIds(keys as string[]));
    },
  };
  
  

  const columns = [
    { title: t("name"), dataIndex: "fullname", key: "fullname" },
    {
      title: t("gender"),
      dataIndex: "gender",
      key: "gender",
      render: (gender: any) => t(gender.toLowerCase() || ""),
    },
    { title: t("mobile_phone"), dataIndex: "mobile", key: "mobile" },
    {
      title: t("nationality"),
      dataIndex: "nationality",
      key: "nationality",
      render: (nationality: any) =>
        t(`nation_${nationality.toLowerCase() || ""}`),
    },
    {
      title: t("manage"),
      key: "action",
      render: (_: any, record: any) => (
        <>
          <Button type="text" onClick={() => handleEdit(record)}>
            {t("edit")}
          </Button>
          <Button type="text" onClick={() => handleDelete(record.id)} danger>
            {t("delete")}
          </Button>
        </>
      ),
    },
  ];
  return (
    <main className={styles.page}>
      <div className={styles.titleLayout}>
        <h2 className={styles.title}>{t("title2")}</h2>
      </div>
      <section className={styles.section}>
        <Form
          form={form}
          onFinish={onFinish}
          layout="horizontal"
          className={styles.form}
        >
          {/* Personal */}
          <section className={styles.formSection}>
            <Form.Item
              name="titlename"
              label={t("title_name")}
              rules={[{ required: true }]}
            >
              <Select
                placeholder={t("title_name")}
                style={{ width: "400px" }}
                options={[
                  { value: "mr", label: t("mr") },
                  { value: "mrs", label: t("mrs") },
                  { value: "ms", label: t("ms") },
                ]}
              />
            </Form.Item>
            <Form.Item
              name="firstname"
              label={t("first_name")}
              rules={[{ required: true }]}
            >
              <Input placeholder={t("first_name")} style={{ width: "400px" }} />
            </Form.Item>
            <Form.Item
              name="lastname"
              label={t("last_name")}
              rules={[{ required: true }]}
            >
              <Input placeholder={t("last_name")} style={{ width: "400px" }} />
            </Form.Item>
          </section>
          {/* BirthDay and National */}
          <section className={styles.formSectionBN}>
            <Form.Item
              name="birthday"
              label={t("birthday")}
              rules={[{ required: true }]}
            >
              <DatePicker
                format="YYYY-MM-DD"
                disabledDate={(current) =>
                  current && current > moment().endOf("day")
                }
                style={{ width: "400px" }}
              />
            </Form.Item>
            <Form.Item
              name="nationality"
              label={t("nationality")}
              rules={[{ required: true }]}
            >
              <Select
                style={{ width: "400px" }}
                placeholder={t("nationality")}
                options={[
                  { value: "Thai", label: t("nation_thai") },
                  { value: "English", label: t("nation_english") },
                  { value: "Japanese", label: t("nation_japanese") },
                  { value: "Chinese", label: t("nation_chinese") },
                  { value: "French", label: t("nation_french") },
                ]}
              />
            </Form.Item>
          </section>
          {/* Citizen ID */}
          <section className={styles.formSection}>
            <Form.Item label={t("citizen_id")}>
              <Row gutter={8} align="middle">
                {[1, 4, 5, 2, 1].map((size, index) => (
                  <React.Fragment key={index}>
                    <Col span={size}>
                      <Form.Item name={`citizenIdPart${index}`} noStyle>
                        <Input maxLength={size} />
                      </Form.Item>
                    </Col>
                    {index < 4 && (
                      <Col>
                        <span>-</span>
                      </Col>
                    )}
                  </React.Fragment>
                ))}
              </Row>
            </Form.Item>
          </section>
          {/* Gender */}
          <section className={styles.formSection}>
            <Form.Item
              name="gender"
              label={t("gender")}
              rules={[{ required: true }]}
            >
              <Radio.Group>
                <Radio value="Male">{t("male")}</Radio>
                <Radio value="Female">{t("female")}</Radio>
                <Radio value="Unsex">{t("unsex")}</Radio>
              </Radio.Group>
            </Form.Item>
          </section>
          {/* Mobile Phone */}
          <section className={styles.formSectionMP}>
            <Form.Item label={t("mobile_phone")} required>
              <Row gutter={8} align="middle">
                <Col span={8}>
                  <Form.Item
                    name="mobilePrefix"
                    noStyle
                    rules={[{ required: true }]}
                  >
                    <Select
                      style={{ maxWidth: "100px" }}
                      placeholder={t("mobile_phone")}
                      options={[
                        { value: "66", label: "🇹🇭 +66" },
                        { value: "1", label: "🇺🇸 +1" },
                        { value: "81", label: "🇯🇵 +81" },
                        { value: "82", label: "🇨🇳 +86" },
                        { value: "33", label: "🇫🇷 +33" },
                      ]}
                    />
                  </Form.Item>
                </Col>
                <Col>
                  <span>-</span>
                </Col>
                <Col span={14}>
                  <Form.Item name="mobile" noStyle rules={[{ required: true }]}>
                    <Input placeholder={t("mobile_phone")} />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
          </section>
          {/* Passport Number */}
          <search className={styles.formSection}>
            <Form.Item name="passportno" label={t("passport_no")}>
              <Input
                placeholder={t("passport_no")}
                style={{ width: "400px" }}
              />
            </Form.Item>
          </search>
          {/* Expected Salary */}
          <section className={styles.formSection}>
            <Form.Item
              name="expectedsalary"
              label={t("expected_salary")}
              rules={[{ required: true }]}
            >
              <Input
                type="number"
                placeholder={t("expected_salary")}
                style={{ width: "400px" }}
              />
            </Form.Item>
          </section>

          <section className={styles.formSectionBtn}>
            <Button type="default" htmlType="reset">
              {t("reset")}
            </Button>
            <Button type="primary" htmlType="submit">
              {t("submit")}
            </Button>
          </section>
        </Form>
      </section>
      <section className={styles.sectiontable}>
        <div className={styles.sectiondelect}>
          <Checkbox
            indeterminate={
              selectedIds.length > 0 && selectedIds.length < users.length
            }
            onChange={(e) => {
              if (e.target.checked) {
                dispatch(setSelectedIds(users.map((user) => user.id)));
              } else {
                dispatch(setSelectedIds([]));
              }
            }}
            checked={
              selectedIds.length > 0 && selectedIds.length === users.length
            }
          >
            {t("select_all")}
          </Checkbox>
          <Button
            onClick={handleDeleteMultiple}
            disabled={selectedIds.length === 0}
            className={styles.btndeletmulti}
          >
            {t("delete")}
          </Button>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={users}
          rowKey="id"
          pagination={{
            pageSize: 5,
            showSizeChanger: false,
            showPrevNextJumpers: false,
            prevIcon: <span>{t("previous").toUpperCase()}</span>,
            nextIcon: <span>{t("next").toUpperCase()}</span>,
          }}
        />
      </section>
    </main>
  );
}
