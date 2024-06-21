import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { THEME } from '../theme';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { addPost } from '../store/actions/post';
import PhotoPicker from '../components/PhotoPicker';

export const CreateScreen = ({ navigation }) => {
	const [text, setText] = useState('');
	const [image, setImage] = useState(null);
	const dispatch = useDispatch();
	const saveHandler = () => {
		const post = {
			date: new Date().toJSON(),
			text: text,
			img: image,
			booked: false,
		};
		dispatch(addPost(post));
		setText('');
		setImage(null);
		navigation.navigate('Main');
	};
	return (
		<ScrollView>
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
				<View style={styles.wrapper}>
					<Text style={styles.title}>Create New Post</Text>
					<TextInput style={styles.textarea} placeholder="Type here..." value={text} onChangeText={setText} multiline />
					{/* <Image
						style={{ width: '100%', height: 200, marginBottom: 10 }}
						source={{
							uri: img,
						}}
					/> */}
					<PhotoPicker image={image} setImage={setImage} />
					<Button title="Create post" color={THEME.MAIN_COLOR} onPress={saveHandler} disabled={!text || !image} />
				</View>
			</TouchableWithoutFeedback>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		padding: 10,
	},
	title: {
		fontSize: 20,
		textAlign: 'center',
		fontFamily: 'openSans-regular',
		marginVertical: 10,
	},
	textarea: {
		padding: 10,
		marginBottom: 10,
	},
});
