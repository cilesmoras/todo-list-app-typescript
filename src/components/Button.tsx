import { ComponentProps } from "react";
import "./component.styles.css";

type ButtonProps = ComponentProps<"button">;

export default function Button({ ...rest }: ButtonProps) {
  return <button className="btn-save-task" {...rest} />;
}
