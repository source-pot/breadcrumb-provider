import { useEffect } from "react";
import Breadcrumb from "./Breadcrumb";
import BreadcrumbProvider from "./BreadcrumbProvider";
import useBreadcrumbs from "./useBreadcrumbs";

function DemoApp() {
    const setBreadcrumbs = useBreadcrumbs()

    useEffect(() => {
        setBreadcrumbs([
            <Breadcrumb text="Home" link="/" />,
            <Breadcrumb text="Articles" link="/articles" />
        ])
    })
}

export default function App() {
    return (
        <BreadcrumbProvider>
            <DemoApp />
        </BreadcrumbProvider>
    )
}
