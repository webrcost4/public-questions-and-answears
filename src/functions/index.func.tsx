import React from 'react';
import { MdOutlineStarHalf, MdOutlineStarOutline, MdOutlineStarPurple500 } from 'react-icons/md';

export function levelProof(level: number | undefined) {
    if (level == 0)
        return (
            <>
                <MdOutlineStarPurple500 color="#1C1C1C" />
                <MdOutlineStarOutline color="#1C1C1C" />
                <MdOutlineStarOutline color="#1C1C1C" />
                <MdOutlineStarOutline color="#1C1C1C" />
                <MdOutlineStarOutline color="#1C1C1C" />
            </>
        );
    if (level == 1)
        return (
            <>
                <MdOutlineStarPurple500 color="#1C1C1C" />
                <MdOutlineStarPurple500 color="#1C1C1C" />
                <MdOutlineStarPurple500 color="#1C1C1C" />
                <MdOutlineStarHalf color="#1C1C1C" />
                <MdOutlineStarOutline color="#1C1C1C" />
            </>
        );
    if (level == 2)
        return (
            <>
                <MdOutlineStarPurple500 color="#1C1C1C" />
                <MdOutlineStarPurple500 color="#1C1C1C" />
                <MdOutlineStarPurple500 color="#1C1C1C" />
                <MdOutlineStarPurple500 color="#1C1C1C" />
                <MdOutlineStarPurple500 color="#1C1C1C" />
            </>
        );
}
