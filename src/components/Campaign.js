import { Button, Input, Header, Table } from 'semantic-ui-react'
import { web3 } from '../ethereum/web3'
import { createContract } from './../ethereum/crowdfundingContract'

const Campaign = () => {
    
    ONGOING_STATE= '0'
    FAILED_STATE= '1'
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
        const currentCampaign = await this.getCampaign(this.getCampaignAddress())
        this.setState({
            campaign: currentCampaign
        })
    }

    getCampaignAddress() {
        return this.props.match.params.address
    }

    async getCampaign(address) {
        const contract = createContract(address) 

        const name = await contract.methods.name().call()
        const targetAmount = await contract.methods.targetAmount().call()
        const totalCollected = await contract.methods.totalCollected().call()
        const beforeDeadline = await contract.methods.beforeDeadline().call()
        const beneficiary = await contract.methods.beneficiary().call()
        const fundingDeadline = await contract.methods.fundingDeadline().call()
        const state = await contract.methods.state().call()
        // Above is grabbing info from contract linked to other file, which is linked to web3 instance. 

        var deadlineDate = new Date(0)
        deadlineDate.setUTCSeconds(deadlineSeconds)

        const accounts = await web3.eth.getAccounts()

        return {
            name: 'Contract Name',
            targetAmount: 100,
            totalCollected: 50,
            campaignFinished: false, 
            deadline: new Date(),
            isBeneficiary: beneficiary.toLowerCase() === accounts[0].toLowerCase(),
            // first account in the accounts array which is the ADDRESS of the METAMASK USER!
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

    async onContribute(event) {
       const accounts = await web3.eth.getAccounts() // get list of accounts using this method
       const amount = web3.utils.toWei( // to get amount of funds a user can contribute. we're updating 
       // this on line 182 just above by updating state whenever a user contributes
           this.state.contributionAmount,
           'ether'
       )
       // Below creates a web3 instance of a smart contract. Then we get list of accounts, amount they contribute, and so now 
       // can send a transaction. 
       const contract = createContract(this.getCampaignAddress())
       await contract.methods.contribute().send({
           from: accounts[0],
           value: amount
       })

       // Below is updating the state of the smart contract so UI will withdraw the amount of funds that has contribued to this campaign
       const campaign = this.state.campaign
       campaign.totalCollected = Number.parseInt(campaign.totalCollected) + Number.parseInt(amount)

       this.setState({ campaign: campaign })
    }
}

export default Campaign
