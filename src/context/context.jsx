/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState(""); 
    const [prevPrompts, setPrevPrompts] = useState([]); 
    const [showResult, setShowResult] = useState(false); 
    const [loading,setLoading] = useState(false); 
    const [resultData, setResultData] = useState(""); 
    
    const delayPara = (index,nexWord) => {
       setTimeout(function (){
            setResultData(prev=>prev+nexWord);
       }, 75*index); 
    }

    const newChat = () => {
        setLoading(false)
        setShowResult(false)
    }

    const onSent = async (prompt) => {
        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response;
        if(prompt !== undefined){
            response = await run(prompt);
            setRecentPrompt(prompt)
        }
        else {
            setPrevPrompts(prev=>[...prev,input])
            setRecentPrompt(input)
            response = await run(input)
        }
        let responseArray = response.split("**");
        let newResponse ; 
        for(let i =0 ; i < responseArray.length; i++)
        {
            if(i === 0 || i%2 !== 1) {
                newResponse += responseArray[i];
            }
            else {
                newResponse += "<b>"+responseArray[i]+"</b>"; 
            }
        } 
        let newResponse2 = newResponse.split("*").join("</br>")
        let newResponseArray = newResponse2.split(" "); 
        for(let i=0; i<newResponseArray.length; i++)
        {
            const nextWord = newResponseArray[i];
            delayPara(i,nextWord+" ")
        }
        setLoading(false)
        setInput("")
    }

    
    const contextValue = {
        // Define any initial context values here
        prevPrompts,
        setPrevPrompts,
        onSent, 
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData, 
        input,
        setInput,
        newChat
    };

    return (
        <Context.Provider value={contextValue}>
            {/* eslint-disable-next-line react/prop-types */}
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
