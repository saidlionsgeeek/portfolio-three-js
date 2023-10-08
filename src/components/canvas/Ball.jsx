import React , {Suspense} from 'react';
import { Canvas } from '@react-three/fiber';
import {
  Decal , Float , OrbitControls, Preload,useTexture
} from '@react-three/drei' ; 

import CanvasLoader from "../Loader";

const Ball = (props) => {
  const [decal] = useTexture([props.imgUrl]);
  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0,0,0.05]} />
      <mesh 
      castShadow 
      receiveShadow
      scale={2.85}>
      <icosahedronGeometry args={[1,1]}/>
      <meshStandardMaterial
        color="#fff8eb" 
        polygonOffset
        polygonOffsetFactor={-5}
        flatShading
      />
    <Decal
      position={[0,0,1]}
      rotation={[2 * Math.PI , 0 , 6.25]}
      scale={1}
      map={decal} 
      flatShading
    />
      </mesh>
    </Float>
  )
}

const BallCanvas = ({icon}) => {

  return(
    <Canvas
    frameloop='demand'
    dpr={[1, 2]}
    // hadi pash ikhdam lina modules deyalna mezyan
    gl={{ preserveDrawingBuffer: true }} >
    {/* hadi deyal react hiya li katloadi lina modal deyalna */}
    <Suspense fallback={<CanvasLoader />} >
      {/* hadi hiya li kat7ark lina l modules deyalna left and right */}
      <OrbitControls
        // had l code bach n9ad only rotat f same direction and bach man9adch n zoomi
        enableZoom={false}
      />
      {/* hada howa l model deyalna */}
      <Ball imgUrl={icon} />
    </Suspense>
    <Preload all />
  </Canvas>
  )
}

export default BallCanvas