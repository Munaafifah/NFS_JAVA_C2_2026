import AppHeader from "./AppHeader";

export default function Layout({ children }) {
  return (
    <div className="app-shell">
      <AppHeader />
      <main>{children}</main>
    </div>
  );
}