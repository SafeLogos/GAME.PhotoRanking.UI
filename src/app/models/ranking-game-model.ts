import { PhotoGroupModel } from "./photo-group-model";
import { PhotoModel } from "./photo-model";
import { RankingLayerModel } from "./ranking-layer-model";

export interface RankingGameModel {
    id: string;
    date: Date;
    group: PhotoGroupModel;
    layers: RankingLayerModel[]
    winner: PhotoModel | null;
}
