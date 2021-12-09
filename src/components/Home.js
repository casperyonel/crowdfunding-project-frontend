import { Button, Header, Form } from 'semantic-ui-react'
import { withRouter } from 'react-router'

const Home = () => {
    
    state = {
        address: ''
    }

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(event) {
        this.setState({address: event.target.value})
    }

    onSubmit(event) {
        event.preventDefault() 
        this.props.history.push(`/campaigns/${this.state.address}`)
        // PRETTY SURE THIS SHOULD BE /CAMPAIGN NOT CAMPAIGNS
    }

    return (
        <div>
            <Header as='h1'>Crowdfunding Application</Header>

            <Form>
                <Form.input 
                label='Contract Address'
                type="text"
                value={this.state.address}
                onChange={this.onChange}
                />
                <Button
                    type="submit"
                    onClick={this.onSubmit}
                >
                    Submit
                </Button>
            </Form>
        </div>
    )

    

}

export default Home
