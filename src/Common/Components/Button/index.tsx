import { classNames } from "../../helpers/utils";
import "./button.css";

export enum BUTTON_SIZES {
  SMALL = "sm",
  MEDIUM = "md",
  LARGE = "lg",
}

export enum BUTTON_VARIANTS {
  SOLID = "solid",
  SECONDARY = "secondary",
  LINK = "link",
}

interface ButtonProps {
  size?: BUTTON_SIZES;
  width?: string;
  children: React.ReactNode;
  disabled?: boolean;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  onClick?: () => void;
  variant?: BUTTON_VARIANTS;
}

export const Button = (props: ButtonProps) => {
  const {
    children,
    size = BUTTON_SIZES.MEDIUM,
    variant = BUTTON_VARIANTS.SOLID,
    width,
    disabled = false,
    leftIcon,
    rightIcon,
    onClick,
  } = props;

  return (
    <button
      className={classNames({
        button: true,
        [`button-${variant}`]: true,
        [`button-${size}`]: true,
      })}
      onClick={onClick}
      disabled={disabled}
      style={{ width }}
    >
      {leftIcon && <div className="button-icon">{leftIcon}</div>}
      {children}
      {rightIcon && <div className="button-icon">{rightIcon}</div>}
    </button>
  );
};
