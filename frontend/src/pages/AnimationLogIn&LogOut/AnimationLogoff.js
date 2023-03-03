import React from "react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { useNavigate } from "react-router-dom";

function AnimationLogoff() {
    let navigate = useNavigate();
    return (
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
        <Player
          onEvent={event => {
            if (event === 'complete') navigate("/login/"); // check event type and do something
          }}
          autoplay
          speed={0.4}
          src="https://assets1.lottiefiles.com/packages/lf20_3dtypvor.json"
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

export default AnimationLogoff