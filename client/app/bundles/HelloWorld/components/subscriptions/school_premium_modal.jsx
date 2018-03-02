import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import UpdateStripeCard from '../modules/stripe/update_card.js';
import getAuthToken from '../modules/get_auth_token';
import request from 'request';

export default class extends React.Component {

  constructor(props) {
    super(props);
    // this.state = {

    // };
  }

  render() {
    return (
      <Modal {...this.props} show={this.props.show} onHide={this.props.hideModal} dialogClassName="school-premium-modal" restoreFocus>
        <Modal.Body>
          <img className="pull-right react-bootstrap-close" onClick={this.props.hideModal} src={`${process.env.CDN_URL}/images/shared/close_x.svg`} alt="close-modal" />
          <div className="pricing-info text-center">
            <div className="current-year">
              <h1>Quill School Premium</h1>
              <span>$900 for one-year subscription</span>
            </div>
            <span>Next Year's Rate is $1800</span>
          </div>
          <div className="cta-section">
            <h3>How would you like to renew your School’s <br />Premium subscription?</h3>
            <div className="flex-row space-between">
              <a href="https://quillpremium.wufoo.com/forms/quill-premium-quote" className="q-button bg-quillgreen text-white">Email Me a Quote</a>
              <button onClick={this.props.purchaseSchoolPremium} className="q-button bg-quillgreen text-white">Pay with Credit Card</button>
            </div>
          </div>
          <div className="not-the-purchaser-section">
            <h3>Not the Purchaser?</h3>
            <p>
              <span>Credit Card Purchaser:</span>
              Reach out to your school purchaser and ask them to login to Quill and renew the subscription.
            </p>
            <p>
              <span>Quote Purchaser:</span>
              Quote purchase: Click on <i>Email Me A Quote</i> and forward the quote to your school’s purchaser.
            </p>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}
