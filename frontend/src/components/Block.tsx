// @ts-expect-error childer is not defined
const Block = ({ children }) => {
    return (
        <div className="p-5 mx-[20%] bg-light-card dark:bg-dark-card rounded-lg ">
            {children}
        </div>
    );
};

export default Block;
