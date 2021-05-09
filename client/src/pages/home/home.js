import React from "react";
import NavigationBar from "../../components/navbar/navbar.js";
import Slider from "../../components/carousel/carousel.js";
import WhiteCard from "../../components/card/card.js";
import Footer from "../../components/footer/footer.js";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faDiceD20 } from "@fortawesome/free-solid-svg-icons";

import "./home.css";

function Home() {
    return (
        <div>
            <NavigationBar></NavigationBar>
            <div className="black-bg">
                <Container className="img">
                    <Row>
                        <Col>
                            <Slider></Slider>
                        </Col>
                    </Row>
                    <Row className="row-2">
                        <Col md={6}>
                            <p className="white-text">
                                The transparency and immutability of blockchain
                                helps TaxChain achieve its aim. We have shifted
                                all tax related transactions to blockchain due
                                to which every single transaction taking place
                                in the complete chain is visible to evey person
                                of the country making it easier for general
                                public to keep track of the total tax
                                collection. With TaxChain people know whether
                                their funds are being used well or not.
                            </p>
                            <a href="/login" className="bold-green">
                                GET STARTED
                                <FontAwesomeIcon
                                    className="icon-arrow"
                                    icon={faArrowRight}
                                />
                            </a>
                        </Col>
                        <Col md={6}>
                            <FontAwesomeIcon
                                className="icon-big"
                                icon={faDiceD20}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="white-bg">
                <Container>
                    <Row>
                        <Col md={5}>
                            <h3 className="grey">TaxChain For Everyone</h3>
                            <h3 className="heading">
                                Citizens Government Local Bodies Contractors
                            </h3>
                        </Col>
                        <Col md={7}></Col>
                        <WhiteCard
                            caption="TaxChain Allows Citizens to Track their Taxes. Citizens can pay taxes using Tokens, View Funds Alloted by government to various constituencies and how these funds are being used by them."
                            title="Citizen"
                            imgUrl="https://image.freepik.com/free-vector/group-young-people-waving-hand_23-2148361692.jpg"
                        ></WhiteCard>
                        <WhiteCard
                            caption="TaxChain Creates Transparency.Government can know what work is being done in the constituencies."
                            title="Government"
                            imgUrl="https://image.freepik.com/free-vector/us-supreme-court-building-flat-vector-illustration_82574-4466.jpg"
                        ></WhiteCard>
                        <WhiteCard
                            caption="TaxChain reduces corruption in local government bodies and prevents corrupt MLAs from using tax money for their own benefit."
                            title="Local Government Bodies"
                            imgUrl="https://www.thedigitaltransformationpeople.com/wp-content/uploads/2019/05/leadership-640x400-c-default.jpg"
                        ></WhiteCard>
                        <WhiteCard
                            caption="Even the money a state govt entity allots to the contractors for various projects is well tracked. This can help keep track of exactly where they used the money, hence again reducing corruption."
                            title="Contractors"
                            imgUrl="https://image.freepik.com/free-vector/engineers-team-discussing-issues-construction-site_74855-4786.jpg"
                        ></WhiteCard>
                        <Col>
                            <Button
                                href="/login"
                                size="lg"
                                className="button-green"
                            >
                                Login
                            </Button>{" "}
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default Home;
