import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Button, Dimensions, FlatList, ListRenderItemInfo, RefreshControl, StyleSheet, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

import { ProgressiveImage } from "../../shared/ProgressiveImage";
import { useGetImagesByPageAndQueryQuery, useLazyGetImagesByPageAndQueryQuery } from "./api";

const { width } = Dimensions.get('window');

export const GalleryHomeScreen = ({ navigation }: HomeProps) => {
    const [users, setUsers] = useState<UnsplashResults[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [refreshing, setRefreshing] = useState(false);
    const [isError, setIsError] = useState(false);

    const { data, error, isFetching } = useGetImagesByPageAndQueryQuery({ currentPage });
    const [trigger] = useLazyGetImagesByPageAndQueryQuery()

    const renderItem = ({ item }: ListRenderItemInfo<UnsplashResults>) => {
        const { alt_description, urls: { small }, user: { first_name, last_name } } = item;

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
                    <Icon style={styles.openImage}
                        name="external-link"
                        size={20}
                        color="#000"
                        onPress={() => navigation.navigate('Details', { item })}
                    />
                </View>
            </View>
        );
    };

    const renderLoader = () => {
        if (!isFetching) return null;
        return (
            <View style={styles.loaderStyles}>
                <ActivityIndicator size={'large'} color={'#aaa'} />
            </View>
        );
    };

    const loadMoreItems = () => setCurrentPage((prev) => prev + 1);

    const manualFetch = async () => {
        setIsError(false);
        try {
            const payload = await trigger({ currentPage: 1 }).unwrap();
            setUsers(payload);
        } catch (error) {
            setIsError(true);
        }
    }

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await manualFetch();
        setRefreshing(false);
    }, [refreshing]);

    useEffect(() => {
        if (!isFetching && !error) {
            setUsers((prev: UnsplashResults[]) => [...prev, ...data || []]);
        };
    }, [data]);

    if (isError || error) {
        return (
            <View style={styles.errorWrapperStyles}>
                <Text style={styles.error}>Oops... Press below to refresh</Text>
                <Icon style={styles.refreshErrorIcon}
                    name="refresh"
                    size={30}
                    color="#000"
                    onPress={manualFetch}
                />
            </View>
        )
    }
    return (
        <FlatList
            data={users}
            renderItem={renderItem}
            keyExtractor={(_, index) => String(index)}
            ListFooterComponent={renderLoader}
            onEndReached={loadMoreItems}
            onEndReachedThreshold={0}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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
    openImage: {},
    errorWrapperStyles: {
        margin: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    error: {
        color: 'red',
    },
    refreshErrorIcon: {
        marginTop: 10,
    }
});
