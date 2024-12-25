import React, { useState, useEffect } from "react";
import { Col, Container, Row, Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import gpay from '../Images/gpay.png'
import {
  addToCart,
  decreaseQty,
  deleteProduct,
} from "../app/features/cart/cartSlice";

const Cart = () => {
  const { cartList } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  
  const [showCheckout, setShowCheckout] = useState(false);

  const totalPrice = cartList.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleProceedToCheckout = () => setShowCheckout(true);
  const handleCloseCheckout = () => setShowCheckout(false);

  const handlePayment = () => {
    toast.success("Payment successful! Thank you for your purchase.", {
      position: "top-center",
      autoClose: 3000,
    });
    setShowCheckout(false); // Close the modal
  };

  return (
    <section className="cart-items">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            {cartList.length === 0 && (
              <h1 className="no-items product">No Items are added to Cart</h1>
            )}
            {cartList.map((item) => {
              const productQty = item.price * item.qty;
              return (
                <div className="cart-list" key={item.id}>
                  <Row className="align-items-center">
                    <Col xs={12} sm={4} md={3} className="text-center">
                      <img
                        src={item.imgUrl}
                        alt=""
                        className="img-fluid cart-product-image"
                      />
                    </Col>
                    <Col xs={12} sm={8} md={6}>
                      <h3 className="text-truncate">{item.productName}</h3>
                      <h4>
                        ${item.price}.00 × {item.qty} ={" "}
                        <span className="text-success">${productQty}.00</span>
                      </h4>
                    </Col>
                    <Col xs={12} md={3} className="text-center mt-2">
                      <div className="d-flex justify-content-center">
                        <button
                          className="btn btn-outline-primary mx-1"
                          onClick={() =>
                            dispatch(addToCart({ product: item, num: 1 }))
                          }
                        >
                          <i className="fa-solid fa-plus"></i>
                        </button>
                        <button
                          className="btn btn-outline-secondary mx-1"
                          onClick={() => dispatch(decreaseQty(item))}
                        >
                          <i className="fa-solid fa-minus"></i>
                        </button>
                        <button
                          className="btn btn-outline-danger mx-1"
                          onClick={() => dispatch(deleteProduct(item))}
                        >
                          <ion-icon name="close"></ion-icon>
                        </button>
                      </div>
                    </Col>
                  </Row>
                </div>
              );
            })}
          </Col>
          <Col xs={12} md={4}>
            <div className="cart-total p-3 border rounded">
              <h2>Cart Summary</h2>
              <div className="d-flex justify-content-between">
                <h4>Total Price:</h4>
                <h3>${totalPrice}.00</h3>
              </div>
              <Button
                className="mt-3 w-100"
                variant="success"
                onClick={handleProceedToCheckout}
              >
                Proceed to Checkout
              </Button>
            </div>
          </Col>
        </Row>
      </Container>


      {/* Checkout Modal */}
      <Modal show={showCheckout} onHide={handleCloseCheckout} centered>
        <Modal.Header closeButton>
          <Modal.Title>Checkout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Payment Options</h5>
          <ul className="payment-options">
            <li>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                alt="Visa"
                width="50"
              />{" "}
              Visa
            </li>
            <li>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg"
                alt="MasterCard"
                width="50"
              />{" "}
              MasterCard
            </li>
            <li>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                alt="PayPal"
                width="50"
              />{" "}
              PayPal
            </li>
            <li>
              <img
                src={gpay}
                alt="Google Pay"
                width="50"
              />{" "}
              Google Pay
            </li>
          </ul>
          <h6>Total: ${totalPrice}.00</h6>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCheckout}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handlePayment}>
            Proceed to Pay
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Notification */}
      <ToastContainer />
    </section>
  );
};

export default Cart;
