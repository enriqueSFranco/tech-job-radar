interface Props {
  children: React.ReactNode
}

export function FormLayout({children}: Props) {
  return (
    <div>
      {/* TODO: Implementar el diseño del layout */}
      <div>{children}</div>
    </div>
  )
}

