
export default function useBreadcrumbs() {
    const { setBreadcrumbs } = useContext(BreadcrumbContext)
    return setBreadcrumbs
}
