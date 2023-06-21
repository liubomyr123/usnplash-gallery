
import { NavigationContainer } from '@react-navigation/native';

export const withRouter = (component: () => React.ReactNode) => () => (
    <NavigationContainer>
        {component()}
    </NavigationContainer>
);