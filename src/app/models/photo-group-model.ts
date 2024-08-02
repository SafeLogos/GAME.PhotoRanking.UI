import { PhotoModel } from "./photo-model";

export interface PhotoGroupModel {
    id: string;
    title: string;
    color: string;

    photos: PhotoModel[];
}
