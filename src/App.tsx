// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import i18next from "i18next"; 
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
// import { Layout } from "@/app/shell/layout";


  function App() {
    const { i18n } = useTranslation();
  
    useEffect(() => {
      const dir = i18n.language === "ar" ? "rtl" : "ltr";
      document.documentElement.setAttribute("dir", dir);
    }, [i18n.language]);
  
  return (
    <>
   
    </>
  )
}

export default App
