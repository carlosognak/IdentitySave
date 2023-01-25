import { useState, useEffect } from 'react';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

let photos: any = []
let allCbFun: any = []
export const takePhoto = async () => {

  const photo = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
    source: CameraSource.Camera,
    quality: 100,
  });

  const fileName = new Date().getTime() + '.jpeg';
  const newPhotos = [
    {
      filepath: fileName,
      webviewPath: photo.webPath,
    },
    ...photos,
  ];

  photos = newPhotos

  for (let index = 0; index < allCbFun.length; index++) {
    allCbFun[index](photos)
  }
};
export const subToPhoto = (cbFunction: any) => {
  allCbFun.push(cbFunction)
}

export const getPhotos = () => {
  return photos
}
export interface UseFile {
  filepath: string;
  webviewPath?: string;
}