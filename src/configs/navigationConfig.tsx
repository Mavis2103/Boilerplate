import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import Home from "screens/Home/Home";
import Setting from "screens/Setting/Setting";

const BottomTab = createMaterialBottomTabNavigator();

const NavigationConfig = () => {
	return (
		<BottomTab.Navigator>
			<BottomTab.Screen name="Home" component={Home} />
			<BottomTab.Screen name="Setting" component={Setting} />
		</BottomTab.Navigator>
	);
};

const NavigationWebConfig = {
	Home: "/",
	Setting: "/setting",
};

export { NavigationConfig, NavigationWebConfig };
