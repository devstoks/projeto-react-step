import {useState, useEffect} from 'react';

// Componente RelogioDigital
const RelogioDigital = () =>{
   const [horario, setHorario] = useState(new Date()); // Estado para armazenar o horário atual

   // useEffect para atualizar o horário a cada segundo
   useEffect(() => {
       const interval = setInterval(() => { // Atualiza o estado do horário a cada segundo
           setHorario(new Date()); // Atualiza o estado do horário com a hora atual
       }, 1000); // Intervalo de 1000ms (1 segundo)

       return () => clearInterval(interval); // Limpa o intervalo quando o componente é desmontado
   }, []);
    
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <h1>{horario.toLocaleTimeString()}</h1> 
        </div>
    );
};

export default RelogioDigital;