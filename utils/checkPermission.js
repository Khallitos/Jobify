import { UnauthenticatedError } from "../errors/index.js";

const checkPermissions = (requestUser ,resourceUserId)=>{
    if(requestUser.userId === resourceUserId.toString()) return

    throw new UnauthenticatedError("Not authorised to access this route")
    return
}

export default checkPermissions