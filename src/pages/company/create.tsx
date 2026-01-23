import { CREATE_COMPANY_MUTATION } from "@/graphql/mutation";
import { useModalForm, useSelect } from "@refinedev/antd"
import { useGo } from "@refinedev/core"
import { CompanyList } from "./list";
import { Form, Input, Modal, Select } from "antd";
import { USERS_SELECT_QUERY } from "@/graphql/queries";
import SelectOptionWithAvatar from "@/components/select-option-with-avatar";
import { GetFieldsFromList } from "@refinedev/nestjs-query";
import { UsersSelectQuery } from "@/graphql/types";


const Create = () => {
    const go = useGo();

    const goToListPage = () => {
        go({
            to: { resource: "companies", action: "list" },
            options: { keepQuery: true },
            type: 'replace'
        })
    }

    const { selectProps } = useSelect<GetFieldsFromList<UsersSelectQuery>>({
        resource: "users",
        optionValue: "id",
        optionLabel: (item) => (
            <SelectOptionWithAvatar
                name={item?.name}
                avatarUrl={item?.avatarUrl ?? undefined}
            />
        ),
        meta: {
            gqlQuery: USERS_SELECT_QUERY
        }
    })

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
                            {...selectProps}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </CompanyList>
    )
}

export default Create