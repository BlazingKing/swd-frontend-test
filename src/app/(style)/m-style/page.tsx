"use client";
import React, { useState } from "react";
import styles from "./page.module.scss";
import { useTranslation } from "react-i18next";

export default function MStylePage() {
  const shapes = [
    "triangle",
    "square",
    "circle",
    "oval",
    "trapezoid-left",
    "trapezoid-right",
  ];
  const { t } = useTranslation();
  const [shapeList, setShapeList] = useState(shapes);

  const nextPage = () => {
    setShapeList((prev) => [...prev.slice(1), prev[0]]);
  };

  const prevPage = () => {
    setShapeList((prev) => [prev[prev.length - 1], ...prev.slice(0, prev.length - 1)]);
  };


  const shuffleShapes = () =>
    setShapeList([...shapeList.sort(() => Math.random() - 0.5)]);

  const randomizePosition = () => {
    const newOrder = [...shapeList].sort(() => Math.random() - 0.5);
    setShapeList(newOrder);
  };

  return (
    <main className={styles.page}>
      <div className={styles.titleLayout}>
        <h2 className={styles.title}>{t("title1")}</h2>
      </div>
      <section className={styles.buttonLayout}>
        <div className={styles.buttonbg} onClick={nextPage}>
          <div className={styles.triangle}  style={{ transform: `rotate(270deg)` }}/>
          <div className={styles.bage}>{t("move_shape")}</div>
        </div>
        <div className={styles.buttonbg} onClick={shuffleShapes}>
          <div className={styles.triangle} style={{ transform: `rotate(180deg)` }}/>
          <div className={styles.bage}>{t("move_position")}</div>
        </div>
        <div className={styles.buttonbg} onClick={shuffleShapes}>
          <div className={styles.triangle} style={{ transform: `rotate(0deg)` }}/>
          <div className={styles.bage}>{t("move_position")}</div>
        </div>
        <div className={styles.buttonbg} onClick={prevPage}>
          <div className={styles.triangle} style={{ transform: `rotate(90deg)` }}/>
          <div className={styles.bage}>{t("move_shape")}</div>
        </div>
      </section>
      <section className={styles.gridContainer}>
        {shapeList.map((shape: string, index: number) => (
          <div
            onClick={randomizePosition}
            key={index}
            className={styles.shapeContainer}
          >
            <div
              key={index}
              className={`${styles.shape} ${styles[shape]}`}
            />
          </div>
        ))}
      </section>
    </main>
  );
}
