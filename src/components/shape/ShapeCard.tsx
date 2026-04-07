import classNames from "classnames";
import styles from "./Shape.module.scss";
import { ShapeName } from "@/types/shape.types";

interface ShapeCardProps {
  shape: ShapeName;
  onClick: () => void;
}

export default function ShapeCard({ shape, onClick }: ShapeCardProps) {
  return (
    <div className={styles.shapeContainer} onClick={onClick}>
      <div className={classNames(styles.shape, styles[shape])} />
    </div>
  );
}
