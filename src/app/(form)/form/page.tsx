"use client";
import { useTranslation } from "react-i18next";
import styles from "./page.module.scss";
import PersonForm from "@/components/person/PersonForm";
import PersonTable from "@/components/person/PersonTable";
import { usePersonForm } from "@/hooks/usePersonForm";
import { usePersist } from "@/hooks/usePersist";

export default function FormPage() {
  const { t } = useTranslation();
  const formHook = usePersonForm();

  // load & sync localStorage
  usePersist();

  return (
    <main className={styles.page}>
      <div className={styles.titleLayout}>
        <h2 className={styles.title}>{t("title2")}</h2>
      </div>

      <section className={styles.formSection}>
        <PersonForm formHook={formHook} />
      </section>

      <section className={styles.tableSection}>
        <PersonTable formHook={formHook} />
      </section>
    </main>
  );
}