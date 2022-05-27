const Errors = ({error, isSubmitted}) => {
    return (
        <>
            <div className="alert alert-danger">
                <ul>
                    {isSubmitted && error.map((error,index) => {
                        return(
                            <div key={index}>
                                <li>{error.msg}</li>
                            </div>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}

export default Errors;