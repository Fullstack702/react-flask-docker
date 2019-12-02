import React, { Component } from 'react';
import IconButton from "@material-ui/core/IconButton";
import { ReactMUIDatatable } from "react-material-ui-datatable";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import DeleteIcon from "@material-ui/icons/Delete";
import { get_campaigns } from './Api';


const columns = [
  {
    name: "campaign_id",
    label: "Campaign ID"
  },
  {
    name: "created_at",
    label: "Created At"
  },
  {
    name: "current_status",
    label: "Current Status"
  },
  {
    name: "name",
    label: "Name"
  },
  {
    name: "type",
    label: "Type"
  },
  {
    name: "updated_at",
    label: "Last Updated"
  }
];


var data = [];



const customToolbarSelectActions = ({
  data,
  selectedData,
  updateSelectedData,
  handleDelete
}) => (
  <React.Fragment>
    <IconButton
      onClick={() => {
        const nextSelectedData = data.reduce((nextSelectedData, row) => {
          if (!selectedData.includes(row)) {
            nextSelectedData.push(row);
          }

          return nextSelectedData;
        }, []);

        updateSelectedData(nextSelectedData);
      }}
    >
      <SwapHorizIcon />
    </IconButton>
    <IconButton
      onClick={() => {
        handleDelete(selectedData);
      }}
    >
      <DeleteIcon />
    </IconButton>
  </React.Fragment>
);

class Demo extends Component {
    constructor(props){
        super(props);
        this.state = {
           campaigns: []
        }
    }
    
    componentWillMount() {
        // get campaigns from api
        get_campaigns().then(async (res) => {
            await this.setState({
                campaigns: res['campaigns']
            })
            console.log(this.state);
        })
        .catch(err => {
            console.log(err);
        });        
    }

    render() {
        const { campaigns } = this.state;

        if (campaigns.length === 0)
            return (<div>Loading...</div>);
                
        return (
            <div className={"App"}>
                <ReactMUIDatatable
                    title={"Campaigns"}
                    data={campaigns}
                    columns={columns}
                    toolbarSelectActions={customToolbarSelectActions}
                    />
            </div>
        );
    }
}


export default Demo;


