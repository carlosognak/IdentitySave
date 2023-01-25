import React, { useState } from 'react';
import { IonContent, IonHeader, IonIcon, IonLabel, IonPage, IonTabButton, IonTitle, IonToolbar, IonCol, IonGrid, IonRow, IonImg } from '@ionic/react';
import { ellipse } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import { textDetect } from '../helpers/textDetect';
import './Tab2.css';
import { subToPhoto, getPhotos } from '../usePhoto';


const Tab2: React.FC = () => {

  const [photos, setPhotos] = useState<any>(getPhotos());
  subToPhoto(setPhotos)
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Take a photo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Take a photo</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            {photos.map((photo: any, index: any) => (
              <IonCol size="6" key={index}>
                <IonImg src={photo.webviewPath} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        <IonTabButton tab="tab2" onClick={async () => {
          await textDetect('aze')
        }}>
          <IonIcon icon={ellipse} />
          <IonLabel>call textDetect function</IonLabel>
        </IonTabButton>
        <ExploreContainer name="Take a photo" />
      </IonContent>
    </IonPage>
  );
};
export default Tab2;
