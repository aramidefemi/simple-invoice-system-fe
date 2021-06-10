import React, { useEffect} from 'react';
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

const InvoicePage = () => {
  
  const location = useLocation();
  
  const {
    invoice: { invoice },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  console.log(' location', location, invoice)
  useEffect(() => {
    dispatch({
      type: 'GET_INVOICE',
      payload: location.pathname
    });
  }, []);

  return ( 
      <body className='InvoicePage'>
        <div class="invoice-box">
          <table cellpadding="0" cellspacing="0">
            <tr class="top">
              <td colspan="2">
                <table>
                  <tr>
                    <td class="title">
                     Invoice System
                    </td>

                    <td>
                      Invoice #: {`${invoice._id}`.slice(0, 7)}
                      <br />
                      Created: {moment(invoice.createdAt).format('LLL')}
                      
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr class="information">
              <td colspan="2">
                <table>
                  <tr>
                    <td>
                    Invoice System, Inc.
                      <br />
                      12345 Sunny Road
                      <br />
                      Sunnyville, CA 12345
                    </td>

                    <td>
                    {invoice.company}
                      <br />
                      {invoice.phone}
                      <br />
                      {invoice.email}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr class="heading">
              <td>Payment Method</td>

              <td>Check #</td>
            </tr>

            <tr class="details">
              <td>Check</td>

              <td>1000</td>
            </tr>

            <tr class="heading">
              <td>Item</td>

              <td>Price</td>
            </tr>

            <tr class="item">
              <td>Website design</td>

              <td>$ {invoice.amount}.00</td>
            </tr>

            <tr class="item">
              <td>Hosting (12 months)</td>

              <td>$75.00</td>
            </tr>

            <tr class="item last">
              <td>Domain name (1 year)</td>

              <td>$10.00</td>
            </tr>

            <tr class="total">
              <td></td>

              <td>Total: $ {invoice.amount + 75 + 10 }.00</td>
            </tr>
          </table>
        </div>
      </body> 
  );
};

export default InvoicePage;
