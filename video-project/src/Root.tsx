import "./index.css";
import { MyComposition } from "./Composition";
import { MuniswararComposition } from "./MuniswararReveal";
import { KaaliammanComposition } from "./KaaliammanReveal";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <MyComposition />
      <MuniswararComposition />
      <KaaliammanComposition />
    </>
  );
};
