import React, { Component } from 'react'
import dashjs from 'dashjs'

export default class Player extends Component {

    constructor(props){
        super(props);
        this.classRef = React.createRef(null);
        this.src = props.src;
    }

    componentDidMount(){
        const video = this.classRef.current;
        const player = dashjs.MediaPlayer().create();

        player.initialize(video, this.src, true);
        
    }
    
    render() {
        return (
            <video
                data-dashjs-player
                ref={this.classRef}
            />
        )
    }
}