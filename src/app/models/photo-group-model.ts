import { PhotoModel } from "./photo-model";

export interface PhotoGroupModel {
    id: string | null;
    title: string;
    color: string;

    photos: PhotoModel[];
}
