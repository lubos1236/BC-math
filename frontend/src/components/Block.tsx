import { ReactNode } from "react";

interface BlockProps {
    children: ReactNode;
}

const Block = ({ children }: BlockProps) => {
    return (
        <div className="p-5 mx-auto max-w-4xl bg-light-card dark:bg-dark-card rounded-lg">
            {children}
        </div>
    );
};

export default Block;
