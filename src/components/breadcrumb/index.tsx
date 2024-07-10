import React from "react";
import styles from "./styles.module.css";

type BreadcrumbProps = {
  items: string[];
};

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <div className={styles.wrapper}>
      {items.map((item, index) => {
        return (
          <React.Fragment key={item}>
            <span
              key={item}
              className={index === 0 ? styles.initial : styles.item}
            >
              {item}
            </span>
            {index !== items.length - 1 && (
              <span className={styles.separator}>/</span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};