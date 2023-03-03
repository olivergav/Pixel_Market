import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import { MEDIA_PATH } from "./../../constants";
import { getAllProductData } from "../../helpers/api";

import Loader from "../Loader/Loader";
import ProgressBar from "../ProgressBar/ProgressBar";
import AuthContext from "../../context/AuthProvider";

import star from "../../assets/star.svg";
import "./ProductDetails.scss";

export default function ProductDetails() {
  const { auth } = useContext(AuthContext);

  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    getAllProductData(id, auth.accessToken).then((data) => setProduct(data));
  }, []);

  return (
    <>
      {Object.keys(product).length !== 0 ? (
        <>
          <ProgressBar weight={500} />
          <div className="product-detail">
            <div className="product-detail__mask">
              {product.images &&
                product.images.map((image, idx) => (
                  <img
                    key={product.id}
                    src={`${MEDIA_PATH}/${product.images[idx]}`}
                    alt={product.name}
                    className="product-detail__img-top"
                    data-cy="product-details-image"
                  />
                ))}
            </div>
            <div className="product-detail__body product-detail__body--column">
              <h5 className="product-detail__title">{product.name}</h5>
              <p className="product-detail__text">{product.description}</p>
            </div>
            <ul className="product-detail__list-group list-group">
              <li className="list-group__item" data-cy="productCategory">
                <b>Category:</b> {product.category}
              </li>
              <li className="list-group__item">
                <b>Subcategory: </b>
                {product.subcategory}
              </li>
              <li className="list-group__item list-group__item--product-comment">
                <b>Opinions: </b>
                <br />
                {product.opinions ? (
                  product.opinions.map(({ id, author, content, stars }) => (
                    <div className="product-comment" key={id}>
                      <div className="product-comment__header">
                        <div className="product-comment__author">
                          <b>{author}</b>
                        </div>
                        <div className="product-comment__stars">
                          {Array.from({ length: stars }, (item, idx) => (
                            <img
                              key={idx}
                              src={star}
                              alt="Product_stars"
                              className="product-comment__star"
                            />
                          ))}
                        </div>
                      </div>
                      <div className="product-comment__content">{content}</div>
                    </div>
                  ))
                ) : (
                  <Loader />
                )}
              </li>
              <li className="list-group__item list-group__item--product-opinions">
                <b>Comments: </b> <br />
                {product.comments &&
                  product.comments.map(({ id, author, content }) => (
                    <div className="product-opinion" key={id}>
                      <div className="product-opinion__author">
                        <b>{author}</b>
                      </div>
                      <div className="product-opinion__content">{content}</div>
                    </div>
                  ))}
              </li>
            </ul>
            <div className="product-detail__body">
              <span className="product-detail__price">
                {product.currency}
                {product.price}
              </span>
              <span className="product-detail__stock">{`On stock: ${product.stock}`}</span>
            </div>
          </div>
          <Link to="/" className="back-btn">
            {" "}
            Back
          </Link>
        </>
      ) : (
        <Loader fullScreen={true} />
      )}
    </>
  );
}
