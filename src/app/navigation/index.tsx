import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { GalleryDetailsScreen, GalleryHomeScreen } from '../../screens';

const GalleryStack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
    return (
        <GalleryStack.Navigator>
            <GalleryStack.Screen name="Home" component={GalleryHomeScreen} options={{ title: 'Unsplash Gallery' }} />
            <GalleryStack.Screen name="Details" component={GalleryDetailsScreen} options={{ title: 'Image Details' }} />
        </GalleryStack.Navigator>
    );
};