import * as React from "react";

const Header = React.lazy(() => import("./Header"));

const Layout = ({ children }) => {
	return (
		<div>
			<React.Suspense fallback={null}>
				<Header />
			</React.Suspense>
			<main>{children}</main>
		</div>
	)
}

export default Layout
