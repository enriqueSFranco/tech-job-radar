export function ErrorMessage({ message }: { message: string }) {
  return (
    <div>
      <p>{JSON.stringify(message, null, 2)}</p>
    </div>
  );
}
