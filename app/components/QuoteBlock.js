import React, {	Component	} from "react";
import axios from "axios";

class BlockQuote extends Component{
	constructor(props){
		super(props);

		this.state = {
			text : this.props.text,
			index : this.props.index,
			handleClick : this.props.handleClick
		}
	}

	handleEnter(){
		if(event.key == 'Enter'){
			this.updateButton();
		}
	}

	updateButton(){
		const QUERY_STRING = "/api/quotes/" + this.state.index;
		var dat = this;
		axios.patch(QUERY_STRING, { "text" : dat.state.text	})
			.then((response) => {
				console.log(response);
				dat.state.handleClick();
			})
			.catch((error)=>{
				console.log(error);
			})
	}

	deleteButton(){
		const QUERY_STRING = "/api/quotes/" + this.state.index;
		var dat = this;
		axios.delete(QUERY_STRING)
			.then((response) => {
				console.log(response);
				dat.state.handleClick();
			})
			.catch((error)=>{
				console.log(error);
			})
	}

	render(){
		return(
			<div className={"col-lg-4 text-center"}>
            <br />
            <input className={"block-quote fancy"}  value={this.state.text} onKeyPress={this.handleEnter.bind(this)}/>
						<i className={"fa fa-times-circle-o"} aria-hidden={"true"} onClick={this.deleteButton.bind(this)}/>
            <br />
            <br />

       </div>
		);
	}
}

export default BlockQuote;