import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Home from "../components/Home";
import Profile from "../components/Profile";
const screens = {
    Home: {
        screen: Home,
    },
    Profile: {
        screen: Profile,
        navigationOptions: {
            headerLeft: () => null
        }

    },
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);