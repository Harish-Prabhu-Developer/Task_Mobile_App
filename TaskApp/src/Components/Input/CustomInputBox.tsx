import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, TextInputProps } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

type CustomInputBoxProps = {
    iconName: string;
    keyboardComplete?: TextInputProps['autoComplete'];
    cursorColor?: string;
    iconSize?: number;
    error?: boolean;
    iconColor?: string;
    eyeiconSize?: number;
    eyeiconColor?: string;
    placeholder?: string;
    isPassword?: boolean;
    value?: string;
    onChangeText?: (text: string) => void;
};

const CustomInputBox: React.FC<CustomInputBoxProps> = ({
    iconName,
    keyboardComplete,
    cursorColor,
    iconSize = 20,
    error,
    iconColor = '#000',
    eyeiconSize = 20,
    eyeiconColor = '#000',
    placeholder,
    isPassword = false,
    value,
    onChangeText,
}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <View style={styles.container}>
            <Icon name={iconName} size={iconSize} color={iconColor} style={{ marginRight: 10 }} />
            <TextInput
                style={[styles.input, error && styles.errorInput]}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={isPassword && !isPasswordVisible}
                cursorColor={cursorColor}
                autoComplete={keyboardComplete}
            />
            {isPassword && (
                <TouchableOpacity onPress={togglePasswordVisibility}>
                    <Icon
                        name={isPasswordVisible ? 'eye' : 'eye-slash'}
                        size={eyeiconSize}
                        color={eyeiconColor}
                        style={{ marginLeft: 10 }}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: "#FFB000",
        borderRadius: 8,
        fontSize:14,
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: "#F8F8F8",
    },
    input: {
        flex: 1,
    },
    errorInput: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        marginTop: 5,
    },
});

export default CustomInputBox;
