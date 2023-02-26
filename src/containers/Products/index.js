import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Container, Row, Col, Table } from "react-bootstrap";
import Input from "../../components/UI/Input";
import Modal from "../../components/UI/Modal";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, deleteProductById } from "../../actions";
import "./style.css";
import { generatePublicUrl } from "../../urlConfig";
import { useEffect } from "react";

/**
 * @author
 * @function Products
 **/

const Products = (props) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [offer, setOffer] = useState("");
  const [description, setDescription] = useState("");
  const [otherDescription, setotherDescription] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  const [show, setShow] = useState(false);
  const [productDetailModal, setProductDetailModal] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const category = useSelector((state) => state.category);
  const product = useSelector((state) => state.product);
  let [array, setArray] = useState([]);
  let [inputdata, setInputdata] = useState({ name1: "", number: "" });
  let { name1, number } = inputdata;
  const dispatch = useDispatch();

  const handleClose = () => {
    setShow(false);
  };

  function data(e) {
    // e.preventDefault();
    setInputdata({ ...inputdata, [e.target.name]: e.target.value });
    console.log(inputdata);
  }

  // useEffect(() =>{
  //   setArray(array =>[...array,{inputdata}])
  //   console.log(array);
  // },[array])
  function addinputdata() {
    if (name1 === "" && number === "") {
      alert("Enter Name and Roll no ");
    } else {
      // setArray(array =>[...array,{inputdata}])
      array.push(inputdata);
      otherDescription.push(inputdata)
      console.log("This is array", array);
      console.log(inputdata);
      setInputdata({ name1: "", number: "" });
    }
  }

  const submitProductForm = () => {
    console.log("This are otherDetails",JSON.stringify(otherDescription))
    const form = new FormData();
    form.append("name", name);
    form.append("quantity", quantity);
    form.append("price", price);
    form.append("offer", offer);
    form.append("description", description);
    // for (var i = 0; i < otherDescription.length; i++) {
    form.append("otherDescription", JSON.stringify(otherDescription));
    form.append("category", categoryId);

    for (let pic of productPictures) {
      form.append("productPicture", pic);
    }

    dispatch(addProduct(form)).then(() => setShow(false));
  };
  const handleShow = () => setShow(true);

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }

    return options;
  };

  const handleProductPictures = (e) => {
    setProductPictures([...productPictures, e.target.files[0]]);
  };

  const renderProducts = () => {
    console.log(product.products);
    return (
      <Table style={{ fontSize: 12 }} responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Offer</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {product.products.length > 0
            ? product.products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.offer}</td>
                  <td>{product.quantity}</td>
                  <td>{product.category.name}</td>
                  <td>
                    <button onClick={() => showProductDetailsModal(product)}>
                      info
                    </button>
                    <button
                      onClick={() => {
                        const payload = {
                          productId: product._id,
                        };
                        dispatch(deleteProductById(payload));
                      }}
                    >
                      del
                    </button>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    );
  };

  const renderAddProductModal = () => {
    return (
      <Modal
        show={show}
        handleClose={handleClose}
        modalTitle={"Add New Product"}
        onSubmit={submitProductForm}
      >
        <Input
          label="Name"
          value={name}
          placeholder={`Product Name`}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Quantity"
          value={quantity}
          placeholder={`Quantity`}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Input
          label="Price"
          value={price}
          placeholder={`Price`}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          label="Offer Price"
          value={offer}
          placeholder={`offer`}
          onChange={(e) => setOffer(e.target.value)}
        />
        <Input
          label="Description"
          value={description}
          placeholder={`Description`}
          onChange={(e) => setDescription(e.target.value)}
        />
         {/* <Input
          label="Description"
          value={otherDescription}
          placeholder={`otherDescription`}
          onChange={(e) => setotherDescription(e.target.value)}
        /> */}
        {"Other Description "}<br></br>
        <input
          type="text"
          value={inputdata.name1}
          name="name1"
          autoComplete="off"
          placeholder="Enter Name"
          onChange={data}
        />
        <input
          type="text"
          value={inputdata.number}
          name="number"
          placeholder="Enter Number"
          onChange={data}
        />
        <button onClick={addinputdata}>{`Add data`}</button><br></br>
        <table border="1" >
        <tbody>
        <tr>
                        <th>Name</th>
                        <th>Number</th>
                        </tr>
        
        {array.map((item, i) => {return(
            <tr key={i}>
              <td>{item.name1}</td>
              <td>{item.number}</td>
            </tr>
          )
            
          })}
          </tbody>
          </table>
        <select
          className="form-control"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option>select category</option>
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        {productPictures.length > 0
          ? productPictures.map((pic, index) => (
              <div key={index}>{pic.name}</div>
            ))
          : null}
        <input
          type="file"
          name="productPicture"
          onChange={handleProductPictures}
        />
      </Modal>
    );
  };

  const handleCloseProductDetailsModal = () => {
    setProductDetailModal(false);
  };

  const showProductDetailsModal = (product) => {
    setProductDetails(product);
    setProductDetailModal(true);
  };

  const renderProductDetailsModal = () => {
    if (!productDetails) {
      return null;
    }

    return (
      <Modal
        show={productDetailModal}
        handleClose={handleCloseProductDetailsModal}
        modalTitle={"Product Details"}
        size="lg"
      >
        <Row>
          <Col md="6">
            <label className="key">Name</label>
            <p className="value">{productDetails.name}</p>
          </Col>
          <Col md="6">
            <label className="key">Price</label>
            <p className="value">{productDetails.price}</p>
          </Col>
          <Col md="6">
            <label className="key">Offer Price</label>
            <p className="value">{productDetails.offer}</p>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <label className="key">Quantity</label>
            <p className="value">{productDetails.quantity}</p>
          </Col>
          <Col md="6">
            <label className="key">Category</label>
            <p className="value">{productDetails.category.name}</p>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <label className="key">Description</label>
            <p className="value">{productDetails.description}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <label className="key">Product Pictures</label>
            <div style={{ display: "flex" }}>
              {productDetails.productPictures.map((picture) => (
                <div className="productImgContainer">
                  <img src={generatePublicUrl(picture.img)} alt="" />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Modal>
    );
  };
  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Products</h3>
              <button onClick={handleShow}>Add</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>{renderProducts()}</Col>
        </Row>
      </Container>
      {renderAddProductModal()}
      {renderProductDetailsModal()}
    </Layout>
  );
};

export default Products;
