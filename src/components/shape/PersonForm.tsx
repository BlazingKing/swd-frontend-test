"use client";
import { useTranslation } from "react-i18next";
import { Form, Input, Select, DatePicker, Radio, Row, Col, Button } from "antd";
import React from "react";
import { CITIZEN_ID_LENGTHS } from "@/utils/validators";
import { usePersonForm } from "@/hooks/usePersonForm";

const PHONE_PREFIXES = [
  { value: "66", label: "🇹🇭 +66" },
  { value: "1", label: "🇺🇸 +1" },
  { value: "81", label: "🇯🇵 +81" },
  { value: "86", label: "🇨🇳 +86" },
  { value: "33", label: "🇫🇷 +33" },
];

interface PersonFormProps {
  formHook: ReturnType<typeof usePersonForm>;
}

export default function PersonForm({ formHook }: PersonFormProps) {
  const { t } = useTranslation();
  const { form, onFinish } = formHook;

  return (
    <Form form={form} onFinish={onFinish} layout="horizontal">
      {/* hidden id for edit mode */}
      <Form.Item name="id" hidden>
        <Input />
      </Form.Item>

      {/* Title / First / Last */}
      <Row gutter={16} align="middle">
        <Col>
          <Form.Item name="titlename" label={t("title_name")} rules={[{ required: true }]}>
            <Select
              style={{ width: 120 }}
              placeholder={t("title_name")}
              options={[
                { value: "mr", label: t("mr") },
                { value: "mrs", label: t("mrs") },
                { value: "ms", label: t("ms") },
              ]}
            />
          </Form.Item>
        </Col>
        <Col flex="1">
          <Form.Item name="firstname" label={t("first_name")} rules={[{ required: true }]}>
            <Input placeholder={t("first_name")} />
          </Form.Item>
        </Col>
        <Col flex="1">
          <Form.Item name="lastname" label={t("last_name")} rules={[{ required: true }]}>
            <Input placeholder={t("last_name")} />
          </Form.Item>
        </Col>
      </Row>

      {/* Birthday / Nationality */}
      <Row gutter={16}>
        <Col flex="1">
          <Form.Item name="birthday" label={t("birthday")} rules={[{ required: true }]}>
            <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col flex="1">
          <Form.Item name="nationality" label={t("nationality")} rules={[{ required: true }]}>
            <Select
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
        </Col>
      </Row>

      {/* Citizen ID */}
      <Form.Item label={t("citizen_id")}>
        <Row gutter={4} align="middle">
          {CITIZEN_ID_LENGTHS.map((len, i) => (
            <React.Fragment key={i}>
              <Col>
                <Form.Item name={`citizenIdPart${i}`} noStyle>
                  <Input maxLength={len} style={{ width: len * 20 + 24 }} />
                </Form.Item>
              </Col>
              {i < 4 && (
                <Col>
                  <span style={{ padding: "0 2px" }}>-</span>
                </Col>
              )}
            </React.Fragment>
          ))}
        </Row>
      </Form.Item>

      {/* Gender */}
      <Form.Item name="gender" label={t("gender")} rules={[{ required: true }]}>
        <Radio.Group>
          <Radio value="Male">{t("male")}</Radio>
          <Radio value="Female">{t("female")}</Radio>
          <Radio value="Unsex">{t("unsex")}</Radio>
        </Radio.Group>
      </Form.Item>

      {/* Mobile */}
      <Form.Item label={t("mobile_phone")} required>
        <Row gutter={8} align="middle">
          <Col>
            <Form.Item name="mobilePrefix" noStyle rules={[{ required: true }]}>
              <Select style={{ width: 110 }} options={PHONE_PREFIXES} />
            </Form.Item>
          </Col>
          <Col>
            <span>-</span>
          </Col>
          <Col flex="1">
            <Form.Item name="mobile" noStyle rules={[{ required: true }]}>
              <Input placeholder={t("mobile_phone")} />
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>

      {/* Passport */}
      <Form.Item name="passportno" label={t("passport_no")}>
        <Input placeholder={t("passport_no")} style={{ width: 300 }} />
      </Form.Item>

      {/* Expected Salary */}
      <Form.Item name="expectedsalary" label={t("expected_salary")} rules={[{ required: true }]}>
        <Input type="number" placeholder={t("expected_salary")} style={{ width: 300 }} />
      </Form.Item>

      {/* Buttons */}
      <Row justify="end" gutter={8}>
        <Col>
          <Button htmlType="reset">{t("reset")}</Button>
        </Col>
        <Col>
          <Button type="primary" htmlType="submit">
            {t("submit")}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
