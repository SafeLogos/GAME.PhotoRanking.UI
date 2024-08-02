import { PhotoModel } from "./photo-model";

export interface RankingResult {
    challengerA: PhotoModel;
    challengerB: PhotoModel;
    winner: PhotoModel | null;
}
