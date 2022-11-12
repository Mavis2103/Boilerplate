import { Box, Button, Text } from "native-base";
import { Link } from "@react-navigation/native";

const Auth = () => {
	return (
		<Box flex={1} bg="blue.400" alignItems="center" justifyContent="center">
			<Link to={{ screen: "Main" }}>Main</Link>
		</Box>
	);
};

export default Auth;
