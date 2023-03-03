import React from "react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

import jwt_decode from "jwt-decode"


function AnimationLogin() {
  let navigate = useNavigate();
  let token = sessionStorage.getItem("access");
  let decoded = jwt_decode(token)
  sessionStorage.setItem("userId", decoded.user_id);    
  sessionStorage.setItem("roleId", decoded.role);
  sessionStorage.setItem("section", decoded.course);
  
  return (
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
      <Player
        onEvent={event => {
          if (event === 'complete') navigate("/dash/"); // check event type and do something
        }}
        autoplay
        speed={1.3}
        src="https://assets4.lottiefiles.com/packages/lf20_qf1pt6ua.json"
        style={{ height: "300px", width: "300px" }}
      >
        <Controls
          visible={false}
          buttons={["play", "repeat", "frame", "debug"]}
        />
      </Player>
    </div>
  );
}

export default AnimationLogin;
