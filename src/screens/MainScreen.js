import React, { useEffect } from 'react';
import { PostList } from '../components/PostList';
import { useDispatch, useSelector } from 'react-redux';
import { loadPosts } from '../store/actions/post';

export const MainScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(loadPosts());
	}, [dispatch]);

	const allPosts = useSelector((state) => state.post.allPosts);

	const openPostHandler = (post) => {
		navigation.navigate('Post', { postId: post.id, postText: post.text, postDate: post.date, postBooked: post.booked });
	};
	return <PostList onOpen={openPostHandler} data={allPosts} />;
};
