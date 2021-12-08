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
    
    return (
        <div>

        </div>
    )
}

export default Campaign
