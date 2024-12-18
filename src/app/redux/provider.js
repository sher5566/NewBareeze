"use client"; // Marks this as a Client Component in Next.js

import { Provider } from "react-redux";
import store from "./store";

/**
 * @component ReduxProvider
 * @description A wrapper component that provides Redux store access to the application.
 * Implements Redux's Provider component for state management integration.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components that will have access to Redux store
 *
 * @example
 * // Usage in app layout or root component
 * <ReduxProvider>
 *   <App />
 * </ReduxProvider>
 *
 * @returns {JSX.Element} Redux Provider wrapper component
 */
export default function ReduxProvider({ children }) {
  // Wrap children with Redux Provider component, passing the configured store
  return <Provider store={store}>{children}</Provider>;
}
