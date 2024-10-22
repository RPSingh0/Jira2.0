function LoadOrFetchWrapper({loading, fetching, updating, loader, children}) {

    const show = loading || fetching || updating;

    return (
        <>
            {show ? loader : children}
        </>
    );
}

export default LoadOrFetchWrapper;