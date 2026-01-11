import React from "react";
import Container from "../Common/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

export default function Topsection() {
    return (
        <div className="border-b py-2">
            <Container className="flex items-center justify-between">

                <div className="flex items-center gap-2 text-md">
                    <span>Home</span>
                    <FontAwesomeIcon
                        icon={faAngleRight}
                        className="mx-1 w-5 h-5 text-gray-400 relative top-px"
                    />

                    <span className="font-semibold">Health Care</span>
                </div>

                <div className="w-1/2 text-xl font-semibold">
                    Health Care
                </div>

            </Container>
        </div>
    );
}
