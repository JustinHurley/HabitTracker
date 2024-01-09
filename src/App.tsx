import { GlobalProvider } from './components/State/State';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { settingsSharp, addCircleSharp, statsChartSharp } from 'ionicons/icons';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { Suspense, lazy } from 'react';
import Loading from './pages/Loading';


setupIonicReact();

const Add = lazy(() => import('./pages/Add'));
const Stats = lazy(() => import('./pages/Stats'));
const Settings = lazy(() => import('./pages/Settings'));

const App: React.FC = () => {
  return (
    <IonApp>
      <GlobalProvider>
        <IonReactRouter>
          <Suspense fallback={<Loading/>}>
            <IonTabs>
              <IonRouterOutlet>
                <Route exact path='/add'>
                  <Add />
                </Route>
                <Route exact path='/settings'>
                  <Settings />
                </Route>
                <Route exact path='/stats'>
                  <Stats/>
                </Route>
                <Route exact path='/'>
                  <Redirect to="/add" />
                </Route>
              </IonRouterOutlet>
              <IonTabBar slot='bottom'>
                <IonTabButton tab='stats' href='/stats'>
                  <IonIcon icon={statsChartSharp}/>
                  <IonLabel>Stats</IonLabel>
                </IonTabButton>
                <IonTabButton tab='add' href='/add'>
                  <IonIcon icon={addCircleSharp}/>
                  <IonLabel>Add</IonLabel>
                </IonTabButton>
                <IonTabButton tab='settings' href='/settings'>
                  <IonIcon icon={settingsSharp}/>
                  <IonLabel>Settings</IonLabel>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          </Suspense>
        </IonReactRouter>
      </GlobalProvider>
    </IonApp>
  )
};

export default App;
