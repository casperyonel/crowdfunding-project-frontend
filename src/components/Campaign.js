import { Button, Input, Header, Table } from 'semantic-ui-react'


const Campaign = () => {
    
    ONGOING_STATE= '0'
    FIALED_STATE= '1'
    SUCCEEDED_STATE= '2'
    PAID_OUT_STATE= '3'
    
    state = {
        campaign: {
            name: 'N/A',
            targetAmount: 0,
            totalCollected: 0,
            campaignFinished: false,
            deadline: new Date(0),
            isBeneficiary: false,
            state: ''
        },
        contributionAmount: '0',
    }

    constructor(props) {
        super(props)

        this.onContribute = this.onContribute.bind(this)
    }

    async componentDidMount() {
        const currentCampaign = this.getCampaign(this.getCampaignAddress())
        this.setState({
            campaign: currentCampaign
        })
    }

    getCampaignAddress() {
        return this.props.match.params.address
    }

    getCampaign(address) {
        return {
            name: 'Contract Name',
            targetAmount: 100,
            totalCollected: 50,
            campaignFinished: false, 
            deadline: new Date(),
            isBeneficiary: true,
            state: this.ONGOING_STATE
        }
    }
    
    return (
        <div>
            <table celled padded color='teal' striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Value</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>

                    <Table.Row>
                        <Table.Cell singleLine>
                            Name
                        </Table.Cell>
                        <Table.Cell singleLine>
                            {this.state.campaign.name}
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell singleLine>
                            Target amount
                        </Table.Cell>
                        <Table.Cell singleLine>
                            {this.state.campaign.targetAmount}
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell singleLine>
                            Total Collected
                        </Table.Cell>
                        <Table.Cell singleLine>
                            {this.state.campaign.totalCollected}
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell singleLine>
                            Campaign finished
                        </Table.Cell>
                        <Table.Cell singleLine>
                            {this.state.campaign.campaignFinished}
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell singleLine>
                            Deadline
                        </Table.Cell>
                        <Table.Cell singleLine>
                            {this.state.campaign.deadline}
                        </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell singleLine>
                            Beneficiary
                        </Table.Cell>
                        <Table.Cell singleLine>
                            {this.state.campaign.isBeneficiary}
                        </Table.Cell>
                    </Table.Row>

                </Table.Body>
            </table>
        </div>
    )

    campaignInteractionSection() {
        if (this.state.campaign.campaignFinished) {
            return this.postCampaignInterface()
        } else {
            return this.contributeInterface()
        }
    }

    postCampaignInterface() {
        if (this.state.campaign.state === this.ONGOING_STATE) {
            return <div>
                <Button type="submit" positive>Finish campaign</Button>
            </div>
        }
        if (this.state.campaign.state === this.SUCCEEDED_STATE && this.state.campaign.isBeneficiary === true) {
            return <div>
                <Button type="submit" negative>Collect Funds</Button>
            </div>
        }
        if (this.state.campaign.state === this.FAILED_STATE) {
            return <div>
                <Button type="submit" negative>Refund</Button>
            </div>
        }
    }

    contributeInterface() {
        return <div>
            <Input
                action={{
                    color: 'teal',
                    content: 'Contribute',
                    onClick: this.onContribute
                }}
                actionPosition='left'
                label='ETH'
                labelPosition='right'
                placeholder='1'
                onChange={(e) => this.setState({contributionAmount: e.target.value})} 
            />
        </div>
    }

    onContribute(event) {
        alert(`Contributing ${this.state.contributionAmount} to a contract`)
    }
}

export default Campaign
