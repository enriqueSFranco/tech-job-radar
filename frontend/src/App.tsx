import './App.css';
import { Suspense, useEffect, useState } from 'react';
import {Card} from "@/ui/components/card/Card"
import data from "@/resources/json/jobs.json"
import {Job} from "@/types"
import { IcRadar, IcSparkles } from './ui/components/icons';
import { Debugger } from './shared/components/Debugger';
import { Link } from 'react-router';
import { Header } from './ui/components/Header/Header';
import { PanelMenu } from './ui/components/Menu/PanelMenu';

const jobs: Job[] = data


const MOBILE_BREAKPOINT = 768;

const App = () => {
  // TODO: Usar redux para controlar el estado
  const [myJobs, setMyJobs] = useState<Job[]>([])
  const [showMenu, setShowMenu] = useState(false)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= MOBILE_BREAKPOINT)

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width:${MOBILE_BREAKPOINT}px)`)

    const handleChange = (e: MediaQueryListEvent) => {
      // actializamos el estado de la ventana
      setIsMobile(e.matches)
    }
    setIsMobile(mediaQuery.matches)

    // agregamos un listener para escuchar el cambio de tamaño
    mediaQuery.addEventListener("change", handleChange)

    return () => mediaQuery.removeEventListener("change", handleChange)
  },[])

  const toggleSaveJob = (id: string) => () => {
    setMyJobs(prevState => {
      const exists = prevState.some(job => job.id === id)
      if (exists) {
        console.log(`deleted to job ${id}`)
        return prevState.filter(job => job.id !== id)
      } else {
        console.log(`save to job ${id}`)
        const jobToSave = jobs.find(job => job.id === id)
        return jobToSave ? [...prevState, jobToSave] : prevState
      }
    })
  }

  const isJobSaved = (id: string) => myJobs.some(job => job.id === id)

  return (
    <div className="content">
      <Header />
      {showMenu && (
        <Suspense fallback={<div>Loading...</div>}>
          <PanelMenu showMenu={showMenu} />
        </Suspense>
      )}
      {/* form search */}
      <div className="w-full fex flex-col gap-4">
        <form className="flex flex-col gap-4">
          <div className="outline-[1px] outline-white/20 w-full h-12 rounded-md ">
            <input placeholder="¿Qué puesto estás buscando?" autoFocus autoComplete='off' className="w-full h-full outline-none indent-1.5 placeholder:text-sm" />
          </div>
          <div className="outline-[1px] outline-white/20 w-full h-12 rounded-md ">
            <input placeholder="Lugar o trabajo remoto" autoComplete='off' className="w-full h-full outline-none indent-1.5 placeholder:text-sm" />
          </div>
        </form>
        {/* filters */}
        <div className="grid place-content-center w-full mt-3">
          <nav className="w-full m-auto">
            <ul className="flex items-center justify-between gap-4">
              <li>
                <div className="flex items-center gap-1">
                <IcSparkles />
                  <Link to="/" className="text-base text-transparent bg-clip-text bg-gradient-to-bl from-green-300 via-blue-500 to-purple-600">Para ti</Link>
                </div>
              </li>
              <li>
                <Link to="/" className="text-base">Buscar</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      {/* container data */}
      <div>
        <ul className="w-full grid grid-flow-row md:auto-cols-min divide-y-[1px] divide-white/20 lg:flex lg:flex-wrap lg:justify-center lg:items-center lg:gap-8">
          {jobs.map(job => (
            <li key={`jobId-${job?.id}`}>
              <Card item={job} onSaveJob={toggleSaveJob(job.id)} isSave={isJobSaved(job.id)} />
            </li>
          ))}
        </ul>
      </div>
      {/* footer */}
      <Debugger data={myJobs} />
    </div>
  );
};

export default App;
