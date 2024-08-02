import { RankingResult } from "./ranking-result";

export interface RankingLayerModel {
    results: RankingResult[];
    finished: boolean;
}
