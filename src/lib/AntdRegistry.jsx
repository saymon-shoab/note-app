'use client'

import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs'
import Entity from '@ant-design/cssinjs/lib/Cache'
import { useServerInsertedHTML } from 'next/navigation'
import react, { useMemo } from 'react'



const StyleComponentsRegistry = ({children})=>{
    const cache = useMemo<Entity>(()=> createCache(),[]);
    useServerInsertedHTML(()=>(
        <style id='antd' dangerouslySetInnerHTML={{__html: extractStyle(cache,true)}}/>
    ));
    return <StyleProvider cache={cache}>{children}</StyleProvider>
}

export default StyleComponentsRegistry