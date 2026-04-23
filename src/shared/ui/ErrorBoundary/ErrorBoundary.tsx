import type { ErrorInfo, ReactNode } from "react";
import { Component } from "react";

type ErrorBoundaryFallbackProps = {
    error: Error;
    reset: () => void;
};

type ErrorBoundaryProps = {
    children: ReactNode;
    fallback: ReactNode | ((props: ErrorBoundaryFallbackProps) => ReactNode);
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
    resetKeys?: unknown[];
};

type ErrorBoundaryState = {
    error: Error | null;
};

const didResetKeysChange = (
    prevResetKeys: unknown[] = [],
    nextResetKeys: unknown[] = [],
) => {
    if (prevResetKeys.length !== nextResetKeys.length) {
        return true;
    }

    return nextResetKeys.some((resetKey, index) => {
        return !Object.is(resetKey, prevResetKeys[index]);
    });
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    public state: ErrorBoundaryState = {
        error: null,
    };

    public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.props.onError?.(error, errorInfo);
    }

    public componentDidUpdate(prevProps: Readonly<ErrorBoundaryProps>) {
        if (
            this.state.error !== null &&
            didResetKeysChange(prevProps.resetKeys, this.props.resetKeys)
        ) {
            this.reset();
        }
    }

    private reset = () => {
        this.setState({ error: null });
    };

    public render() {
        const { children, fallback } = this.props;
        const { error } = this.state;

        if (error === null) {
            return children;
        }

        if (typeof fallback === "function") {
            return fallback({ error, reset: this.reset });
        }

        return fallback;
    }
}

export default ErrorBoundary;
