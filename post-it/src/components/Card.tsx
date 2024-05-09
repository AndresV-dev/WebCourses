interface CardProps {
  title: string;
  registers: number;
}

export default function Card(props: CardProps) {
  return (
    <div>
      This Will be a Card for Info Component
      <span>title: {props.title}</span>
      <span>registers: {props.registers}</span>
    </div>
  );
}
