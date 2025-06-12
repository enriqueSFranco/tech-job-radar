interface Props {
  label: string;
  variant?: 'outlined' | 'filled'
  color?: "primary" | 'success'
  size?: "small" | "medium"
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export function Chip({ label, children }: Props) {
  const defaultStyles: React.CSSProperties = {
    backgroundColor: "#262626",
    color: "#9CA3AF",
  }

  return (
    <div className="flex flex-col items-start gap-1.5 rounded-full">
      {children}
      <span  style={{...defaultStyles}} className="text-sm self-start rounded-sm px-2 py-0.5">{label}</span>
    </div>
  );
}
