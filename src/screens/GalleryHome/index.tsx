import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button } from "react-native";
import { useSelector } from "react-redux";

type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;

export const GalleryHomeScreen = ({ navigation }: HomeProps) => {
    const galleryList = useSelector((state: RootState) => state.galleryList);
    console.log('galleryList', galleryList);

    return (
        <Button
            title="Open image details"
            onPress={() =>
                navigation.navigate('Details', { name: 'Ja234ne' })
            }
        />
    );
};