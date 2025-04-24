interface Props extends React.HTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
  label: string
}

export function TextField({label, icon, ...rest}:Props) {
  return (
    <div className="outline-[1px] outline-white/20 w-full h-12 rounded-md">
      <div>{icon}</div>
      <label className="flex flex-col bg-white/20">
        <span>{label}</span>
        <input
          {...rest}
          className="w-full h-full outline-none indent-1.5 placeholder:text-sm"
        />
      </label>
    </div>
  );
}
