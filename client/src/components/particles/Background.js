import React,{useState, useEffect} from 'react';
import { particalesConfig } from './particle-config';
import Particles,{initParticlesEngine} from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const Background = () => {
  const [init, setInit] = useState(false);

  useEffect(()=>{
    initParticlesEngine(async(engine)=>{
      await loadSlim(engine)
    }).then(()=>{
      setInit(true)
    })
  },[])

  const particlesLoaded = (container) => {
    //console.log(container);
  };

  return (
    <><Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={particalesConfig}
     /></>
  )
}

export default Background