type TopbarProps = {
  title: string;
};

export default function Topbar({ title }: TopbarProps) {
  return (
    <header className="topbar">
      <h1>{title}</h1>
      <p>Monday , April 13 ,2026</p>
    </header>
  );
}
