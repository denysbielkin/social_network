import React, {Component} from 'react'
class Alerts extends Component{



    static initAlert(text, type){

        type=type.toLowerCase();
        switch (type){
            case 'fail':

                /*
<div id="modal-container">
    <div id="my-modal" className="modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="modal-title"></h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body" id="modal-content-">

                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" id="modal-save">Save changes</button>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</div>
*/
                //printAlert(text)
                break;
            case 'success':

                break;
            //case:
        }


    }

}

export default Alerts;