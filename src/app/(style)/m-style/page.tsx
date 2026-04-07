"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./page.module.scss";
import ShapeGrid from "@/components/shape/ShapeGrid";
import { ShapeName } from "@/types/shape.types";

const INITIAL_SHAPES: ShapeName[] = ["triangle", "square", "circle", "oval", "trapezoid-left", "trapezoid-right"];

const BUTTONS = [
  { action: "prev", rotation: 270, double: false },
  { action: "toggle", rotation: 0, double: true },
  { action: "next", rotation: 90, double: false },
] as const;

export default function MStylePage() {
  const { t } = useTranslation();
  const [shapeList, setShapeList] = useState<ShapeName[]>(INITIAL_SHAPES);
  const [isRowLayout, setIsRowLayout] = useState(true);

  const handleNext = () => setShapeList((prev) => [...prev.slice(1), prev[0]]);

  const handlePrev = () => setShapeList((prev) => [prev[prev.length - 1], ...prev.slice(0, -1)]);

  const handleToggle = () => setIsRowLayout((prev) => !prev);

  const handleRandomize = () => setShapeList((prev) => [...prev].sort(() => Math.random() - 0.5));

  const actionMap = {
    prev: handlePrev,
    toggle: handleToggle,
    next: handleNext,
  };

  const labelMap = {
    prev: t("move_shape"),
    toggle: t("move_position"),
    next: t("move_shape"),
  };

  return (
    <main className={styles.page}>
      <div className={styles.titleLayout}>
        <h2 className={styles.title}>{t("title1")}</h2>
      </div>

      <section className={styles.buttonLayout}>
        {BUTTONS.map(({ action, rotation, double }) => (
          <div key={action} className={styles.buttonbg} onClick={actionMap[action]}>
            <div className={styles.triangle} style={{ transform: `rotate(${rotation}deg)` }} />
            {double && <div className={styles.triangle} style={{ transform: "rotate(180deg)" }} />}
            <span className={styles.bage}>{labelMap[action]}</span>
          </div>
        ))}
      </section>

      <section className={styles.staggeredContainer}>
        {isRowLayout ? (
          <>
            <ShapeGrid shapes={shapeList.slice(0, 3)} onShapeClick={handleRandomize} />
            <ShapeGrid shapes={shapeList.slice(3, 6)} onShapeClick={handleRandomize} offsetFirst />
          </>
        ) : (
          <>
            <ShapeGrid shapes={shapeList.slice(0, 3)} onShapeClick={handleRandomize} offsetFirst />
            <ShapeGrid shapes={shapeList.slice(3, 6)} onShapeClick={handleRandomize} />
          </>
        )}
      </section>
    </main>
  );
}
