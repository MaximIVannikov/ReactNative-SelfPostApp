import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PostList } from '../components/PostList';
import { loadPosts } from '../store/actions/post';

export const BookedScreen = ({ navigation }) => {
	// const dispatch = useDispatch();
	// useEffect(() => {
	// 	dispatch(loadPosts());
	// }, [dispatch]);

	const bookedPosts = useSelector((state) => state.post.bookedPosts);
	const openPostHandler = (post) => {
		navigation.navigate('Post', { postId: post.id, postText: post.text, postDate: post.date, postBooked: post.booked });
	};
	return <PostList data={bookedPosts} onOpen={openPostHandler} />;
};
