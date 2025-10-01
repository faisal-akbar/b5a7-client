function CopyIcon({ className }) {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 25 25"
            height="19"
            width="19"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            strokeLinejoin="round"
            strokeMiterlimit="1.414"
            className={`${className}`}
        >
            <rect
                x="2"
                y="8"
                width="15"
                height="15"
                rx="2"
                ry="2"
                fill="#8b8ba7"
                stroke="#8b8ba7"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <rect
                x="7"
                y="3"
                width="15"
                height="15"
                rx="2"
                ry="2"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default CopyIcon;
