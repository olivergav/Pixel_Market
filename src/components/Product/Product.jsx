import {Link} from "react-router-dom";
import {MEDIA_PATH} from "../../constants";

function Product({id, images, name, description, price, currency}) {
    return (
        <div key={id}
             data-cy="product"
             className="products__card card">
            <div className="card__mask">
                <img
                    src={`${MEDIA_PATH}/${images[0]}`}
                    alt={name}
                    className="card__image"
                />
            </div>
            <div className="card__box">
                <h2 className="card__hdl">{name}</h2>
                <p className="card__text">{description}</p>
                <div className="card__footer">
                    <span className="card__price">
                          {currency}
                        {price}
                        </span>
                    <Link
                        to={`/products/${id}`}
                        className="card__link"
                        data-cy="detailsLink">
                        Details
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Product;