import "./Button.styles.scss";

interface ButtonProps {
  children: string | JSX.Element | JSX.Element[];
}

export default function Button(props: ButtonProps) {
  return <button {...props}>{props.children}</button>;
}
