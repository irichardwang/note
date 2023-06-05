// @ts-ignore
import React from "react";
// @ts-ignore
import Link from "@docusaurus/Link";
// @ts-ignore
import type { Props as LinkProps } from "@docusaurus/Link";

import "./styles.css";

interface LinkCardProps extends Pick<LinkProps, "to"> {
    title: string;
    description: string;
}

const LinkCard = ({ to, title, description }: LinkCardProps): JSX.Element => (
    <Link className="lc-container" to={to}>
        <div className="lc-title">{title}</div>
        <div className="lc-description">{description}</div>
    </Link>
);

export default LinkCard;