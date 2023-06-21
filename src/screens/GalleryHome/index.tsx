import { ACCESS_KEY } from "@env";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
// import { useSelector } from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome';
import { ProgressiveImage } from "../../shared/ProgressiveImage";

type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;

export const GalleryHomeScreen = ({ navigation }: HomeProps) => {
    // const galleryList = useSelector((state: RootState) => state.galleryList);
    // console.log('galleryList', galleryList);
    const [users, setUsers] = useState<any>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    // https://www.freecodecamp.org/news/how-to-make-an-image-search-app-in-react/
    // https://unsplash.com/documentation#search-photos
    const getUsers = async () => {
        setIsLoading(true);
        const data = await fetch(`https://api.unsplash.com/search/photos?&page=${currentPage}&query=tesla&client_id=${ACCESS_KEY}`);
        const dataJ = await data.json();
        const result = dataJ.results.map(({ alt_description, urls, id, width, height, user: { first_name, last_name } }: any) => ({
            height,
            user: { first_name, last_name },
            width,
            id,
            urls,
            alt_description
        }));
        setUsers((prev: any) => [
            ...prev,
            ...result
        ]);
        setIsLoading(false)
    };

    const renderItem = ({ item }: any) => {
        const { alt_description, urls: { small }, user: { first_name, last_name }, id } = item;
        const { width } = Dimensions.get('window');

        return (
            <View style={styles.itemWrapperStyles}>
                <ProgressiveImage
                    fullSource={{ uri: small }}
                    smallSource={{ uri: small }}
                    style={{ width: width / 6, height: width / 6 }}
                    resizeMode="cover"
                />
                <View style={styles.contentWrapperStyles}>
                    <Text style={styles.txtName}>{`${first_name} ${last_name}`}</Text>
                    <Text style={styles.txtEmail} numberOfLines={1}>{alt_description}</Text>
                </View>
                <View style={styles.openImageWrapperStyles}>
                    <Icon style={styles.openImage} name="external-link" size={20} color="#000"
                        onPress={() =>
                            navigation.navigate('Details', { item })
                        }
                    />
                </View>
            </View>
        );
    };

    const renderLoader = () => {
        if (!isLoading) return null;
        return (
            <View style={styles.loaderStyles}>
                <ActivityIndicator size={'large'} color={'#aaa'} />
            </View>
        );
    };

    const loadMoreItems = () => {
        setCurrentPage((prev) => prev + 1);
    }

    useEffect(() => {
        getUsers();
    }, [currentPage]);

    return (
        <FlatList
            data={users}
            renderItem={renderItem}
            keyExtractor={(_, index) => String(index)}
            ListFooterComponent={renderLoader}
            onEndReached={loadMoreItems}
            onEndReachedThreshold={0}
        />
    );
};

const styles = StyleSheet.create({
    itemWrapperStyles: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderBottomWidth: 1,
        justifyContent: 'space-around',
        borderColor: '#ddd',
    },
    itemImageStyles: {
        width: 50,
        height: 50,
        marginRight: 16,
    },
    contentWrapperStyles: {
        width: '70%',
    },
    txtName: {
        fontSize: 18,
    },
    txtEmail: {
        color: '#777',
        flex: 1,
    },
    loaderStyles: {
        marginVertical: 16,
        alignItems: 'center',
    },
    openImageWrapperStyles: {
        justifyContent: 'center'
    },
    openImage: {}
});
