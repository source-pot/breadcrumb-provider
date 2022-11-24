import { Link } from "react-router-dom"

export default function Breadcrumb({ text, link }) {
    if (link !== undefined) {
        return <li><Link to={link}>{text}</Link></li>
    }

    return <li>{text}</li>
}
