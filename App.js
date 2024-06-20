import { useState, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { bootstrap } from './src/bootstrap';
import { name as appName } from './app.json';
import AppNavigation from './src/navigation/AppNavigation';
import { AppRegistry } from 'react-native';

export default function App() {
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		async function prepare() {
			try {
				await bootstrap();
			} catch (e) {
				console.warn(e);
			} finally {
				setIsReady(true);
				SplashScreen.hideAsync();
			}
		}
		if (isReady === false) {
			prepare();
		}
	}, []);

	if (!isReady) {
		return null;
	}
	return <AppNavigation />;
}

AppRegistry.registerComponent(appName, () => AppNavigation);
