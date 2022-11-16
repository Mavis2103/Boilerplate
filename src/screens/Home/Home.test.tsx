import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import Home from "./Home";

test("adds 1 + 2 to equal 3", () => {
	expect(1 + 2).toBe(3);
});

test("renders correctly", () => {
	const tree = render(<Home />).toJSON();
	expect(tree).toMatchSnapshot();
});
