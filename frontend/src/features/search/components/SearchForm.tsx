export function SearchForm() {
  return (
    <form className="flex flex-col gap-4">
      <div className="outline-[1px] outline-white/20 w-full h-12 rounded-md ">
        <input
          placeholder="¿Qué puesto estás buscando?"
          autoFocus
          autoComplete="off"
          className="w-full h-full outline-none indent-1.5 placeholder:text-sm"
        />
      </div>
      <div className="outline-[1px] outline-white/20 w-full h-12 rounded-md ">
        <input
          placeholder="Lugar o trabajo remoto"
          autoComplete="off"
          className="w-full h-full outline-none indent-1.5 placeholder:text-sm"
        />
      </div>
    </form>
  );
}

