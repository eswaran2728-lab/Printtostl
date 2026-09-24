import React from "react";
import { AbsoluteFill } from "remotion";
export const OpeningTitle: React.FC = () => {
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div style={{position:"absolute",bottom:"14%",left:0,right:0,textAlign:"center",background:"red"}}>
        <div style={{fontFamily:"'Noto Sans Tamil'",fontSize:64,color:"white"}}>நீ போன பின்னே</div>
      </div>
    </AbsoluteFill>
  );
};
