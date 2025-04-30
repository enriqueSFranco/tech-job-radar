interface Props {
  label: string;
  style?: React.CSSProperties,
  children?: React.ReactNode;
}

export function Badge({ label, style, children }: Props) {
  const defaultStyles: React.CSSProperties = {
    backgroundColor: "#6B728033",
    color: "#fff",
  }
  const defaultTextStyle: React.CSSProperties = {
    color: "#9CA3AF",
  }
  return (
    <div style={{...defaultStyles,...style}} className="flex items-center gap-1.5 px-2 py-1 rounded-full">
      {children}
      <h3  style={{...defaultTextStyle, ...style}} className="text-sm self-end">{label}</h3>
    </div>
  );
}
