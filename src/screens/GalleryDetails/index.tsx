import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Dimensions, StyleSheet, View } from "react-native";
import { ProgressiveImage } from "../../shared/ProgressiveImage";

type GalleryDetailsProps = NativeStackScreenProps<RootStackParamList, "Details">;

export const GalleryDetailsScreen = ({ route }: GalleryDetailsProps) => {
    const { urls: { full, small } } = route.params.item;
    const { width } = Dimensions.get('window');

    return (
        <View style={styles.itemWrapperStyles}>
            <ProgressiveImage
                fullSource={{ uri: full }}
                smallSource={{ uri: small }}
                style={{ width: width - 10, height: width - 10 }}
                resizeMode="cover"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    itemWrapperStyles: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
});
