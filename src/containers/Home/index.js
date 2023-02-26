import React from "react";
import Layout from "../../components/Layout";
import { Jumbotron, Row, Col, Container, Table } from "react-bootstrap";
import "./style.css";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deletereviewsbyid } from "../../actions";
/**
 * @author
 * @function Home
 **/

const Home = (props) => {
  const dispatch = useDispatch()
  const product = useSelector((state) => state.product);
console.log(product.products)
  return (
    <Layout sidebar>
      <Table style={{ fontSize: 12 }} responsive="sm">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>User Name</th>
            <th>Reviews</th>
            {/* <th>Rating</th> */}
          </tr>
        </thead>
        <tbody>
          {product.products.length > 0
            ? product.products.map((product) => (
              <>
              {product.reviews.length>0 ? product.reviews.map((rev)=>(
              <tr key={product._id}>
                  <td>{product.name}</td>
                    <td>{rev.name}</td>
                    <td>{rev.comment}</td>
                    {/* <td>{rev.rating}</td> */}
                    <td>
                    <button
                      onClick={() => {
                        const payload = {
                          id:product._id,
                          reviewId: rev._id,
                        };
                        console.log(payload)
                        dispatch(deletereviewsbyid(payload));
                      }}
                    >
                      del
                    </button>
                    </td>
                  </tr>
                  )):null}
                  </>
            ))
            : null}
        </tbody>
      </Table>

      {/* <Jumbotron style={{margin: '5rem', background: '#fff'}} className="text-center">
            <h1>Welcome to Admin Dashboard</h1>
            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a sear</p>
        </Jumbotron> */}
    </Layout>
  );
};

export default Home;
