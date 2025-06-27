import {
  ButtonProps,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";

type Props = {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

const Button: React.FC<Props> = ({ title, onPress, style, textStyle }) => {
  return (
    <View>
      <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#74C044",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
