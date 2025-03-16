import React from "react";

import NavBar from "../components/NavBar";

import Footer from "../components/Footer";



function Logs() {

    return (

        <div>

            <NavBar />

            <main style={{ padding: "20px" }}>

                <h1>System Logs</h1>

                <p>Here we’ll display real-time logs of AI interactions.</p>

            </main>

            <Footer />

        </div>

    );

}



export default Logs;