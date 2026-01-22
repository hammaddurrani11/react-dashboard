import { CREATE_COMPANY_MUTATION } from "@/graphql/mutation";
import { useModalForm } from "@refinedev/antd"
import { useGo } from "@refinedev/core"
import { CompanyList } from "./list";
import { Form, Input, Modal, Select } from "antd";


const Create = () => {
    const go = useGo();

    const goToListPage = () => {
        go({
            to: { resource: "companies", action: "list" },
            options: { keepQuery: true },
            type: 'replace'
        })
    }

    const { formProps, modalProps } = useModalForm({
        action: "create",
        resource: "companies",
        defaultVisible: true,
        redirect: false,
        mutationMode: 'pessimistic',
        onMutationSuccess: goToListPage,
        meta: {
            gqlMutation: CREATE_COMPANY_MUTATION
        }
    })

    return (
        <CompanyList>
            <Modal
                {...modalProps}
                mask={true}
                onCancel={goToListPage}
                title="Create Company"
                width={512}
            >
                <Form {...formProps} layout="vertical">
                    <Form.Item
                        label="Company Name"
                        name="name"
                        rules={[{ required: true }]}
                    >
                        <Input placeholder="Please enter a company name" />
                    </Form.Item>
                    <Form.Item
                        label="Sales Owner"
                        name="salesOwnerId"
                        rules={[{ required: true }]}
                    >
                        <Select
                            placeholder="Select Sales Owner"
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </CompanyList>
    )
}

export default Create