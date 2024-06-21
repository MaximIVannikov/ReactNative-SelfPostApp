import React, { useCallback, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Platform } from 'react-native';
import { MainScreen } from '../screens/MainScreen';
import { PostScreen } from '../screens/PostScreen';
import { BookedScreen } from '../screens/BookedScreen';
import { AboutScreen } from '../screens/AboutScreen';
import { CreateScreen } from '../screens/CreateScreen';
import { THEME } from '../theme';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBooked } from '../store/actions/post';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const MaterialBottomTab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();

const navigatorOptions = {
	headerStyle: {
		backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff',
	},
	headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR,
};

function PostStackNavigator() {
	const dispatch = useDispatch();

	const toggle = useCallback(
		(id) => {
			dispatch(toggleBooked(id));
		},
		[dispatch]
	);

	// const booked = useSelector((state) => state.post.bookedPost.some((post) => post.id === postId));

	// useEffect(() => {
	// 	navigation.setParams({ booked });
	// }, [booked]);

	return (
		<Stack.Navigator screenOptions={navigatorOptions} initialRouteName="Main">
			<Stack.Screen
				name="Main"
				component={MainScreen}
				options={({ navigation }) => ({
					headerRight: () => (
						<HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
							<Item title="Take photo" iconName="camera" onPress={() => navigation.navigate('Create')} />
						</HeaderButtons>
					),
					headerLeft: () => (
						<HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
							<Item title="Toggle Drawer" iconName="menu" onPress={() => navigation.toggleDrawer()} />
						</HeaderButtons>
					),
				})}
			/>

			<Stack.Screen
				name="Post"
				component={PostScreen}
				options={({ route, navigation }) => ({
					title: `Post from ${new Date(route.params.postDate).toLocaleDateString()}`,
					headerRight: () => {
						const id = route.params.postId;
						const booked = useSelector((state) => state.post.allPosts.find((post) => post.id === id));

						const headerIcon = booked?.booked === true ? 'star' : 'star-outline';

						return (
							<HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
								<Item title="Take photo" iconName={headerIcon} onPress={() => toggle(id)} />
							</HeaderButtons>
						);
					},
				})}
			/>
		</Stack.Navigator>
	);
}

function BookedStackNavigator() {
	return (
		<Stack.Navigator screenOptions={navigatorOptions} initialRouteName="Booked">
			<Stack.Screen
				name="Booked"
				component={BookedScreen}
				options={({ navigation }) => ({
					title: 'Booked',
					headerLeft: () => (
						<HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
							<Item title="Toggle Drawer" iconName="menu" onPress={() => navigation.toggleDrawer()} />
						</HeaderButtons>
					),
				})}
			/>
			<Stack.Screen
				name="Post"
				component={PostScreen}
				options={({ route }) => ({
					title: `Post from ${new Date(route.params.postDate).toLocaleDateString()}`,
				})}
			/>
		</Stack.Navigator>
	);
}

function AboutNavigator() {
	return (
		<Stack.Navigator screenOptions={navigatorOptions} initialRouteName="About">
			<Stack.Screen
				name="About"
				component={AboutScreen}
				options={({ navigation }) => ({
					title: 'About',
					headerLeft: () => (
						<HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
							<Item title="Toggle Drawer" iconName="menu" onPress={() => navigation.toggleDrawer()} />
						</HeaderButtons>
					),
				})}
			/>
		</Stack.Navigator>
	);
}

function CreateNavigator() {
	return (
		<Stack.Navigator screenOptions={navigatorOptions} initialRouteName="Create">
			<Stack.Screen
				name="Create"
				component={CreateScreen}
				options={({ navigation }) => ({
					title: 'Create',
					headerLeft: () => (
						<HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
							<Item title="Toggle Drawer" iconName="menu" onPress={() => navigation.toggleDrawer()} />
						</HeaderButtons>
					),
				})}
			/>
		</Stack.Navigator>
	);
}

function BottomNavigator() {
	return Platform.OS === 'ios' ? (
		<Tab.Navigator
			screenOptions={{
				activeTintColor: THEME.MAIN_COLOR,
			}}
		>
			<Tab.Screen
				name="PostTab"
				component={PostStackNavigator}
				options={{
					tabBarLabel: 'All',
					headerShown: false,
					tabBarIcon: ({ color, size }) => <Ionicons name="albums" size={size} color={color} />,
				}}
			/>
			<Tab.Screen
				name="BookedTab"
				component={BookedStackNavigator}
				options={{
					tabBarLabel: 'Booked',
					headerShown: false,
					tabBarIcon: ({ color, size }) => <Ionicons name="star" size={size} color={color} />,
				}}
			/>
		</Tab.Navigator>
	) : (
		<MaterialBottomTab.Navigator shifting={true} initialRouteName="PostTab" activeColor={'#fff'} inactiveColor={'darkgrey'} barStyle={{ backgroundColor: THEME.MAIN_COLOR }}>
			<MaterialBottomTab.Screen
				name="PostTab"
				component={PostStackNavigator}
				options={{
					tabBarLabel: 'Posts',
					tabBarBadge: false,
					tabBarIcon: ({ color, size, focused }) => <Ionicons name="albums" size={24} color={focused ? THEME.MAIN_COLOR : 'darkgrey'} />,
				}}
			/>
			<MaterialBottomTab.Screen
				name="BookedTab"
				component={BookedStackNavigator}
				options={{
					tabBarLabel: 'Booked',
					tabBarColor: THEME.MAIN_COLOR,
					tabBarBadge: false,

					tabBarIcon: ({ color, size, focused }) => <Ionicons name="star" size={24} color={focused ? THEME.MAIN_COLOR : 'darkgrey'} />,
				}}
			/>
		</MaterialBottomTab.Navigator>
	);
}

export default function AppNavigation() {
	return (
		<NavigationContainer>
			<Drawer.Navigator
				screenOptions={{
					drawerActiveTintColor: THEME.MAIN_COLOR,
					drawerLabelStyle: {
						fontFamily: 'openSans-bold',
					},
				}}
			>
				<Drawer.Screen options={{ headerShown: false }} name="Main" component={BottomNavigator} />
				<Drawer.Screen options={{ headerShown: false }} name="About" component={AboutNavigator} />
				<Drawer.Screen options={{ headerShown: false }} name="Create" component={CreateNavigator} />
			</Drawer.Navigator>
		</NavigationContainer>
	);
}
