import { DashboardLatestActivities, DashboardTotalCountCard, DealsChart, UpcomingEvents } from "@/components"
import { DASHBOARD_TOTAL_COUNTS_QUERY } from "@/graphql/queries"
import { DashboardTotalCountsQuery } from "@/graphql/types"
import { useCustom } from "@refinedev/core"
import { Col, Row } from "antd"

export const Home = () => {
    const { query, result } = useCustom<DashboardTotalCountsQuery>({
        url: '',
        method: 'get',
        meta: {
            gqlQuery: DASHBOARD_TOTAL_COUNTS_QUERY
        }
    })

    const isLoading = query?.isLoading;
    const data = result?.data ?? [];

    return (
        <div>
            <Row gutter={[32, 32]}>
                <Col
                    xs={24}
                    sm={24}
                    xl={8}
                >
                    <DashboardTotalCountCard
                        resource="companies"
                        isLoading={isLoading}
                        totalCount={data?.companies?.totalCount}
                    />
                </Col>
                <Col
                    xs={24}
                    sm={24}
                    xl={8}
                >
                    <DashboardTotalCountCard
                        resource="contacts"
                        isLoading={isLoading}
                        totalCount={data?.contacts?.totalCount}
                    />
                </Col>
                <Col
                    xs={24}
                    sm={24}
                    xl={8}
                >
                    <DashboardTotalCountCard
                        resource="deals"
                        isLoading={isLoading}
                        totalCount={data?.deals?.totalCount}
                    />
                </Col>
            </Row>

            <Row
                gutter={[32, 32]}
                style={{
                    marginTop: '32px'
                }}
            >
                <Col
                    xs={24}
                    sm={24}
                    xl={8}
                    style={{
                        height: '460px'
                    }}
                >
                    <UpcomingEvents />
                </Col>
                <Col
                    xs={24}
                    sm={24}
                    xl={16}
                    style={{
                        height: '460px'
                    }}
                >
                    <DealsChart />
                </Col>
            </Row>

            <Row
                gutter={[32, 32]}
                style={{
                    marginTop: '32px'
                }}
            >
                <Col xs={24}>
                    <DashboardLatestActivities />
                </Col>
            </Row>
        </div>
    )
}