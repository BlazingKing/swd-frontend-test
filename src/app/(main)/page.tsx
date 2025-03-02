"use client";
import styles from "./page.module.scss";
import { Card } from "antd";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function Home() {
  const router = useRouter();
  const { t } = useTranslation();
  const _handleClick = (key: string) => {
    router.push(`/${key}`);
  };
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        
        <div className={styles.cardContainer}>
          <Card
            className={styles.card}
            hoverable
            onClick={() => _handleClick("m-style")}
          >
            <h3>{t("test")} 1</h3>
            <p>{t("title1")}</p>
          </Card>
          <Card
            className={styles.card}
            hoverable
            onClick={() => _handleClick("form")}
          >
            <h3>{t("test")} 2</h3>
            <p>{t("title2")}</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
