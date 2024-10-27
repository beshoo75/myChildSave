import { useLocation } from "react-router-dom"
import UserForm from "./forms/user_form"

const RegisterParent = () => {
    const location = useLocation()

    return (
        <UserForm userID={location.state?.id} isStaff={location.state?.staff} isReadOnly={location.state?.readOnly} />
    )
}

export default RegisterParent