import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import App from "./App";

test("renders correctly", () => {
	const tree = render(<App />).toJSON();
	expect(tree).toMatchSnapshot();
});
