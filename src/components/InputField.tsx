import { ComponentProps, forwardRef } from "react";
import "./component.styles.css";

type InputProps = ComponentProps<"input">;

type Ref = HTMLInputElement;

export default forwardRef<Ref, InputProps>(function InputField(
  { ...rest }: InputProps,
  ref
) {
  return <input type="text" className="input-field" ref={ref} {...rest} />;
});
