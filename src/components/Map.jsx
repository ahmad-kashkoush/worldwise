import { useNavigate, useSearchParams } from 'react-router-dom';
import style from './Map.module.css'
export default function Map(){
    const navigate=useNavigate();
    const [searchParams, setSearchParams]=useSearchParams();
    const lat=searchParams.get("lat");
    const lng=searchParams.get("lng");
    return (
        <div className={style.mapContainer} onClick={()=>navigate("form")}>
          <h1>{lat}</h1> 
          <h1>{lng}</h1> 
        </div>
    );
}