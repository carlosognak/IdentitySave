import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, IonGrid, IonRow, IonCol, IonImg, IonActionSheet, } from '@ionic/react';
//import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { camera, trash, close } from 'ionicons/icons';
import { usePhoto } from '../usePhoto';


const Tab1: React.FC = () => {
  const { takePhoto } = usePhoto();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Scaner ma carte</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Scaner ma carte</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => takePhoto()}>
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
