import { UnorderedListOutlined } from "@ant-design/icons"
import { Card, List } from "antd"
import { Text } from "../text"
import LatestActivitiesSkeleton from "../skeleton/latest-activities";
import { useList } from "@refinedev/core";
import { DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY } from "@/graphql/queries";

const DashboardLatestActivities = () => {
    const { result, query } = useList({
        resource: 'audits',
        meta: {
            gqlQuery: DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY
        }
    })

    const data = result?.data ?? [];
    const isLoading: boolean = query?.isLoading;

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
            {isLoading ? (
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
                    dataSource={data}
                    renderItem={(item)=>{
                        return <div></div>
                    }}
                />
            )}
        </Card>
    )
}

export default DashboardLatestActivities