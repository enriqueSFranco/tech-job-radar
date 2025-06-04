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
    backgroundColor: "#6B728033",
    color: "#fff",
  }
  const defaultTextStyle: React.CSSProperties = {
    color: "#9CA3AF",
  }
  return (
    <div style={{...defaultStyles}} className="flex items-center gap-1.5 px-2 py-1 rounded-full">
      {children}
      <h3  style={{...defaultTextStyle}} className="text-sm self-end">{label}</h3>
    </div>
  );
}
