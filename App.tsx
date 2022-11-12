import { Provider } from "react-redux";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer, LinkingOptions } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import store from "./src/stores";
import { RouteConfig, RouteWebConfig } from "./src/configs/routeConfig";

export default function App() {
	const linking: any = {
		prefixes: [
			/* your linking prefixes */
			// 'mychat://',
			// 'https://mychat.com',
			// 'https://*.mychat.com'
		],
		config: {
			screens: {
				...RouteWebConfig,
			},
			/* configuration for matching screens with paths */
		},
	};
	return (
		<SafeAreaProvider>
			<NativeBaseProvider>
				<Provider store={store}>
					<NavigationContainer linking={linking}>
						<SafeAreaView style={{ flex: 1 }}>
							<RouteConfig />
						</SafeAreaView>
					</NavigationContainer>
				</Provider>
			</NativeBaseProvider>
		</SafeAreaProvider>
	);
}
