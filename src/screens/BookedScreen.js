import React from 'react';
import { DATA } from '../data';
import { PostList } from '../components/PostList';

export const BookedScreen = ({ navigation }) => {
	const openPostHandler = (post) => {
		navigation.navigate('Post', { postId: post.id, postText: post.text, postDate: post.date, postBooked: post.booked });
	};
	return <PostList data={DATA.filter((p) => p.booked)} onOpen={openPostHandler} />;
};
