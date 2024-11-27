import { createContext, useState } from "react";

export const CounterContext=createContext(null);

export const CounterProvider=(props)=>{
    let[count,setCount]=useState(0);
    let[subcount,setSubCount]=useState(0);
    let[log,setLog]=useState(1);
    let[search,setSearch]=useState(true);
    return(
        <CounterContext.Provider value={{count,setCount,subcount,setSubCount,log,setLog,search,setSearch}}>
            {props.children}
        </CounterContext.Provider>
    );
}