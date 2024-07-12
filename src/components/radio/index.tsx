import styles from "./radio.module.css";

type RadioProps = React.PropsWithChildren<React.ComponentPropsWithRef<"input">>;

export const Radio: React.FC<RadioProps> = ({ children, ...props }) => {
  return (
    <label className={styles.wrapper}>
      <input type="radio" {...props} />
      <span>{children}</span>
    </label>
  );
};
