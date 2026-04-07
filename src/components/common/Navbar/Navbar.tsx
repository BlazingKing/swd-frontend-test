/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { Select } from "antd";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Navbar.module.scss";

const TEST_OPTIONS = [
  { value: "m-style", labelKey: "title1" },
  { value: "form", labelKey: "title2" },
];

const LANG_OPTIONS = [
  { value: "en", label: "EN" },
  { value: "th", label: "TH" },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();
  const [currentTest, setCurrentTest] = useState<string | undefined>();

  useEffect(() => {
    const match = TEST_OPTIONS.find((o) => pathname === `/${o.value}`);
    setCurrentTest(match?.value);
  }, [pathname]);

  const isHome = pathname === "/";

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>
        SWD Frontend Test
      </Link>
      <div className={styles.menu}>
        {!isHome && (
          <Select
            value={currentTest}
            placeholder="Select test"
            style={{ width: 160 }}
            onChange={(val: string) => {
              setCurrentTest(val);
              router.push(`/${val}`);
            }}
            options={TEST_OPTIONS.map((o) => ({
              value: o.value,
              label: t(o.labelKey),
            }))}
          />
        )}
        <Select value={i18n.language} style={{ width: 80 }} onChange={(val: string) => i18n.changeLanguage(val)} options={LANG_OPTIONS} />
      </div>
    </nav>
  );
}
