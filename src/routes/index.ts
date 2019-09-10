import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import LandingScreen from "../screens/landing_screen";
import PlaceDetailsScreen from "../screens/place_details_screen";
import InterestsScreen from "../screens/interests_screen"

const RootStack = createStackNavigator(
    {
        Landing: LandingScreen,
        Details: PlaceDetailsScreen,
        Interests: InterestsScreen
    },
    {
        initialRouteName: 'Landing',
    }
);

const AppContainer = createAppContainer(RootStack);

export default AppContainer;
