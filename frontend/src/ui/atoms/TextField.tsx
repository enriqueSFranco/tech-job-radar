import { useId } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  label?: string;
}

export function TextField({ label, icon, ...rest }: Props) {
  const inputHintId = useId();

  return (
    <div className="w-full h-12 rounded-md flex items-center">
      {icon}
      {label ? (
        <label className="flex flex-col">
          <span className="text-black">{label}</span>
          <input
            {...rest}
            id={inputHintId}
            autoFocus
            autoComplete="off"
            className="w-full h-full outline-none indent-1.5 placeholder:text-sm"
          />
        </label>
      ) : (
        <input
          {...rest}
          id={inputHintId}
          autoFocus
          autoComplete="off"
          className="w-full h-full outline-none indent-1.5 placeholder:text-sm"
        />
      )}
    </div>
  );
}
