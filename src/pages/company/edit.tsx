import CustomAvatar from "@/components/custom-avatar"
import { UPDATE_COMPANY_MUTATION } from "@/graphql/mutation"
import { getNameInitials } from "@/utilities"
import { Edit, useForm } from "@refinedev/antd"
import { Col, Form, Row } from "antd"

const EditPage = () => {
    const { saveButtonProps, formProps, formLoading, queryResult } = useForm({
        redirect: false,
        meta: {
            gqlMutation: UPDATE_COMPANY_MUTATION
        }
    })

    console.log(queryResult)

    const { avatarUrl, name } = queryResult?.data?.data || {}

    return (
        <div>
            <Row gutter={[32, 32]}>
                <Col xs={24} xl={12}>
                    <Edit
                        isLoading={formLoading}
                        saveButtonProps={saveButtonProps}
                        breadcrumb={false}
                    >
                        <Form {...formProps} layout="vertical">
                            <CustomAvatar shape="square" src={avatarUrl} name={getNameInitials(name || '')} style={{ width: 96, height: 96, marginBottom: '24px' }} />
                        </Form>
                    </Edit>
                </Col>
            </Row>
        </div>
    )
}

export default EditPage