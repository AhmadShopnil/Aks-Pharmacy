import React from "react";
import Container from "../Common/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { getSingleCategory } from "@/lib/fetchApis";

export default async function Topsection({ slug }) {

    const category = await getSingleCategory(slug)
    return (
        <div className="border-b py-2">
            <Container className="flex items-center justify-between">

                <div className="flex items-center gap-2 text-md">
                    <Link
                        href="/"
                    >Home</Link>
                    <FontAwesomeIcon
                        icon={faAngleRight}
                        className="mx-1 w-5 h-5 text-gray-400 relative top-px"
                    />

                    <span className="font-semibold">{slug}</span>
                </div>

                <div className="w-1/2 text-xl font-semibold">
                    {category?.name}
                </div>

            </Container>
        </div>
    );
}
