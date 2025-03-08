"use client";
import React, { useState } from "react";
import styles from "./page.module.scss";
import { useTranslation } from "react-i18next";
import { Row, Col } from "antd";
import classNames from "classnames";

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
  const [isRowLayout, setIsRowLayout] = useState(true);

  const nextPage = () => setShapeList((prev) => [...prev.slice(1), prev[0]]);
  const prevPage = () =>
    setShapeList((prev) => [
      prev[prev.length - 1],
      ...prev.slice(0, prev.length - 1),
    ]);
  const randomizePosition = () =>
    setShapeList([...shapeList].sort(() => Math.random() - 0.5));
  const toggleLayout = () => setIsRowLayout((prev) => !prev);

  const renderRow = (shapes: string[], offsetFirstCol = false) => (
    <Row justify="center" gutter={[16, 16]} className={styles.rowContainer}>
      {shapes.map((shape, index) => (
        <Col
          key={index}
          span={6}
          offset={offsetFirstCol && index === 0 ? 3 : 0}
          onClick={randomizePosition}
        >
          <div className={styles.shapeContainer}>
            <div className={classNames(styles.shape, styles[shape])} />
          </div>
        </Col>
      ))}
    </Row>
  );

  return (
    <main className={styles.page}>
      <div className={styles.titleLayout}>
        <h2 className={styles.title}>{t("title1")}</h2>
      </div>
      <section className={styles.buttonLayout}>
        {[
          { onClick: nextPage, rotation: 270, label: t("move_shape") },
          {
            onClick: toggleLayout,
            rotation: null,
            label: t("move_position"),
            double: true,
          },
          { onClick: prevPage, rotation: 90, label: t("move_shape") },
        ].map(({ onClick, rotation, label, double }, idx) => (
          <div key={idx} className={styles.buttonbg} onClick={onClick}>
            <div
              className={styles.triangle}
              style={{
                transform: rotation ? `rotate(${rotation}deg)` : "rotate(0deg)",
              }}
            />
            {double && (
              <div
                className={styles.triangle}
                style={{ transform: "rotate(180deg)", marginLeft: "8px" }}
              />
            )}
            <div className={styles.bage}>{label}</div>
          </div>
        ))}
      </section>
      <section className={styles.staggeredContainer}>
        {isRowLayout ? (
          <>
            {renderRow(shapeList.slice(0, 3))}
            {renderRow(shapeList.slice(3, 6), true)}
          </>
        ) : (
          <>
            {renderRow(shapeList.slice(0, 3), true)}
            {renderRow(shapeList.slice(3, 6))}
          </>
        )}
      </section>
    </main>
  );
}
