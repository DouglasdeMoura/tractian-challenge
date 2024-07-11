import styles from "./checkbox.module.css";

type CheckboxProps = React.PropsWithChildren<
  React.ComponentPropsWithRef<"input">
>;

export const Checkbox: React.FC<CheckboxProps> = ({ children, ...props }) => {
  return (
    <label className={styles.wrapper}>
      <input type="checkbox" {...props} />
      <span>{children}</span>
    </label>
  );
};
