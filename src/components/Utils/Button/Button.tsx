import "./Button.styles.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string | JSX.Element | JSX.Element[];
}

export default function Button(props: ButtonProps) {
  return <button {...props}>{props.children}</button>;
}
