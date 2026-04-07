"use client";
import { useTranslation } from "react-i18next";
import { Table, Button, Checkbox, Row } from "antd";
import { Person } from "@/types/person.types";
import { usePersonForm } from "@/hooks/usePersonForm";

interface PersonTableProps {
  formHook: ReturnType<typeof usePersonForm>;
}

export default function PersonTable({ formHook }: PersonTableProps) {
  const { t } = useTranslation();
  const { persons, selectedIds, handleEdit, handleDelete, handleDeleteMultiple, handleSelectAll, handleRowSelect } = formHook;

  const columns = [
    { title: t("name"), dataIndex: "fullname", key: "fullname" },
    {
      title: t("gender"),
      dataIndex: "gender",
      key: "gender",
      render: (v: string) => t(v.toLowerCase()),
    },
    { title: t("mobile_phone"), dataIndex: "mobile", key: "mobile" },
    {
      title: t("nationality"),
      dataIndex: "nationality",
      key: "nationality",
      render: (v: string) => t(`nation_${v.toLowerCase()}`),
    },
    {
      title: t("manage"),
      key: "action",
      render: (_: unknown, record: Person) => (
        <>
          <Button type="text" onClick={() => handleEdit(record)}>
            {t("edit")}
          </Button>
          <Button type="text" danger onClick={() => handleDelete(record.id)}>
            {t("delete")}
          </Button>
        </>
      ),
    },
  ];

  const allChecked = persons.length > 0 && selectedIds.length === persons.length;
  const indeterminate = selectedIds.length > 0 && selectedIds.length < persons.length;

  return (
    <>
      <Row justify="space-between" align="middle" style={{ marginBottom: 12 }}>
        <Checkbox checked={allChecked} indeterminate={indeterminate} onChange={(e) => handleSelectAll(e.target.checked)}>
          {t("select_all")}
        </Checkbox>
        <Button danger disabled={selectedIds.length === 0} onClick={handleDeleteMultiple}>
          {t("delete")}
        </Button>
      </Row>
      <Table
        rowSelection={{
          selectedRowKeys: selectedIds,
          onChange: (keys) => handleRowSelect(keys as string[]),
        }}
        columns={columns}
        dataSource={persons}
        rowKey="id"
        pagination={{
          pageSize: 5,
          showSizeChanger: false,
          prevIcon: <span>{t("previous").toUpperCase()}</span>,
          nextIcon: <span>{t("next").toUpperCase()}</span>,
        }}
      />
    </>
  );
}
