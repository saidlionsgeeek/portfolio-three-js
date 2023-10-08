import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import CanvasLoader from "../Loader";


const Computers = ({isMobile}) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  return (
    <mesh>
    {/* for light */}
      <hemisphereLight intensity={0.95} groundColor="black" />
      <pointLight intensity={1} />
      {/* the main light */}
      <spotLight 
      position={[-20,50,10]} 
      angle={0.12}
      penumbra={1}
      intensity={1}
      castShadow
      shadow-mapSize={1024}
      />
      {/* for placment */}
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.6 : 0.75}
        position={isMobile ? [0,-3,-1.5] :[0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  )
}

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 650px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  
  return (
    <Canvas
      frameloop='demand'
      shadows
      // hada l code howa li tikhalini n n3ti position 3d important
      camera={{ position: [20, 3, 5], fov: 25 }}
      // hadi pash ikhdam lina modules deyalna mezyan
      gl={{ preserveDrawingBuffer: true }} >
      {/* hadi deyal react hiya li katloadi lina modal deyalna */}
      <Suspense fallback={<CanvasLoader />} >
        {/* hadi hiya li kat7ark lina l modules deyalna left and right */}
        <OrbitControls
          // had l code bach n9ad only rotat f same direction and bach man9adch n zoomi
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        {/* hada howa l model deyalna */}
        <Computers isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  )
}

export default ComputersCanvas



