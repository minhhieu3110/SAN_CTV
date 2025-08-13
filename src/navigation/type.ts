import { NativeStackScreenProps } from "@react-navigation/native-stack";
export type RootStackParamList ={
    Onboarding:undefined;
    Login:undefined;
    Register:undefined;
}
export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;