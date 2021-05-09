import React from "react";
import { Carousel } from "react-bootstrap";
import "./carousel.css";

function Slider() {
    return (
        <Carousel className="carousel">
            <Carousel.Item interval={1500}>
                <Carousel.Caption>
                    <p>
                        TaxChain Reduces Corruption and Creates
                        <span className="green"> Transparency </span>
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={1500}>
                <Carousel.Caption>
                    <p>
                        TaxChain Is An All In One Website To Pay and
                        <span className="green"> Track Your Tax</span>
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={1500}>
                <Carousel.Caption>
                    <p>
                        A <span className="green">Revolutionary Idea </span>
                        Which Can End Corruption Forever
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default Slider;
