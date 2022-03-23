import React from 'react';
import axios from 'axios';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cityData: {},
            cityName: '',
            showCity: false
        };

    }

    handleInput = (event) => {
        this.setState({
            cityName: event.target.value
        });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        let cityData = await axios.get(`${process.env.REACT_APP_SERVER}/weather?cityData=${this.state.cityData}`);
        this.setState({
            cityData: cityData.data
        });
    };

    render() {
        return (
            <>
                <h1>Weather Data</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type='text' onInput={this.handleInput} />
                    <button type='submit'>Display Weather</button>
                </form>
                {
                    this.state.showCity && <p>{this.state.cityData.name} is a {this.state.cityData.timezone}</p>
                }
            </>
        );
    }
}
