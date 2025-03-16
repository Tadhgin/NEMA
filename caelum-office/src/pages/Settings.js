import React from "react";

import NavBar from "../components/NavBar";

import Footer from "../components/Footer";



function Settings() {

    return (

        <div>

            <NavBar />

            <main style={{ padding: "20px" }}>

                <h1>Settings</h1>

                <p>Manage system preferences here.</p>

            </main>

            <Footer />

        </div>

    );

}



export default Settings;