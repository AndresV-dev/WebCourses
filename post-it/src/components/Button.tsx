interface ButtonProps {
  name?: string;
  type: string;
  className?: String;
  label: String | any;
  onClick?: () => void;
}

export default function Button(props: ButtonProps) {
  return (
    <button className={`basic-button ${props.className || "blue"}`} name={props.name} onClick={props.onClick} typeof={props.type}>
      {props.label}
    </button>
  );
}
