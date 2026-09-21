import "./index.css";
import { MyComposition } from "./Composition";
import { MuniswararComposition } from "./MuniswararReveal";
import { KaaliammanComposition } from "./KaaliammanReveal";
import { VectaComposition } from "./VectaFilm";
import { AvsecComposition } from "./AvsecTrainingVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <MyComposition />
      <MuniswararComposition />
      <KaaliammanComposition />
      <VectaComposition />
      <AvsecComposition />
    </>
  );
};
