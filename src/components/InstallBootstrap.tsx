'use client'

import React, { useEffect } from 'react'
import '../bootsrapSetup/css/bootstrap.min.css'
import '../bootsrapSetup/css/icons.min.css'
import '../bootsrapSetup/css/theme.min.css'

export default function InstallBootstrap() {

    useEffect(()=>{
        // @ts-ignore
        import("bootstrap/dist/js/bootstrap.bundle.js")
    },[])
  return (
    <></>
  )
}
