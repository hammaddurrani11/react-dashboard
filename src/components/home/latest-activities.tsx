import { UnorderedListOutlined } from "@ant-design/icons"
import { Card, List, Space } from "antd"
import { Text } from "../text"
import LatestActivitiesSkeleton from "../skeleton/latest-activities";
import { useList } from "@refinedev/core";
import { DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY, DASHBOARD_LATEST_ACTIVITIES_DEALS_QUERY } from "@/graphql/queries";
import dayjs from "dayjs";
import CustomAvatar from "../custom-avatar";

const DashboardLatestActivities = () => {

    //Audits Query
    const { result, query } = useList({
        resource: 'audits',
        meta: {
            gqlQuery: DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY
        }
    })

    const auditsData = result?.data ?? [];
    const isLoading: boolean = query?.isLoading;
    console.log('auditData', auditsData)

    const dealIds = auditsData?.map((audit) => audit?.targetId);
    console.log('dealIds', dealIds)

    //Deals Query
    const { result: dealResult, query: dealQuery } = useList({
        resource: 'deals',
        queryOptions: { enabled: !!dealIds?.length },
        pagination: {
            mode: 'off'
        },
        filters: [{
            field: 'id',
            operator: 'in',
            value: dealIds
        }],
        meta: {
            gqlQuery: DASHBOARD_LATEST_ACTIVITIES_DEALS_QUERY
        }
    })

    const dealsData = dealResult?.data ?? [];
    const dealsLoading = dealQuery?.isLoading;
    console.log('dealsData', dealsData)

    return (
        <Card
            styles={{
                header: {
                    padding: '16px'
                },
                body: {
                    padding: '0 1rem'
                }
            }}
            title={(
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <UnorderedListOutlined />
                    <Text size="sm" style={{ marginLeft: '0.5rem' }}>
                        Lastest Activities
                    </Text>
                </div>
            )}
        >
            {isLoading && dealsLoading ? (
                <List
                    itemLayout="horizontal"
                    dataSource={Array.from({ length: 5 }).map((_, i) => ({ id: i }))}
                    renderItem={(_, index) => (
                        <LatestActivitiesSkeleton key={index} />
                    )}
                />
            ) : (
                <List
                    itemLayout="horizontal"
                    dataSource={dealsData}
                    renderItem={(item) => {
                        const audit = auditsData?.find((audit) => String(audit?.targetId) === item?.id) || undefined;
                        console.log('audit', audit);

                        return (
                            <List.Item>
                                <List.Item.Meta
                                    title={dayjs(item?.createdAt).format('MMM DD, YYYY - HH:mm')}
                                    avatar={
                                        <CustomAvatar
                                            shape="square"
                                            size={48}
                                            src={item?.company?.avatarUrl}
                                            name={item?.company?.name}
                                        />
                                    }
                                    description={
                                        <Space size={4}>
                                            <Text strong>{audit?.user?.name}</Text>
                                            <Text>
                                                {audit?.action === 'CREATE' ? 'created' : 'moved'}
                                            </Text>
                                            <Text strong>{item?.title}</Text>
                                            <Text>deal</Text>
                                            <Text>{audit?.action === 'CREATE' ? 'in' : 'to'}</Text>
                                            <Text strong>
                                                {item?.stage?.title}
                                            </Text>
                                        </Space>
                                    }
                                />
                            </List.Item>
                        )
                    }}
                />
            )}
        </Card>
    )
}

export default DashboardLatestActivities