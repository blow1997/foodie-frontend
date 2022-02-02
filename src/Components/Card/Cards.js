import React from "react";
import { Card, CardImg, CardTitle, Button, CardBody } from "reactstrap";

function Cards({ title, children }) {
  console.log(title);
  return (
    <div className="my-5">
      <Card>
        <CardImg
          alt={title}
          src="https://picsum.photos/318/180"
          top
          width="100%"
        />
        <CardBody>
          <CardTitle className="" tag="h5">
            {title}
          </CardTitle>
          {children}
        </CardBody>
      </Card>
    </div>
  );
}

export default Cards;
