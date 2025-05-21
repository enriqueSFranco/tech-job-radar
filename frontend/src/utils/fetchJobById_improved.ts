import { Job } from "@/types";
import data from "@/resources/json/mockApiData.json"

export async function fetchJobById_improved(jobId: string, signal: AbortSignal): Promise<Job | null> {
  if (signal.aborted) {
    console.log(`Petición para job ID: ${jobId} abortada antes de iniciar (check inicial).`);
    throw new DOMException("Peticion cancelada", "AbortError")
  }
  console.log(`Iniciando fetch para job ID: ${jobId}. Simulando delay de 1 segundo...`);

  await new Promise<void>((resolve, reject) => {
    const abortListener = () => {
      clearTimeout(timeout)
      console.log(`Petición para job ID: ${jobId} cancelada durante el delay.`);
      reject(new DOMException("peticion cancelada", "AbortError"))
    }
    const timeout = setTimeout(() => {
      signal.removeEventListener("abort", abortListener)
      console.log(`Delay completado para job ID: ${jobId}.`);
      resolve()
    }, 300)
    signal.addEventListener("abort", abortListener)
  })
  console.log(`Procesando job ID: ${jobId} después del delay.`);
  if (Math.random() < 0.1) {
    console.log(`Error simulado en la carga del trabajo para job ID: ${jobId}.`);
    throw new Error("Error en la carga del trabajo");
  }
  const job = data.find((j) => j.id === jobId);
  if (job) {
    console.log(`Trabajo encontrado para ID: ${jobId}: ${job.jobTitle}`);
  } else {
    console.log(`Trabajo con ID '${jobId}' no encontrado.`);
  }
  return job || null
}


// uso
export async function ejecutarSimulaciones() {
  // --- Test Case 1: Petición exitosa ---
  console.log("\n--- CASO 1: Petición Exitosa ---");
  const controller1 = new AbortController();
  try {
    const job1 = await fetchJobById_improved("1", controller1.signal);
    console.log("Resultado Caso 1:", job1 ? job1.jobTitle : "No encontrado");
  } catch (error: any) {
    console.error("Error Caso 1:", error.message, error.name === 'AbortError' ? "(Cancelada)" : "");
  }

  // --- Test Case 2: Petición cancelada durante el delay ---
  console.log("\n--- CASO 2: Petición Cancelada ---");
  const controller2 = new AbortController();
  setTimeout(() => {
    console.log("(Acción: Cancelando petición para job ID 2...)");
    controller2.abort();
  }, 500); // Cancelar después de 0.5s (antes de que el delay de 1s termine)

  try {
    const job2 = await fetchJobById_improved("2", controller2.signal);
    console.log("Resultado Caso 2 (no debería llegar aquí si se cancela):", job2);
  } catch (error: any) {
    console.error("Error Caso 2:", error.message, error.name === 'AbortError' ? "(Cancelada)" : "");
  }

  // Esperar un poco para que la cancelación del caso 2 se procese antes del siguiente caso
  await new Promise(resolve => setTimeout(resolve, 1500));

  // --- Test Case 3: Petición con señal ya cancelada ---
  console.log("\n--- CASO 3: Señal Ya Cancelada ---");
  const controller3 = new AbortController();
  controller3.abort(); // Cancelar inmediatamente
  try {
    const job3 = await fetchJobById_improved("3", controller3.signal);
    console.log("Resultado Caso 3 (no debería llegar aquí):", job3);
  } catch (error: any) {
    console.error("Error Caso 3:", error.message, error.name === 'AbortError' ? "(Cancelada)" : "");
  }

  // --- Test Case 4: Simulación de error aleatorio (puede que necesites ejecutar varias veces) ---
  // (Para probar el error aleatorio, puedes temporalmente aumentar la probabilidad en la función,
  // por ejemplo, Math.random() < 0.8)
  console.log("\n--- CASO 4: Posible Error Aleatorio ---");
  const controller4 = new AbortController();
  try {
    const job4 = await fetchJobById_improved("1", controller4.signal); // Usa un ID que exista
    console.log("Resultado Caso 4:", job4 ? job4.jobTitle : "No encontrado o error");
  } catch (error: any) {
    console.error("Error Caso 4:", error.message, error.name === 'AbortError' ? "(Cancelada)" : "");
  }
}

// ejecutarSimulaciones();
