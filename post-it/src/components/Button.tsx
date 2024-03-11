interface ButtonProps {
  type: string;
  className?: String;
  label: String;
  onClick?: () => void;
}

export default function Button(props: ButtonProps) {
  return (
    <button className={`basic-button ${props.className || "blue"}`} onClick={props.onClick} typeof={props.type}>
      {props.label}
    </button>
  );
}
