import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text } from "react-native";
import { useSelector } from "react-redux";

type GalleryDetailsProps = NativeStackScreenProps<RootStackParamList, "Details">;

export const GalleryDetailsScreen = ({ route }: GalleryDetailsProps) => {
    const currentImage = useSelector((state: RootState) => state.currentImage);
    console.log('currentImage', currentImage)

    return (
        <Text>
            This is {route.params?.['name']}'s profile
        </Text>
    );
};