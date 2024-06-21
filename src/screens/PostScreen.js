import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button, ScrollView, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { THEME } from '../theme';
import { useDispatch, useSelector } from 'react-redux';
import { removePost } from '../store/actions/post';

export const PostScreen = ({ navigation }) => {
	const route = useRoute();
	const { postId } = route.params;

	const dispatch = useDispatch();

	const post = useSelector((state) => state.post.allPosts.find((p) => p.id === postId));

	const removeHandler = () => {
		Alert.alert('Deleting post', 'Are you sure you want delete post ?', [
			{
				text: 'Cancel',
				style: 'cancel',
			},
			{
				text: 'Delete',
				style: 'destructive',
				onPress: () => {
					dispatch(removePost(postId));
					navigation.navigate('Main');
				},
			},
		]);
	};
	if (!post) {
		return null;
	}

	return (
		<ScrollView>
			<Image source={{ uri: post.img }} style={styles.image} />
			<View style={styles.textWrap}>
				<Text style={styles.title}>{post.text}</Text>
			</View>
			<Button title="Delete" color={THEME.DANGER_COLOR} onPress={removeHandler} />
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	image: {
		width: '100%',
		height: 200,
	},

	textWrap: {
		padding: 10,
	},
	title: {
		fontFamily: 'openSans-regular',
	},
});
