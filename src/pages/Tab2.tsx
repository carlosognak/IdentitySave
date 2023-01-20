import { IonContent, IonHeader, IonIcon, IonLabel, IonPage, IonTabButton, IonTitle, IonToolbar } from '@ionic/react';
import { ellipse } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import { textDetect } from '../helpers/textDetect';
import './Tab2.css';

const Tab2: React.FC = () => {
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
