import SessionTimeoutProvider from "@/components/SessionTimeoutProvider";
import AppRouter from "@/router";

export default function App() {
  return (
    <SessionTimeoutProvider>
      <AppRouter />
    </SessionTimeoutProvider>
  );
}
