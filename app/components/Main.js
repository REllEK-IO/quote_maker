import React, { Component  } from "react";
import axios from "axios";
import QuoteBlock from "./QuoteBlock";

// very basic component to get started
class Main extends Component{
  constructor(props){
    super(props);

    this.state = {
      recording : "",
      records : "nothing"
    }

    this.getRecords();
  }

  

  getRecords(){
    var set = this;
    axios.get("/api/quotes")
      .then(function(response){
        set.setState({
          records : response.data
        })
        console.log(response.data[0]);
      })
      .catch(function(error){
        console.log(error);
      })
    
  }

  postRecord(){
    var set = this;
    console.log("$$$", set.state.recording ,"$$$")
    
    axios.post("/api/quotes",{
      text : set.state.recording
    })
      .then((response) =>{
        console.log(response);
        this.getRecords();
      })
      .catch((error) =>{
        console.log(error);
      })
  }

  setRecording(e){
    console.log(e.target.value);
    this.setState({
       "recording": e.target.value
    });

  }

  renderQuotes(){
    if(this.state.records === "nothing" || this.state.records === null){
      console.log("nothing");
      return null;
    }
    else{
      const ITEMS = this.state.records.map((data, i) => (
          <QuoteBlock text={data.text} index={data._id}  handleClick={this.getRecords.bind(this)}/> 
        )
      );
      
      console.log("here", this.state.records, "here");

      return ITEMS;
    }
   
  }
  render(){
    return(

      <div>
        <div className={"navbar bg-primary blur-bg"}>
          <h3 className={"text-center text-secondary"}>Quote Maker</h3>
        </div>
        <br />
        <div className={"row"}>
          <div className={"offset-lg-1 col-lg-10"}>
              <h1 className={"text-center"}>Quotes</h1>
              <div className={"col-lg-8 offset-lg-2"}>
                <br />
                <textarea onChange={this.setRecording.bind(this)} className={"full text-center"}/>
                <button className={"float-right btn btn-success"} onClick={this.postRecord.bind(this)} >
                  Submit
                  <i className={"fa fa-arrow-right txt"} aria-hidden={"true"}/>
                </button>
              </div>
              <br />
              
          </div>
        </div>
        <div className={"full"}>
          <h3 className={"text-center"}>In Store</h3>
          <div className={"row"}> 
            {this.renderQuotes()}
          </div>
        </div>
        
      </div>
    );
  };
}

export default Main;
