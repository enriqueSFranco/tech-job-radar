export function Hero() {
  return (
    <section className="w-full h-72 grid place-content-center fade-mask bg-black bg-[linear-gradient(to_right,#222222E6_1px,transparent_1px),linear-gradient(to_bottom,#222222E6_1px,transparent_1px)] bg-[size:24px_24px] ">
      <h2 className="text-[2.5em] sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center tracking-tight leading-snug z-20">
        La chamba ideal existe
        <br /> y te está{" "}
        <span className="relative inline-block">
          buscando
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 170 19"
            className="stroke-hero stroke-blue-700 opacity-75 drop-shadow-2xl drop-shadow-blue-700 absolute left-0 -bottom-[0.20em] w-full h-[0.6em] stroke-hero"
            preserveAspectRatio="none"
          >
            <path
              id="Path"
              d="M2.5 6.65396C79.8864 -0.9541 137.773 1.67389 167.5 8.02777C139.886 5.72365 78.8636 5.60446 29.0909 9.40306C61.8182 8.71233 113.977 11.613 128.977 16.3094C113.068 14.2374 84.3182 12.8562 49.5455 17"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </span>
      </h2>
    </section>
  );
}
