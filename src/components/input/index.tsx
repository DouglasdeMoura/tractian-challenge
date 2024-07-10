import * as InputPrimitive from "@natural-forms/input";
import styles from "./styles.module.css";

type InputProps = {
  label?: React.ReactNode;
  rightSection?: React.ReactNode;
} & React.ComponentProps<typeof InputPrimitive.Input>;

export const Input: React.FC<InputProps> = ({
  label,
  rightSection,
  ...props
}) => (
  <InputPrimitive.Root className={styles.wrapper}>
    {label ? (
      <InputPrimitive.Label className={styles.label}>
        {label}
      </InputPrimitive.Label>
    ) : null}
    <div className={styles.inputContainer}>
      <InputPrimitive.Input
        {...props}
        className={styles.input}
        data-has-right-section={!!rightSection}
      />
      {rightSection ? (
        <div className={styles.rightSection}>{rightSection}</div>
      ) : null}
    </div>
    <InputPrimitive.Error className={styles.error} />
  </InputPrimitive.Root>
);
