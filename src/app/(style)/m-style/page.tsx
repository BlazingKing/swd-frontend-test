"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./page.module.scss";
import ShapeGrid from "@/components/shape/ShapeGrid";
import { ShapeName } from "@/types/shape.types";

const INITIAL_SHAPES: ShapeName[] = ["square", "rectangle", "circle", "oval", "trapezoid-right", "trapezoid"];

const BUTTONS = [
  { action: "prev", rotation: 270, label: "move_shape" },
  { action: "toggleUp", rotation: 0, label: "move_position" },
  { action: "toggleDown", rotation: 180, label: "move_position" },
  { action: "next", rotation: 90, label: "move_shape" },
] as const;

export default function MStylePage() {
  const { t } = useTranslation();
  const [shapeList, setShapeList] = useState<ShapeName[]>(INITIAL_SHAPES);
  const [isRowLayout, setIsRowLayout] = useState(true);

  const handleNext = () => setShapeList((prev) => [prev[prev.length - 1], ...prev.slice(0, -1)]);

  const handlePrev = () => setShapeList((prev) => [...prev.slice(1), prev[0]]);

  const handleMoveUp = () => setIsRowLayout(true);

  const handleMoveDown = () => setIsRowLayout(false);

  const handleRandomize = () => setShapeList((prev) => [...prev].sort(() => Math.random() - 0.5));

  const actionMap = {
    prev: handlePrev,
    toggleUp: handleMoveUp,
    toggleDown: handleMoveDown,
    next: handleNext,
  };

  return (
    <div className={styles.gradient}>
      <main className={styles.page + " " + styles.gradient}>
        <div className={styles.titleLayout}>
          <h2 className={styles.title}>{t("title1")}</h2>
        </div>

        <section className={styles.buttonLayout}>
          {BUTTONS.map(({ action, rotation, label }) => (
            <div key={action} className={styles.buttonbg} onClick={actionMap[action]}>
              <div className={styles.triangle} style={{ transform: `rotate(${rotation}deg)` }} />
              <span className={styles.bage}>{t(label)}</span>
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
    </div>
  );
}
