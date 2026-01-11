import { Popover, Button } from "antd"
import CustomAvatar from "../custom-avatar"
import { useGetIdentity } from "@refinedev/core"
import type { User } from '@/graphql/schema.types'


const CurrentUser = () => {
    const { data: user } = useGetIdentity<User>()

    return (
        <>
            <Popover
                trigger="click"
                placement="bottomRight"
                zIndex={999}
            >
                <CustomAvatar />
            </Popover>
        </>
    )
}

export default CurrentUser