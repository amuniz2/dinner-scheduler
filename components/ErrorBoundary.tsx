import React, { Component, ErrorInfo, ReactNode } from "react";
import { BaseMealProps } from "./interfaces/MealProps";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  children?: ReactNode;
  meal?: BaseMealProps;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;

}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
        error: error,
        errorInfo: errorInfo
    });
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (<View style={styles.error}><h1>Error</h1>
      <Text>{this.props.meal?.name}</Text>
      </View>);
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
    error: {
    backgroundColor: '##D4E6F1',
    color: '#ff0000',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16}}
);

export default ErrorBoundary;
