import React from "react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { useNavigate } from "react-router-dom";

// Deprecated 404 page

function Error404() {
    let navigate = useNavigate();
    return (
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
        <Player
          onEvent={event => {
            if (event === 'complete') navigate("/dash/"); // check event type and do something
          }}
          autoplay
          speed={1}
          src="https://assets3.lottiefiles.com/packages/lf20_suhe7qtm.json"
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

export default Error404