import React from 'react'

function Products(props) {
    return (
        <div>
            {props.products.map(prod => {
                <div className="flex">
                    <img src={prod.image} /> {/* Don't Forget to style images below flex */}
                    <p>{prod.text}</p> {/* Don't Forget to style paragraphs below flex */}
                    <button></button>
                </div>
            })}            
        </div>
    )
}

export default Products
