import React,{useState,Fragment} from 'react'
import {Route} from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"

const HomeTemplateRendering =props=>{
    return (
        <Fragment>
            <Header/>
            {props.children}
            <Footer/>
        </Fragment>
    )
}

export default function HomeTemplate({Component,...props}) {
    return (
        <Route
        {...props}
        render={propsComponent =>(
            <HomeTemplateRendering>
                <Component {...propsComponent}/>
            </HomeTemplateRendering>
        )}
        />
    )
}
