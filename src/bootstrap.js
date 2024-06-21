import * as Font from 'expo-font';
import { DB } from './db';

export async function bootstrap() {
	try {
		await Font.loadAsync({
			'openSans-bold': require('../assets/fonts/OpenSans-Bold.ttf'),
			'openSans-regular': require('../assets/fonts/OpenSans-Regular.ttf'),
		});
		await DB.init();
		console.log('Database started ...');
	} catch (error) {
		console.log(error);
	}
}
