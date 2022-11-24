import BreadcrumbContext from "./BreadcrumbContext"
import Breadcrumbs from "./Breadcrumbs"

export default function BreadcrumbProvider({ children }) {
    const [breadcrumbs, setBreadcrumbs] = useState([])
    const providerValue = {
        setBreadcrumbs
    }

    return (
        <BreadcrumbContext.Provider value={providerValue}>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            {children}
        </BreadcrumbContext.Provider>
    )
}
