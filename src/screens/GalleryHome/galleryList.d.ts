type UnsplashResults = {
    alt_description: string,
    urls: {
        small: string,
        full: string,
        regular: string,
        raw: string,
        thumb: string,
    },
    id: string,
    width: number,
    height: number,
    user: {
        first_name: string,
        last_name: string
    },
};

type UnsplashResponce = {
    total: number,
    total_pages: number,
    results: UnsplashResults[]
}

type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;
