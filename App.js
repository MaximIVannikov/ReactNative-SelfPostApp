import { useState, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { bootstrap } from './src/bootstrap';
import AppNavigation from './src/navigation/AppNavigation';
import { Provider } from 'react-redux';
import store from './src/store';

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
	return (
		<Provider store={store}>
			<AppNavigation />
		</Provider>
	);
}
