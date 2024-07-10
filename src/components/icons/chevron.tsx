import styles from "./chevron.module.css";

type ChevronIconProps = {
  pointing?: "top" | "bottom" | "left" | "right";
} & React.SVGProps<SVGSVGElement>;

export const ChevronIcon: React.FC<ChevronIconProps> = ({
  pointing,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={10}
    height={6}
    fill="none"
    data-pointing={pointing}
    className={styles.icon}
    {...props}
  >
    <path
      fill="#17192D"
      d="M9.152.143h-.837a.18.18 0 0 0-.144.074L5 4.587 1.83.217a.18.18 0 0 0-.145-.074H.848a.09.09 0 0 0-.072.142L4.71 5.71a.356.356 0 0 0 .577 0L9.223.285a.089.089 0 0 0-.071-.142Z"
    />
  </svg>
);
