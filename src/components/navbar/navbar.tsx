"use client";
import React, { useEffect, useState } from "react";
import { Select } from "antd";
import styles from "./navbar.module.scss";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface NavbarProps {
  children: React.ReactNode;
}
export default function Navbar({ children }: NavbarProps) {
  const { t, i18n } = useTranslation();
  const paths = usePathname();
  const router = useRouter();
  const [selectTest, setSelectTest] = useState<string>("");

  useEffect(() => {
    if (paths === "/m-style") {
      setSelectTest("m-style");
    } else if (paths === "/form") {
      setSelectTest("form");
    }
  }, [paths]);
  return (
    <main>
      <div className={styles.nav}>
        <Link href="/">
          <h1 className={styles.colorsfont}>SWD Frontend Test</h1>
        </Link>
        <div className={styles.menu}>
          {paths !== "/" && (
            <Select
              defaultValue={"en"}
              value={selectTest}
              className={styles.testSelector}
              onChange={(e: string) => {
                setSelectTest(e);
                router.push(`/${e}`);
              }}
              options={[
                { value: "m-style", label: `${t("title1")}` },
                { value: "form", label: `${t("title2")}` },
              ]}
            />
          )}
          <Select
            defaultValue={"en"}
            value={i18n.language}
            className={styles.languageSelector}
            onChange={(e: string) => i18n.changeLanguage(e)}
            options={[
              { value: "en", label: "EN" },
              { value: "th", label: "TH" },
            ]}
          />
        </div>
      </div>
      <div>{children}</div>
    </main>
  );
}
