import { forwardRef } from "react";
import NextLink from 'next/link'
import { styled } from "@mui/system";

const Anchor = styled('a')({});

export const NextLinkComposed = forwardRef((props, ref) => {
    const { to, linkAs, replace, scroll, shallow, prefetch, locale, ...other } = props;

    return (
      <NextLink
        href={to}
        prefetch={prefetch}
        as={linkAs}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        passHref
        locale={locale}
      >
        <Anchor ref={ref} {...other} />
      </NextLink>
    );
  },
);