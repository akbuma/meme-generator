import React, { Component } from 'react'

class MemeGenerator extends Component {

    constructor() {
        super()
        this.state = {
            topText: "",
            bottomText: "",
            randomImage: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: []
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                //Fetching memes array from API
                const {memes} = response.data
                this.setState({ allMemeImgs: memes })
            })
    }

    handleChange(event) {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    handleSubmit(event) {
        event.preventDefault()
        const images = this.state.allMemeImgs
        console.log(images)

        
        const imageURL = images[Math.floor(Math.random() * images.length)].url;
        this.setState({
            randomImage: imageURL
        })
        
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input type="text" name="topText" placeholder="Top Text" value={this.state.topText} onChange={this.handleChange} />
                    <input type="text" name="bottomText" placeholder="Bottom Text" value={this.state.bottomText} onChange={this.handleChange} />
                    <button>Gen</button>
                </form>
                <div className="meme">
                    <img src={this.state.randomImage} alt="" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }

}

export default MemeGenerator 