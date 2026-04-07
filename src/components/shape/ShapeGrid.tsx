import { Col, Row } from "antd";
import ShapeCard from "./ShapeCard";
import { ShapeName } from "@/types/shape.types";
import styles from "./Shape.module.scss";

interface ShapeGridProps {
  shapes: ShapeName[];
  offsetFirst?: boolean;
  onShapeClick: () => void;
}

export default function ShapeGrid({ shapes, offsetFirst = false, onShapeClick }: ShapeGridProps) {
  return (
    <Row justify="center" gutter={[16, 16]} className={styles.rowContainer}>
      {shapes.map((shape, index) => (
        <Col key={index} span={6} offset={offsetFirst && index === 0 ? 3 : 0}>
          <ShapeCard shape={shape} onClick={onShapeClick} />
        </Col>
      ))}
    </Row>
  );
}
