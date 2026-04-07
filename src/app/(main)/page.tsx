"use client";
import { Card, Row, Col } from "antd";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import styles from "./page.module.scss";

const TESTS = [
  { key: "m-style", titleKey: "title1", test: 1 },
  { key: "form", titleKey: "title2", test: 2 },
];

export default function HomePage() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className={styles.page + " " + styles.gradient}>
      <Row gutter={[180, 32]} justify="center">
        {TESTS.map(({ key, titleKey, test }) => (
          <Col key={key} xs={20} sm={10} md={7} lg={5}>
            <Card hoverable className={styles.card} onClick={() => router.push(`/${key}`)}>
              <h3 className={styles.testLabel}>
                {t("test")} {test}
              </h3>
              <p className={styles.testTitle}>{t(titleKey)}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
