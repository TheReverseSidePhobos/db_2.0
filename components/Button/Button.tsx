import style from "./Button.module.scss";
import cn from "classnames";
import Link from "next/link";

interface IButtonProps{
    text?: string,
    size?: string,
    disabled?: boolean,
    type?: string,
    circle?: boolean,
    icon?: React.Component,
    submit?: string,
    noTab?: boolean,
    href?: any,
    isLink?: boolean,
    styleInline?: any,
    ref?: React.LegacyRef<HTMLButtonElement>,
    color?: string,
    onClick?: any,
    className?: string,
    target?: string
}

const Button: React.FC<IButtonProps> = ({
  type = null,
  disabled = false,
  text = null,
  size = null,
  icon = null,
  circle = null,
  href = "",
  isLink = false,
  styleInline = null,
  ref = null,
  color = null,
  onClick = () => {},
  className = "",
}) => {
  if (!isLink) {
    return (
      <button
        ref={ref}
        style={styleInline}
        className={cn(style.main, className, {
          //disabled
          [style.disabled]: disabled,
          //sizes
          [style.lg]: size === "lg",
          [style.md]: size === "md",
          [style.sm]: size === "sm",
          //types
          [style.primary]: type === "primary",
          [style.secondary]: type === "secondary",
          [style.soft]: type === "soft",
          [style.lilPrimary]: type === "lil-primary",
          [style.ghost]: type === "ghost",
          [style.critical]: type === "critical",
          [style.lilCritical]: type === "lil-critical",
          [style.points]: type === "points",
          [style.circle]: circle,
          [style.smCircle]: circle && size === "sm",
          [style.white]: color === "white",
        })}
        onClick={onClick}
      >
        {!!icon && (
          <div className={cn(style.icon, { [style.noText]: !text })}>
            {icon}
          </div>
        )}
        <p>{text}</p>
      </button>
    );
  } else {
    return (
      <Link href={href}>
        <a
          style={styleInline}
          className={cn(style.main, {
            //disabled
            [style.disabled]: disabled,
            //sizes
            [style.lg]: size === "lg",
            [style.md]: size === "md",
            [style.sm]: size === "sm",
            //types
            [style.primary]: type === "primary",
            [style.secondary]: type === "secondary",
            [style.soft]: type === "soft",
            [style.lilPrimary]: type === "lil-primary",
            [style.ghost]: type === "ghost",
            [style.critical]: type === "critical",
            [style.lilCritical]: type === "lil-critical",
            [style.points]: type === "points",
            [style.circle]: circle,
            [style.smCircle]: circle && size === "sm",
          })}
          onClick={onClick}
        >
          {!!icon && (
            <div className={cn(style.icon, { [style.noText]: !text })}>
              {icon}
            </div>
          )}
          <p>{text}</p>
        </a>
      </Link>
    );
  }
};

export default Button;