import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export const Nav = () => {
  return (
    <nav className="bg-background border-x-1 px-2 flex items-center justify-between gap-2">
      <Image width={14} height={14} alt="TurboEdit Logo" src="favicon.svg" />
      <ul className="flex flex-row gap-4 items-center justify-end">
        <li>
          <Link
            href="/"
            className="text-md md:text-sm text-[var(--accent-foreground)]"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="https://sayantanghosh.in"
            className="text-md md:text-sm text-[var(--accent-foreground)]"
          >
            Website
          </Link>
        </li>
        <li>
          <Link
            href="https://sayantanghosh.in/blog"
            className="text-md md:text-sm text-[var(--accent-foreground)]"
          >
            Blog
          </Link>
        </li>
        <li>
          <Link
            target="_blank"
            aria-label="Sayantan Ghosh Linkedin"
            href="https://www.linkedin.com/in/sayantanghosh-in"
          >
            <IconBrandLinkedin
              className="w-[24px] h-[24px] md:w-[16px] md:h-[16px]"
              stroke={1.5}
              color="var(--accent-foreground)"
            />
          </Link>
        </li>
        <li>
          <Link
            aria-label="Sayantan Ghosh Twitter / X"
            target="_blank"
            href="https://x.com/sayantan__ghosh"
          >
            <IconBrandTwitter
              className="w-[24px] h-[24px] md:w-[16px] md:h-[16px]"
              stroke={1.5}
              color="var(--accent-foreground)"
            />
          </Link>
        </li>
        <li>
          <Link
            aria-label="Sayantan Ghosh Github"
            target="_blank"
            href="https://github.com/sayantanghosh-in"
          >
            <IconBrandGithub
              className="w-[24px] h-[24px] md:w-[16px] md:h-[16px]"
              stroke={1.5}
              color="var(--accent-foreground)"
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
};
