import { useState } from 'react';
import { Button, Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function PhotoPicker({ image, setImage }) {
	const [facing, setFacing] = useState('back');
	const [permission, requestPermission] = useCameraPermissions();
	if (!permission) {
		// Camera permissions are still loading.
		return <View />;
	}

	if (!permission.granted) {
		// Camera permissions are not granted yet.
		return (
			<View style={styles.container}>
				<Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
				<Button onPress={requestPermission} title="grant permission" />
			</View>
		);
	}

	function toggleCameraFacing() {
		setFacing((current) => (current === 'back' ? 'front' : 'back'));
	}

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		// let result = await ImagePicker.launchImageLibraryAsync({
		let result = await ImagePicker.launchCameraAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		console.log(result);

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};

	// return (
	// 	<View style={styles.container}>
	// 		<CameraView style={styles.camera} facing={facing}>
	// 			<View style={styles.buttonContainer}>
	// 				<TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
	// 					<Text style={styles.text}>Flip Camera</Text>
	// 				</TouchableOpacity>
	// 			</View>
	// 		</CameraView>
	// 	</View>
	// );

	return (
		<View style={styles.wrapper}>
			<Button title="Pick an image from camera roll" onPress={pickImage} />
			{image && <Image source={{ uri: image }} style={styles.image} />}
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		marginBottom: 10,
	},
	image: {
		width: '100%',
		height: 200,
		marginTop: 10,
	},

	container: {
		flex: 1,
		justifyContent: 'center',
	},
	camera: {
		flex: 1,
	},
	buttonContainer: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: 'transparent',
		margin: 64,
	},
	button: {
		flex: 1,
		alignSelf: 'flex-end',
		alignItems: 'center',
	},
	text: {
		fontSize: 24,
		fontWeight: 'bold',
		color: 'white',
	},
});
